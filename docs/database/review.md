# Review và nghiệm thu — PROPOSED

Chủ task duyệt: **NhanDuong21**. Bản nháp chưa APPROVED, chưa chứng minh ràng buộc MongoDB thực tế. Base phân tích `e742630382df97d44e74321d8af82a52e506450f`, PR #10 MERGED. Sheet chỉ chỉnh SOL-011 tại PHÂN CÔNG hàng 10; không sửa các quyết định PHẠM VI đang “Chưa chốt”.

<a id="quyet-dinh"></a>
## Quyết định cần duyệt

| Mã | Khuyến nghị chính của bản nháp | Ảnh hưởng cần chấp nhận | Trạng thái |
| --- | --- | --- | --- |
| D1 | Một tiệm, Asia/Ho_Chi_Minh | Không branchId/multi-tenant; đổi nhiều chi nhánh cần thiết kế lại truy vấn/quyền | PROPOSED |
| D2 | Một stylist, 1–3 dịch vụ nối tiếp | Không chia stylist, không đặt song song thời gian chờ nhuộm; tối đa 480 phút +10 buffer | PROPOSED |
| D3 | bookingDuration cụ thể 60/120/75 cho ba dịch vụ mẫu | Chủ tiệm phải duyệt từng số; trường min/max chỉ hiển thị; chưa có giá trị thì không nhận booking | PROPOSED |
| D4 | Giá VND nguyên, snapshot lúc tạo | Đổi giá catalog không sửa lịch cũ; đổi giờ giữ giá; đổi gói cần hủy/tạo mới | PROPOSED |
| D5 | Khách tự đặt sau đăng nhập; vãng lai do lễ tân đặt hộ | Có accounts và customers tách riêng; chưa có auth runtime; không tự liên kết theo phone | PROPOSED |
| D6 | Confirm ngay, không hold | Slot xem có thể vừa bị người khác đặt; submit nhận conflict và chọn lại | PROPOSED |
| D7 | Transaction ghi guard staff | Yêu cầu replica set hỗ trợ transaction; cùng stylist khác ngày cũng tranh chấp; cần integration test sau duyệt | PROPOSED |
| D8 | Bội5 phút, trước tối đa90 ngày; cùng ngày local và trong một ca | Không đặt qua đêm; 00:00 ngày sau chỉ được là biên phải; hủy/đổi trước giờ bắt đầu | PROPOSED |
| D9 | Completed giữ khung cũ; no_show sau 15 phút do nhân sự ghi | Không tự no_show bằng cron; quá giờ thực tế cần lễ tân xử lý, không tự dời dây chuyền | PROPOSED |
| D10 | Ngừng dịch vụ vẫn phục vụ lịch cũ; ngừng staff phải xử lý lịch trước | Không cascade delete; chưa quyết định thời hạn lưu/ẩn dữ liệu cá nhân, phải chốt trước dùng thật | PROPOSED |
| D11 | Hoãn đánh giá, thanh toán và audit mọi lần sửa | Chỉ lastCommand gần nhất; retry cũ hơn nhận stale và GET lại | PROPOSED |
| D12 | Chống trùng theo stylist; chưa khóa customer | Nếu muốn cấm khách đặt trùng trên hai stylist, cần bổ sung guard customer theo thứ tự khóa thống nhất trước triển khai | PROPOSED |

Đây là bảng duyệt thiết kế, không phải backlog phân công mới. Khi duyệt xong, thứ tự triển khai khuyến nghị: bảo toàn DTO/validation services → danh tính và hồ sơ → staff/ca/nghỉ → booking/transaction/idempotency → màn hình dùng chung hợp đồng. Chưa tạo mã SOL tiếp theo.

<a id="scenarios"></a>
## Checklist tình huống thiết kế

Các dòng dưới đây là **phân tích thiết kế**, không phải kết quả integration/concurrency PASS. Thời gian ghi theo giờ tiệm, ngày 05/10/2026 trừ khi nêu khác.

| # | Đầu vào cụ thể | Kết quả mong đợi | Vị trí đáp ứng |
| --- | --- | --- | --- |
| 1 | `501`: cắt09:00,60 phút,450000đ | end10:00, occupiedUntil10:10; snapshot đúng | [B1](business-rules.md#booking), appointments.json |
| 2 | `503`: cắt60+spa75 lúc 09:00, stylist302 | 135 phút,1050000đ, hết buffer11:25; thứ tự items được giữ | B1, schema.items |
| 3 | `502` bắt đầu 10:10 sau`501`; thử10:05 | 10:10 được; 10:05 trùng buffer bị từ chối | [B2](business-rules.md#schedule), overlap trong checker |
| 4 | A09:00/B09:30 cùng stylist301 gửi đồng thời | Cùng ghi staff301; một transaction retry rồi thấy overlap, chỉ một lịch thành công | [B4](business-rules.md#concurrency), timeline A/B |
| 5 | `501` staff301 và`503` staff302 cùng 09:00 | Cả hai hợp lệ, guard khác document | B4, bộ mẫu |
| 6 | `504` cancelled; tạo`501` cùng giờ/key mới; gửi lại key504 | Key mới được nếu trống; key504 trả lịch cancelled cũ, không hồi sinh | [B5](business-rules.md#reschedule), I12 |
| 7 | Cancel request mất response, gửi lại cùng key/hash/revision | lastCommand trả receipt; sau một lệnh mới hơn thì stale, không chạy cancel lại | B5 |
| 8 | Đổi`501` vào10:10 đã có`502`; hoặc chết trước commit | Abort giữ nguyên`501`09:00; không mất slot cũ | B5 pseudocode |
| 9 | Cancel và đổi`501` cùng revision0 | Một lệnh commit, lệnh kia STALE_REVISION; không hủy nhầm lịch vừa đổi | B5 conditional write |
| 10 | Catalog cắt đổi500000/65 hoặc inactive sau tạo`501` |`501` giữ450000/60; mới dùng catalog hiện tại nếu active; duration phải trong min/max mới | [B6](business-rules.md#lifecycle), schema snapshot |
| 11 | Staff301 đặt12:00 khi nghỉ12–13; hoặc08:30 trước ca | Từ chối dù không có appointment khác | B2, staff_time_off.json |
| 12 | Chọn ngày 05/10 nhưng UTC04/10 lúc17:30; hoặc23:30+60+10 | Tính local đúng05/10; trường hợp cuối qua ngày bị từ chối | B2, localDate/checker |
| 13 | staffId không tồn tại, price1.5, min61/max60, item duration62 | Từ chối reference/giá/duration; không casting số từ chuỗi | schema validation; checker negative cases |
| 14 | completed → confirmed; khách khác hủy`501` | Conflict/forbidden; không sửa lịch hay guard thành công | [B3](business-rules.md#states), B5 |
| 15 | Thêm bookingDurationMinutes vào services DB | DTO vẫn chính xác 8 field, không lộ field nội bộ; mobile hiện chưa consumer | queries Q1, [migration](migration-plan.md), services-response.json |
| 16 | Commit mất phản hồi, không rõ đã lưu chưa | Retry commit cùng transaction; hết hạn GET receipt cùng key, không báo rollback chắc chắn | B5 retry/errors |
| 17 | Thêm nghỉ09:00–11:00 trong lúc booking09:00 | Cùng guard; hoặc nghỉ thắng và booking bị chặn, hoặc booking thắng và nghỉ bị từ chối | B2/B4 |
| 18 | Đổi stylist301→302 đồng thời đổi ngược lại | Khóa hai staff theo thứ tự; reread appointment, revision sai thì abort | B5 |
| 19 | Dịch vụ thực tế làm tới10:20, có lịch tiếp10:10 | Ghi thời gian thật, không start tiếp khi còn in_progress/buffer thực tế; lễ tân xử lý chậm lịch | B2/B3; giới hạn vận hành |
| 20 | completedAt10:20; lúc10:21 yêu cầu đặt10:25 | Tạo/đổi từ chối vì cooldown tới10:30, lịch trống cũng loại slot này | B2 và Q4 |
| 21 | Confirmed ngày trước, hôm nay bấm bắt đầu | Từ chối; nhân sự no_show rồi đặt mới nếu khách tới | B3 |
| 22 | Staff đang in_progress09:00, lúc10:30 sửa ca/nghỉ | Vẫn kiểm lịch đang làm dù startAt<now; không bỏ qua bằng filter tương lai | B2 và Q9 |
| 23 | Service chưa có reference, admin muốn xóa trong lúc booking | V1 không hard-delete service; isActive chỉ ảnh hưởng booking theo snapshot đã mô tả | B6 |

## Nguồn kỹ thuật và skill

- Đã cài riêng user/global và đọc **mongodb-schema-design**, metadata version 1.0.0 từ [mongodb/agent-skills](https://github.com/mongodb/agent-skills/tree/main/skills/mongodb-schema-design). Các tài nguyên đã đọc: embed-vs-reference, schema-validation, document-size, extended-reference, schema-versioning, unnecessary-indexes. Chỉ áp dụng theo workload trong repo, không chạy các lệnh DB gợi ý trong skill.
- CLI đã liệt kê tên thực tế trước khi cài. Lock user-scope ghi skillFolderHash `2dbf61eb498f6afca37f25e3aa0ab5f9e7bcd632`. GitHub main lúc khảo sát là `d1d2d86754ff303ac441624b2ac8e0380465aa9b`; chưa đối chiếu byte toàn cây đã cài với commit đó nên **không gọi đây là revision bản cài đã xác minh**. Skill/lock/config cá nhân không ở repo.
- [MongoDB transaction write conflicts](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/), [Node driver retries](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/), [MongoDB 8.0 partial index](https://www.mongodb.com/docs/v8.0/core/index-partial/), [Mongoose validation](https://mongoosejs.com/docs/validation.html). Tài liệu Mongoose website hiện 9.10.2; dự án khóa 9.10.1, không nâng cấp theo website.

## Bằng chứng chạy thực tế

Các kiểm tra dưới đây đã chạy ngày 29/09/2026. Kiểm tra tài liệu chạy trong checkout hiện tại. Các lệnh workspace chạy trên bản sao `git archive HEAD` của base đang phân tích, vì runtime không thay đổi trong task; bản sao không chứa `.env`, dùng dependency đã cài. Đặt `DOTENV_CONFIG_PATH=NUL`, `EXPO_NO_DOTENV=1`, `MONGODB_URI` rỗng và `CI=1`; không khởi động API hay kết nối DB.

| Kiểm tra | Kết quả |
| --- | --- |
| PR10 và merge base | MERGED, merge commit trùng origin/main khi bắt đầu |
| `node docs/database/checks/validate-examples.mjs` | Đạt: 6 collection, 18 document giả, DTO 8 field và 45 liên kết nội bộ/file/anchor |
| `node docs/database/checks/validate-examples.mjs --self-test` | Đạt: từ chối đủ 13 biến thể sai trong bộ nhớ; không phải integration test |
| Mermaid render và mở xem | Mermaid CLI 12.0.0 + Edge: exit 0; đã mở bản raster từ SVG để đọc field/nhãn/đường nối, không chồng chữ; giữ source `.mmd` và SVG text |
| VisuaLeaf | Probe nhỏ nhập được; baseline full round-trip **CHƯA KIỂM CHỨNG**, xem [giới hạn](diagrams/README.md) |
| `npm run lint` | Đạt cả 3 workspace, exit 0 |
| `npm test` | Đạt 27 test: API 12, web 8, mobile 7; sử dụng mock theo test hiện có |
| `npm run build` | Đạt: API kiểm cú pháp 20 file; Expo export Android/iOS; Vite build 43 module. Không chạy app trên emulator/thiết bị |
| `git diff --check`, `git diff --cached --check` và danh sách staged | Đối chiếu trước commit: chỉ docs/database và một liên kết ở README; không apps/package/lockfile/CI/skill/config cá nhân |

Trích kết quả: `PASS: 6 collections, 18 fake documents`; `PASS: 13 invalid in-memory variants rejected`; `Test Files 6 passed / Tests 12 passed` (API), `3 passed / 7 passed` (mobile), `4 passed / 8 passed` (web). Lần đầu gọi npx Mermaid bị chờ tải browser nên đã dừng; gọi cùng CLI từ cache với Edge đã render thành công. Không coi lần npx bị dừng là PASS. Build chỉ có cảnh báo cache Metro rỗng và NO_COLOR/FORCE_COLOR, không có lỗi build.

## Review và giới hạn

Đã thực hiện **hai lượt review chỉ đọc bằng subagent**, đúng giới hạn mục 7 prompt: dữ liệu/tương thích và concurrency/tính nhất quán. Người thực hiện chính đã sửa các phát hiện bên dưới, tự đối chiếu lại; không có lượt subagent thứ ba. Đây là review tài liệu, không phải DB test hoặc chủ task đã duyệt.

| Phát hiện | Cách xử lý trong bản bàn giao |
| --- | --- |
| Sample đặt lại trước lúc hủy; một khách ở hai stylist cùng giờ | Dời createdAt/confirmedAt501 sau cancelledAt504; thêm khách giả203 cho503; ghi chính sách customer concurrency còn PROPOSED |
| Revision>0 thiếu receipt; checker thiếu timestamp relation | Thêm lastCommand505/506, bắt buộc receipt khi revision>0; kiểm confirmedAt<=updatedAt; thêm negative cases |
| Checker dùng ca hiện tại để xét lịch completed quá khứ | Chỉ kiểm ca/nghỉ hiện tại cho confirmed/in_progress; vẫn xét completed trong overlap reservation |
| Có thể xóa dịch vụ chưa có reference giữa transaction booking | Cấm hard-delete services/staff/customers/accounts ở v1; ngừng hoạt động có chủ ý |
| Đặt mới nhận vào cooldown sau hoàn tất muộn | Bổ sung kiểm cooldown ở availability, create, reschedule dưới guard; không đổi reservation lịch sử |
| Cụm “tương lai” bỏ sót đang phục vụ; bắt đầu lịch cũ | Chỉ rõ mọi in_progress, confirmed occupiedUntil>now; start cùng ngày, trước endAt, active và không nghỉ |
| lastCommand một phần tử nhưng lời hứa idempotency quá rộng | Thu hẹp phát hiện reuse tới receipt hiện tại; retry lệnh cũ giữ expectedRevision và nhận stale nếu đã có lệnh sau |

Sửa thêm khi chạy checker: lỗi dấu ngoặc JavaScript ở lần chạy đầu và thiếu SVG trong lúc renderer chưa xong; đã sửa cú pháp/render rồi chạy lại toàn bộ. Không làm yếu invariant để vượt kiểm tra.

**Chưa kiểm chứng:** DB thật, Server/FCV/topology, validator/index đã áp dụng, concurrency/failover/unknown commit trên MongoDB, explain/performance, trình giả lập/thiết bị, baseline đầy đủ trong VisuaLeaf. Không có tuyên bố production-ready.

## Tiêu chí bàn giao

| Tiêu chí | Trạng thái |
| --- | --- |
| Nguồn/hiện trạng/yêu cầu/đề xuất phân biệt rõ | Có tài liệu |
| Schema nested, reference, snapshot, validation/index và migration | Có tài liệu; đã sửa phát hiện từ hai lượt review |
| Chống trùng có key/document tranh chấp, retry, đổi lịch atomic | Có thiết kế; integration chưa chạy |
| JSON giả liên kết nhất quán, script built-in offline | Kiểm tra offline đạt như bảng trên |
| Mermaid source và SVG đã mở xem | Đã render và kiểm đọc |
| VisuaLeaf native round-trip | CHƯA KIỂM CHỨNG; bàn giao theo fallback prompt cho phép |
| Nhánh/commit/push/Draft PR và Sheet | Bàn giao trên nhánh `docs/SOL-011-db-baseline`; link PR và trạng thái cập nhật tại hàng SOL-011 trên Sheet |
| Chủ task duyệt baseline | CHỜ DUYỆT — PROPOSED |
