# Quy ước làm việc trong repository

## Phạm vi và nguồn thông tin chuẩn

- Repository này chứa ứng dụng web, ứng dụng di động và API dùng chung của Sol Hair Studio. Không sao chép từ hoặc sửa repository landing page Next.js cá nhân.
- [Sol Hair Studio — Kế hoạch & phân công](https://docs.google.com/spreadsheets/d/1mKBFo0c1PcSJEVwbI80AAsorL47a7VyGk-nE0hIGLbw/edit) là nguồn phân công chính. Dùng mã việc cố định `SOL-xxx`; không tạo backlog Markdown song song.
- Không tự tạo GitHub Issue, Project, Sprint hoặc milestone để giao việc. Công việc mới chỉ cần một hàng trên Sheet; issue hiện có là lịch sử hoặc nguồn tham chiếu khi hàng đó dẫn tới nó.
- Chưa có rubric chính thức, hạn chót và khả năng nhận việc của từng thành viên. Xem lựa chọn công nghệ và phần đối chiếu môn học trong `docs/course-scope.md` là giả định cho đến khi nhóm xác nhận.
- Không suy đoán người làm, hạn, yêu cầu giảng viên hoặc khả năng nhận việc từ username. Không sửa hàng công việc của người khác nếu chưa được yêu cầu hoặc nhóm chưa thống nhất.
- Giữ phần dùng chung ở một nơi. Không tách thành việc web/mobile trùng nhau nếu không có ranh giới bàn giao thật sự.

## Trước khi thay đổi mã nguồn

1. Đọc hàng công việc trên Sheet, `README.md`, `docs/course-scope.md`, nhánh hiện tại, `git status` và lịch sử commit gần nhất.
   Nếu không truy cập được Sheet, dùng đúng yêu cầu người dùng đã cung cấp, ghi rõ giới hạn và không giả vờ đã đọc hoặc cập nhật Sheet.
2. Giữ nguyên thay đổi chưa commit hoặc không liên quan của người khác. Không xóa hay ghi đè công việc đó.
3. Xác nhận yêu cầu thuộc repository này và không âm thầm mở rộng phạm vi bài tập.
4. Không in hoặc commit token, file `.env`, thông tin đăng nhập, mã định danh thiết bị hay dữ liệu production.

## Quy trình Sheet, nhánh và pull request

- Bắt đầu từ một hàng Sheet có mã việc, mục tiêu, phụ thuộc, phần không bao gồm và điều kiện hoàn thành đủ rõ. Nội dung chưa rõ hoặc bị chặn phải giữ đúng trạng thái trên Sheet.
- Dùng nhánh tập trung như `feat/SOL-003-service-catalog`, `fix/SOL-008-api-timeout` hoặc `chore/SOL-001-project-foundation`.
- Không ai, kể cả admin, được push trực tiếp vào `main`; mọi thay đổi phải đi qua pull request. Không hạ rule bảo vệ nhánh hoặc bỏ qua kiểm tra đang thất bại.
- Trước khi merge, check bắt buộc `Lint, test and build` phải thành công, nhánh phải cập nhật theo rule hiện hành và mọi conversation phải được resolve. Không force-push hoặc xóa `main`.
- `NhanDuong21` là repository owner/admin và được phép merge PR do chính mình tạo khi các điều kiện bắt buộc đã đạt. Với PR của thành viên khác, approval của chính tác giả không được tính là review độc lập; PR phải có ít nhất một approval từ cộng tác viên khác trước khi merge.
- Branch protection hiện dùng `0 approvals` để owner có thể tự merge nên GitHub cũng không chặn collaborator có quyền write tự merge. Đây là giới hạn kỹ thuật phải tuân thủ bằng quy trình cho đến khi nhóm bật ruleset yêu cầu một approval và cho repository admin bypass chỉ qua pull request.
- Giữ mỗi commit tập trung. PR phải ghi mã việc và liên kết Sheet; chỉ dùng `Closes #<số>` khi thực sự giải quyết đầy đủ một issue lịch sử có liên quan.
- Sau khi bắt đầu, mở PR hoặc hoàn tất merge, cập nhật trạng thái/bằng chứng trên đúng hàng Sheet. Viết code xong nhưng chưa kiểm thử và bàn giao PR chưa phải `Hoàn thành`.

## Ranh giới triển khai

- Ưu tiên monorepo hiện có và module đơn giản; không thêm service, orchestration hoặc tầng framework không cần thiết.
- Web, mobile và API đều dùng JavaScript; component React dùng JSX. Không đưa TypeScript hoặc TSX trở lại nếu chưa có quyết định mới của nhóm.
- Giao diện web dùng utility class của Tailwind CSS. File `apps/web/src/index.css` chỉ là điểm nhập Tailwind hoặc chứa thiết lập toàn cục thật sự cần thiết; không tạo stylesheet CSS viết tay theo từng component nếu chưa có lý do được ghi trên công việc.
- React Native dùng `StyleSheet` native, không dùng CSS web. Chỉ thêm NativeWind hoặc thư viện tương tự khi nhóm ghi nhận quyết định rõ trên Sheet.
- Hợp đồng API và mô hình dữ liệu được web và mobile dùng chung. Mọi thay đổi phải mô tả ảnh hưởng tương thích.
- Base URL của API phải cấu hình được theo môi trường. Không giả định trình duyệt, Android Emulator, iOS Simulator và điện thoại thật dùng cùng một địa chỉ host.
- Chỉ thêm dependency phục vụ trực tiếp cho công việc. Giữ phiên bản tương thích với nền Node/Expo trong repository và commit lockfile ở thư mục gốc.
- Không tuyên bố đã kiểm thử trình giả lập, thiết bị, cơ sở dữ liệu hoặc trình duyệt nếu chưa thật sự chạy.

## Kiểm tra bắt buộc và bàn giao

Chạy các kiểm tra liên quan đến phần đã sửa; với thay đổi xuyên suốt, chạy toàn bộ:

```powershell
npm run lint
npm test
npm run build
```

Trong PR, ghi rõ:

- nội dung đã thay đổi và phần chủ động không thực hiện;
- chính xác lệnh nào thành công hoặc thất bại;
- môi trường đã kiểm tra thủ công thật sự: trình duyệt, trình giả lập, thiết bị thật hoặc cơ sở dữ liệu;
- ảnh chụp màn hình hoặc trích đoạn log mà điều kiện hoàn thành yêu cầu;
- rủi ro còn lại, phụ thuộc và mã việc tiếp theo.

Không làm yếu test, nuốt lỗi hoặc thêm test giữ chỗ chỉ để CI hiện màu xanh.
