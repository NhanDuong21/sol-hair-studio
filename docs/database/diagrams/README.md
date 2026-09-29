# Sơ đồ DB trên VisuaLeaf

- [PNG](sol-db-baseline.png) được xuất trực tiếp từ [VisuaLeaf Visual Schema](https://visualeaf.com/tools/visual-schema/widget/?data=sample) trên Chrome, kích thước **2282 × 2281**. Đây là ảnh dùng trong tài liệu theo yêu cầu chủ task.
- [JSON do VisuaLeaf xuất](sol-db-baseline.visualeaf.json) giữ field, đường nối và vị trí trên canvas; chưa kiểm chứng nhập lại file này vào widget.
- [Source Mermaid](sol-db-baseline.mmd) được giữ làm bản tham chiếu bằng văn bản. PNG hiện tại được xuất từ VisuaLeaf, không render từ Mermaid.
- [Schema đầy đủ](../schema.md) vẫn là nguồn mô tả field, validation và cardinality; sơ đồ chỉ hiển thị **63 field chính, 6 collection và 8 đường reference**.

## Cách đọc PNG

- `accounts`, `customers`, `staff`, `services`, `staff_time_off`, `appointments` là 6 collection. `items`, `weeklyHours`, `intervals`, snapshot và `durationMinutes` nằm trong collection cha; các đường dẫn có dấu chấm/`[]` diễn tả dữ liệu nhúng.
- Đường nối là reference do ứng dụng kiểm tra, **không phải foreign key do MongoDB enforce**. `1/N` biểu thị số lượng tối đa; liên kết account của hồ sơ ghi rõ `0..1 : 0..1`. `skills` là quan hệ nhiều–nhiều giữa staff và services.
- `items[].serviceId → services.id` là nhiều–một xét theo từng item; một appointment có 1–3 item. `services.id` là String, khác `_id` ObjectId.
- Dấu `?` nghĩa là field tùy chọn/có thể vắng mặt, **không có nghĩa được lưu null**. Quy tắc điều kiện của `lastCommand` nằm trong schema. `lastCommand.actorId` vẫn hiện trong appointment nhưng lược đường reference tới accounts để giảm giao cắt.
- Mermaid dùng nút phụ cho embedded document và ký hiệu chân quạ; VisuaLeaf hiển thị chúng dưới collection cha. Hai bản diễn tả cùng thiết kế, có bố cục khác nhau.

## Cách đã dựng và xuất

Ngày 29/09/2026, đã xóa các khối sample trên canvas, nhập metadata giả theo định dạng **Smart Query JSON** do UI công bố, rồi chỉnh vị trí, cardinality, nhãn và chú giải trực tiếp trên web. Không chạy Smart Query/mongosh hay kết nối DB. Canvas xuất cuối cùng chỉ có 6 collection của baseline.

Để xuất từ canvas đang mở:

1. Đặt zoom **100%**, bỏ chọn các khối; xuất ở zoom nhỏ đã làm cỡ chữ nhãn đường nối sai trong một lần thử.
2. Chọn **Save & Export → Export as PNG**.
3. Chọn **Export as JSON** để lưu thêm cấu trúc và vị trí từ công cụ.
4. Mở ảnh tải về để kiểm tra trước khi thay file trong repo. Bằng chứng lần xuất nằm ở [review](../review.md).

## Giới hạn của công cụ

Smart Query importer đổi nhãn UI sang Tables và ghi `connectionType: "SQL"` trong JSON gốc, dù field giữ kiểu `objectId`, `date`, `array<object>` và đường dẫn nhúng của MongoDB. Thuộc tính `nullable` của công cụ được dùng để hiện dấu `?` theo chú giải trên. JSON là **bản xuất sơ đồ**, không phải DDL, validator hay cấu hình để áp dụng lên DB.

Lần khảo sát đầu trong trình duyệt Codex chưa tải được file; lần này Chrome đã tải được PNG và JSON qua đúng menu Export. Nút Save workspace vẫn yêu cầu ứng dụng VisuaLeaf. **Chưa kiểm chứng native round-trip**: chưa nhập lại JSON xuất ra vào một canvas mới. Vì vậy giữ cả schema và Mermaid để tham chiếu, không cam kết widget hỗ trợ khôi phục từ JSON.

PNG giữ nguyên bản xuất của website: một số tiêu đề có mép chữ sát đường viền và dấu gạch dưới khó thấy khi thu nhỏ. Tên field chính xác nằm trong JSON và schema; không dùng hình để suy ra tên field khác.
