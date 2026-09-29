# Sơ đồ chỉnh sửa được

- [Source Mermaid](sol-db-baseline.mmd) là nguồn vẽ; [SVG](sol-db-baseline.svg) là bản render xem trên GitHub.
- `accounts`, `customers`, `staff `, `services`, `staff_time_off`, `appointments` là **6 collection**. `items` và `weeklyHours` là **embedded document**, không tạo collection tương ứng.
- Đường liền ghi EMBEDDED diễn tả nhúng; đường nét đứt là reference. `o`=0, `|`=1, chân quạ=nhiều. Giới hạn 3/7/50 ghi ở nhãn/schema vì ký hiệu ER chỉ có “nhiều”.
- Đường nối **không phải foreign key do MongoDB enforce**. `services.id` là String, khác `_id` ObjectId; không vẽ FK để đổi kiểu. `lastCommand.actorId` cũng reference accounts._id nhưng lược khỏi đường nối để dễ đọc; customerSnapshot, lastCommand, intervals và durationMinutes được mở đầy đủ ở [schema](../schema.md).
- `weeklyHours.startMinute/endMinute` trên sơ đồ là shorthand của `weeklyHours[].intervals[].startMinute/endMinute`, không field trực tiếp của ngày.

## Render lại

Dùng Mermaid CLI ở npm cache/thư mục công cụ ngoài repo, không thêm dependency/lockfile vào project:

```powershell
npx --yes --package @mermaid-js/mermaid-cli@12.0.0 mmdc -i docs/database/diagrams/sol-db-baseline.mmd -o docs/database/diagrams/sol-db-baseline.svg -b white
```

Nếu máy không tải được Chromium của Puppeteer, đặt `PUPPETEER_EXECUTABLE_PATH` tới Chrome/Edge đã cài rồi chạy CLI; không cần thêm dependency vào project. Bản bàn giao dùng Mermaid CLI 12.0.0 trong npm cache và Edge đã cài. Cấu hình `htmlLabels:false` giữ chữ dạng SVG text để xem được cả trong trình đọc không hỗ trợ foreignObject.

Mở SVG sau khi render, kiểm chữ/đường nối. Thông tin lần kiểm cụ thể nằm ở [review](../review.md).

## Khảo sát VisuaLeaf

Đã mở [Visual Schema Designer web](https://visualeaf.com/tools/visual-schema/) bằng trình duyệt Codex và dùng mẫu **hai collection giả, bốn field, một reference**. Hộp Import from Script hiển thị Smart Query JSON với các khóa `tables`, `columns`, `pk_info`, `fk_info`, `indexes`, `database_name`, `version`. Đã paste mẫu theo chính định dạng trang công bố; Preview báo 2 tables/1 relation, Import hiển thị hai tên probe cùng `parentId` và `snapshot.name`.

Giới hạn quan sát: import **thêm vào** canvas sample, đổi nhãn sang Tables; chưa chứng minh bảo toàn MongoDB nested structure/cardinality/required. Nút Save & Export trong widget không cho file tải trong phiên; console ghi `Backend unavailable, skipping workspace save`. Do đó **CHƯA KIỂM CHỨNG** round-trip của baseline đầy đủ, không bàn giao JSON tự đặt tên “VisuaLeaf import” hoặc “native export”. Mẫu probe chỉ là thử định dạng; không phải baseline đã import PASS. Không chạy mongosh/Smart Query lên DB, không mở console cloud hoặc đăng ký tài khoản.

Hướng dựng thủ công khi công cụ hỗ trợ: chọn MongoDB canvas trống; tạo 6 collection đúng tên từ schema; thêm `_id` ObjectId, riêng services.id String; thêm các field chính trên Mermaid. Dựng items, weeklyHours/intervals thành nested fields, rồi nối reference theo bảng Cardinality trong schema. Ghi chú required/optional và giới hạn array từ schema vì UI có thể không giữ đủ. Xuất file native bằng chức năng thực sự hỗ trợ, nhập lại trên canvas mới và đối chiếu 6 collection/field/reference trước khi đánh PASS. Mermaid/SVG vẫn là bản bàn giao đã kiểm đọc, không phụ thuộc khả năng lưu của VisuaLeaf.
