# Quy ước làm việc trong repository

## Phạm vi và nguồn thông tin chuẩn

- Repository này chứa ứng dụng web, ứng dụng di động và API dùng chung của Sol Hair Studio. Không sao chép từ hoặc sửa repository landing page Next.js cá nhân.
- GitHub Issues là nơi duy nhất theo dõi danh sách công việc. Không tạo thêm danh sách việc trong Markdown phải cập nhật song song.
- Chưa có rubric chính thức, hạn chót và khả năng nhận việc của từng thành viên. Xem lựa chọn công nghệ và phần đối chiếu môn học trong `docs/course-scope.md` là giả định cho đến khi nhóm xác nhận.
- Giữ phần dùng chung ở một nơi. Công việc phục vụ cả hai môn có thể mang hai nhãn môn học; không tách thành issue web/mobile trùng nhau nếu không có ranh giới bàn giao thật sự.

## Trước khi thay đổi mã nguồn

1. Đọc issue, `README.md`, `docs/course-scope.md`, nhánh hiện tại, `git status` và lịch sử commit gần nhất.
2. Giữ nguyên thay đổi chưa commit hoặc không liên quan của người khác. Không xóa hay ghi đè công việc đó.
3. Xác nhận yêu cầu thuộc repository này và không âm thầm mở rộng phạm vi bài tập.
4. Không in hoặc commit token, file `.env`, thông tin đăng nhập, mã định danh thiết bị hay dữ liệu production.

## Quy trình issue, nhánh và pull request

- Bắt đầu từ issue có mục tiêu kiểm thử được, phụ thuộc, phần không bao gồm và điều kiện nghiệm thu.
- Dùng nhánh tập trung như `feat/<issue>-ten-ngan`, `fix/<issue>-ten-ngan` hoặc `chore/<issue>-ten-ngan`.
- Không push trực tiếp vào `main`, tự merge PR, hạ rule bảo vệ nhánh hoặc bỏ qua kiểm tra đang thất bại.
- Giữ mỗi commit tập trung. Dẫn issue trong PR và chỉ dùng `Closes #<số>` khi PR giải quyết đầy đủ issue đó.
- Để công việc chưa assign cho đến khi nhóm thống nhất người phụ trách. Không suy đoán kỹ năng hoặc thời gian rảnh từ username.
- Cập nhật trạng thái Project trung thực: việc bị chặn hoặc chưa rõ nằm ở Backlog; việc đủ điều kiện mới sang Ready; mã nguồn đang chờ review nằm ở In Review.

## Ranh giới triển khai

- Ưu tiên monorepo hiện có và module đơn giản; không thêm service, orchestration hoặc tầng framework không cần thiết.
- Web và mobile dùng JavaScript/JSX. API dùng TypeScript; không đưa TSX trở lại frontend nếu chưa có quyết định mới của nhóm.
- Giao diện web dùng utility class của Tailwind CSS. File `apps/web/src/index.css` chỉ là điểm nhập Tailwind hoặc chứa thiết lập toàn cục thật sự cần thiết; không tạo stylesheet CSS viết tay theo từng component nếu chưa có lý do được ghi trong issue.
- React Native dùng `StyleSheet` native, không dùng CSS web. Chỉ thêm NativeWind hoặc thư viện tương tự khi nhóm quyết định rõ trong một issue riêng.
- Hợp đồng API và mô hình dữ liệu được web và mobile dùng chung. Mọi thay đổi phải mô tả ảnh hưởng tương thích.
- Base URL của API phải cấu hình được theo môi trường. Không giả định trình duyệt, Android Emulator, iOS Simulator và điện thoại thật dùng cùng một địa chỉ host.
- Chỉ thêm dependency phục vụ trực tiếp cho issue. Giữ phiên bản tương thích với nền Node/Expo trong repository và commit lockfile ở thư mục gốc.
- Không tuyên bố đã kiểm thử trình giả lập, thiết bị, cơ sở dữ liệu hoặc trình duyệt nếu chưa thật sự chạy.

## Kiểm tra bắt buộc và bàn giao

Chạy các kiểm tra liên quan đến phần đã sửa; với thay đổi xuyên suốt, chạy toàn bộ:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Trong PR, ghi rõ:

- nội dung đã thay đổi và phần chủ động không thực hiện;
- chính xác lệnh nào thành công hoặc thất bại;
- môi trường đã kiểm tra thủ công thật sự: trình duyệt, trình giả lập, thiết bị thật hoặc cơ sở dữ liệu;
- ảnh chụp màn hình hoặc trích đoạn log mà issue yêu cầu;
- rủi ro còn lại, phụ thuộc và issue tiếp theo.

Không làm yếu test, nuốt lỗi hoặc thêm test giữ chỗ chỉ để CI hiện màu xanh.
