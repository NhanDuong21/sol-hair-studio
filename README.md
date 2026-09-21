# Sol Hair Studio

Nền tảng dùng chung cho bài tập SDN302 và MMA301. Repository này chứa ba phần độc lập nhưng dùng chung API và dữ liệu:

| Phần | Công nghệ hiện tại | Vai trò trong nền ban đầu |
| --- | --- | --- |
| `apps/web` | React + Vite + JavaScript/JSX + Tailwind CSS | Trang web thích ứng, gọi endpoint kiểm tra API |
| `apps/mobile` | React Native + Expo + JavaScript/JSX | Ứng dụng Android/iOS, gọi endpoint kiểm tra API |
| `apps/api` | Node.js + Express + JavaScript | API dùng chung và kết nối MongoDB tùy chọn |

Đây mới là nền kỹ thuật ban đầu. Repository **chưa** tuyên bố đáp ứng rubric, chưa có đăng nhập, đặt lịch, thanh toán, trang tổng quan hay danh mục dịch vụ. Phạm vi hai môn và các giả định đang được ghi tại [docs/course-scope.md](docs/course-scope.md).

## Runtime và cài đặt

- Node.js `24.15.0` (dòng Node 24 LTS; xem `.nvmrc`).
- npm `11.12.1` (được ghi trong `packageManager`).
- MongoDB là tùy chọn ở nền ban đầu; cần khi bắt đầu lưu dữ liệu thật.

Trên Windows PowerShell:

```powershell
nvm install 24.15.0
nvm use 24.15.0
npm ci
```

Nếu không dùng NVM for Windows, cài một bản Node 24 LTS tương thích với trường `engines` trong `package.json` rồi chạy `npm ci` ở thư mục gốc. Repository dùng một `package-lock.json` chung; không cài dependency riêng trong từng app. Chỉ dùng `npm install` khi chủ động thay đổi dependency và phải commit lockfile tương ứng.

## Cấu hình môi trường

Không commit file `.env` hoặc thông tin MongoDB thật. Các file mẫu có thể sao chép bằng PowerShell:

```powershell
Copy-Item apps\api\.env.example apps\api\.env
Copy-Item apps\web\.env.example apps\web\.env
Copy-Item apps\mobile\.env.example apps\mobile\.env
```

API vẫn khởi động và trả kết quả kiểm tra khi chưa có `MONGODB_URI`; trạng thái cơ sở dữ liệu khi đó là `not-configured`. Nếu dùng MongoDB cục bộ, URI khuyến nghị là `mongodb://127.0.0.1:27017/sol_hair_studio`. Nếu dùng MongoDB Atlas, đặt chuỗi kết nối trong `apps/api/.env`, không đưa tên đăng nhập hoặc mật khẩu vào Git.

`CORS_ORIGIN` nhận `*` hoặc danh sách nguồn phân cách bằng dấu phẩy. Khi chạy web mặc định, đặt `http://localhost:5173`.

## Chạy từng phần

Mở ba cửa sổ PowerShell tại thư mục gốc:

```powershell
npm run dev:api
npm run dev:web
npm run dev:mobile
```

- API mặc định: `http://localhost:4000`; endpoint kiểm tra: `GET /api/health`.
- Web mặc định: `http://localhost:5173` và đọc `VITE_API_BASE_URL`.
- Ứng dụng di động đọc `EXPO_PUBLIC_API_BASE_URL`.

Địa chỉ API cho ứng dụng di động phụ thuộc môi trường, không dùng một giá trị cho mọi thiết bị:

| Nơi chạy ứng dụng di động | Ví dụ `EXPO_PUBLIC_API_BASE_URL` |
| --- | --- |
| iOS Simulator trên cùng máy Mac | `http://localhost:4000` |
| Android Emulator mặc định | `http://10.0.2.2:4000` |
| Điện thoại thật cùng Wi-Fi | `http://<IPv4-của-máy-chạy-API>:4000` |

Với điện thoại thật, cho phép Node.js qua Windows Firewall nếu được hỏi và bảo đảm hai thiết bị cùng mạng. Không dùng `localhost` trên điện thoại vì địa chỉ đó trỏ về chính điện thoại.

## Quy ước giao diện

- Giao diện web dùng lớp tiện ích của Tailwind CSS. `apps/web/src/index.css` chỉ nhập Tailwind; không tổ chức giao diện bằng các file CSS viết tay theo từng thành phần.
- React Native dùng `StyleSheet` native vì Tailwind CSS của web không áp dụng trực tiếp cho Android/iOS. Chỉ thêm NativeWind hoặc giải pháp tương tự sau khi nhóm ghi nhận quyết định trong Sheet.
- Thành phần giao diện dùng file `.jsx`; toàn repository không dùng file `.ts` hoặc `.tsx`.

## Quy tắc mở rộng kiến trúc

- Giữ `apps/api/src/app.js` cho việc ghép middleware, route và xử lý lỗi chung. Khi một miền nghiệp vụ có nhiều route, tách theo miền dưới `apps/api/src/modules/<ten-mien>` thay vì làm `app.js` phình to.
- Giữ lời gọi API của web và mobile trong `src/api.js`. Khi có màn hình hoặc cụm giao diện độc lập, tách khỏi `App.jsx` thành component/screen nhỏ; không tạo abstraction trước khi có nhu cầu thật.
- Web và mobile dùng chung hợp đồng dữ liệu, không dùng chung component giao diện. Chỉ tạo package dùng chung khi có mã JavaScript thuần thực sự được cả hai phía dùng và có test bảo vệ hợp đồng đó.
- API base URL luôn đi qua biến môi trường; timeout, hủy request và bỏ qua kết quả cũ phải được giữ khi thêm luồng gọi API mới.

## Kiểm tra

```powershell
npm run lint
npm test
npm run build
```

Toàn bộ mã nguồn dùng JavaScript/JSX nên không có bước `typecheck`. ESLint, test và bước build chịu trách nhiệm kiểm tra tự động.

Lệnh `build` tạo gói triển khai web, kiểm tra cú pháp API và xuất gói JavaScript Android/iOS của Expo. Việc xuất gói không thay thế chạy ứng dụng trên trình giả lập hoặc thiết bị thật và không tạo APK/IPA đã ký.

Các lệnh riêng hữu ích:

```powershell
npm run test:api
npm run build:web
npm run bundle:mobile
```

## Cộng tác

[Sol Hair Studio — Kế hoạch & phân công](https://docs.google.com/spreadsheets/d/1mKBFo0c1PcSJEVwbI80AAsorL47a7VyGk-nE0hIGLbw/edit) là nguồn phân công chính. Mỗi công việc có mã cố định dạng `SOL-xxx`; nhóm thống nhất người làm và hạn trước khi điền vào Sheet.

Luồng làm việc chuẩn:

1. Chọn công việc trên Sheet và chuyển trạng thái sang `Đang làm` sau khi nhóm thống nhất.
2. Tạo nhánh riêng, ví dụ `feat/SOL-003-service-catalog` hoặc `fix/SOL-008-api-timeout`.
3. Triển khai, chạy kiểm tra liên quan và mở pull request có mã việc cùng liên kết Sheet.
4. Review, sửa phản hồi và chỉ merge khi check `Lint, test and build` thành công theo policy repository.
5. Sau khi nghiệm thu/merge, cập nhật trạng thái và bằng chứng trên Sheet.

GitHub Issues hiện có được giữ làm lịch sử hoặc nguồn tham chiếu. Không bắt buộc tạo issue, GitHub Project, Sprint hay milestone cho công việc mới và không push thẳng vào `main`. Quy tắc đầy đủ dành cho thành viên và trợ lý mã nguồn nằm trong [AGENTS.md](AGENTS.md).
