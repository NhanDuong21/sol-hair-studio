# Kế hoạch chuyển đổi — chưa thực hiện

Base: `e742630382df97d44e74321d8af82a52e506450f`. Chỉ [services model](../../apps/api/src/modules/services/services.model.js) và seed hiện có; không có collection mới trong runtime. [Schema đích](schema.md) là PROPOSED, không được chạy kế hoạch này trước khi chủ task duyệt.

## Field hiện tại → đề xuất

| Hiện tại | Đề xuất | Ảnh hưởng | Chuyển đổi sau duyệt |
| --- | --- | --- | --- |
| `_id` ObjectId tự sinh | Giữ | Không lộ trong GET services | Không thay/recreate document |
| `id` String unique trim | Giữ, immutable, giới hạn/mẫu rõ | Web/mobile vẫn dùng String | Audit duplicate/rỗng/sai mẫu; không tự sinh id thay thế |
| `slug` String unique | Giữ, immutable v1 | Không phá đường dẫn | Audit duplicate trước index |
| name/description/category String | Giữ, thêm length; category vẫn string | DTO 8 field giữ nguyên | Chuẩn hóa có đối chiếu thủ công, không tách collection category |
| durationMinutes.min/max Number >=1 | Giữ khoảng hiển thị; thêm integer/<=480/min<=max | ServiceCard không thay | Liệt kê vi phạm, chủ tiệm sửa; không clamp/round tự động |
| Chưa có bookingDurationMinutes | Bổ sung số cụ thể bội 5 trong min/max | Field nội bộ, không tự thêm DTO | Chốt 60/120/75 cho ba service chỉ là đề xuất; không có giá trị hợp lệ thì chưa nhận booking |
| priceVnd Number >=0 | Giữ Number, nguyên 0..100000000 | DTO vẫn là số VND | Phát hiện số lẻ/âm/NaN/out-of-range; xác nhận sửa, không tự round |
| imageUrl regex Cloudinary | Giữ URL; validate host bằng URL parser | Ảnh web vẫn dùng link hiện tại | Kiểm URL; không tải lại ảnh/cloud console |
| isActive mặc định true | Giữ, R | Lịch mới bị hạn chế, lịch cũ snapshot | Không bật lại service inactive khi backfill |
| displayOrder mặc định 0 | Giữ nguyên 0..100000 | Sort displayOrder,id giữ | Audit trước siết |
| createdAt/updatedAt, __v | Giữ timestamp, __v nội bộ nếu có | Không xuất DTO | Backfill không viết đè createdAt; không dùng __v làm revision booking |
| Projection loại trừ | Allowlist 8 field hiện tại | Tránh lộ field thêm mới | **Triển khai allowlist trước backfill bookingDurationMinutes** |
| Seed bulkWrite upsert theo id, luôn active=true | Cần điều chỉnh quy trình seed khi có dữ liệu vận hành | Chạy lại hiện tại có thể ghi đè giá/name/active | Dùng dataset dev hoặc chỉ insert dịch vụ thiếu; không chạy seed cũ trên dữ liệu đã quản trị |
| Mobile chỉ health | Consumer services theo DTO chung khi được giao | Không có mobile services cần migrate hiện tại | Không tuyên bố đã test consumer chưa tồn tại |

## Thứ tự chuyển đổi có điều kiện

1. **Duyệt thiết kế và môi trường.** Chốt bảng quyết định, phiên bản Server/FCV và replica set hỗ trợ transaction. Xác minh trên database thử nghiệm tách biệt sau khi được phép; không suy từ package Mongoose rằng server hỗ trợ transaction.
2. **Kiểm kê và bản sao an toàn.** Lập báo cáo số document, key trùng, field thiếu/null/sai type, số không nguyên, min>max, URL sai, giá/duration vượt giới hạn. Kiểm kê index/validator thực tế; test restore bản sao. Không đưa hồ sơ thật vào repo/log công khai.
3. **Bảo toàn contract trước.** Đổi projection sang allowlist 8 field; thêm test keys/tên type/sort/envelope/503; triển khai và xác nhận cả client đã có. Chưa backfill field mới khi projection loại trừ còn chạy.
4. **Backfill có danh sách duyệt.** Thêm bookingDurationMinutes bằng mapping theo **id String**, ghi có điều kiện field thiếu và dữ liệu gốc khớp bản đã duyệt; không ghi đè chỉnh sửa đồng thời. Ba giá trị mẫu không tự trở thành lệnh migration. Lưu báo cáo trước/sau và id đã thay đổi để rollback.
5. **Validation/index.** Sửa dữ liệu sai có chủ ý. Kiểm validator ở chế độ quan sát trên DB thử nghiệm trước; `warn` không ngăn dữ liệu sai và không quét lại mọi dữ liệu cũ. Chỉ bật `strict/error` sau khi audit toàn bộ đạt. Tạo unique index khi đã xử lý duplicate, xác minh build xong; không chạy syncIndexes mù.
6. **Triển khai collection mới khi tính năng được duyệt.** Auth/account link, staff/ca/nghỉ rồi booking. Tạo index/validator trước traffic; toàn bộ writer theo guard. Tắt đường raw write bỏ qua service layer. Bật booking chỉ khi integration tests thực sự chứng minh conflict/retry/idempotency/rollback trên deployment mục tiêu.
7. **Nghiệm thu có dữ liệu giả.** Một/nhiều dịch vụ, buffer, timezone, overlap, request song song, abort giữa chừng, UnknownTransactionCommitResult, seed rerun và thay danh mục. So sánh DTO trước/sau không thừa/thiếu 8 field. Đo explain và write overhead; chưa chạy bước nào tại SOL-011.

## Rollback

- Chỉ thay additive nên rollback trước mở booking: tắt feature; giữ allowlist; bỏ field bookingDurationMinutes của **đúng document do đợt backfill thêm** nếu chưa sửa tiếp, hoặc giữ field để tra cứu. Không đổi id/_id/slug hay xóa dịch vụ.
- Nếu đã có lịch: đóng writer booking mới, giữ đọc lịch/snapshots và unique receipt. Không drop appointments hoặc chạy seed cũ để “trả về ban đầu”; dừng rollback tự động nếu sẽ mất dữ liệu. Khôi phục code tương thích field cũ/mới, điều tra giao dịch đang chưa rõ kết quả, đối chiếu receipt rồi mới mở lại.
- Thay validator/index cần bản cấu hình trước đó và kế hoạch riêng; không xóa index đang bảo vệ idempotency khi writer còn chạy. Không dùng restore toàn DB ghi đè các lịch mới đã commit.

Task này không tạo file migration/seed mới, không chạy lệnh DB và không sửa bất kỳ file nào dưới apps/.
