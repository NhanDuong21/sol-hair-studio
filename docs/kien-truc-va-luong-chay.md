# Kiến trúc và luồng chạy

Tài liệu này mô tả cấu trúc đang có trong repository sau lượt refactor. Phạm vi hiện tại là màn hình kiểm tra API, chưa có chức năng sản phẩm salon.

## A. Nhìn tổng thể

Repository là một monorepo npm workspaces gồm ba ứng dụng:

- `apps/api` là API Node.js/Express. API cung cấp `GET /api/health` và có thể kết nối MongoDB qua Mongoose nếu cấu hình `MONGODB_URI`.
- `apps/web` là ứng dụng React/Vite/Tailwind chạy trên trình duyệt.
- `apps/mobile` là ứng dụng React Native/Expo dùng cho Android và iOS.

Web và mobile gọi cùng hợp đồng API nhưng đọc base URL riêng từ biến môi trường. Mỗi app giữ HTTP helper và giao diện riêng để không kéo code DOM vào React Native hoặc code backend vào bundle client. Cây request health được tổ chức theo chức năng; trong feature, page/screen ghép giao diện, hook giữ trạng thái và vòng đời, API của feature chọn endpoint. Các helper cấp app nằm ngoài feature.

Root giữ `package.json` và `package-lock.json` duy nhất để cài cả ba workspace.

## B. Cây thư mục

### API

```text
apps/api/
├── scripts/
│   └── check-source.js              Quét đệ quy và kiểm tra cú pháp source API
├── src/
│   ├── config/
│   │   ├── env.js                   Đọc, chuẩn hóa và kiểm tra biến môi trường
│   │   └── database.js              Kết nối, ngắt kết nối và đọc trạng thái MongoDB
│   ├── middlewares/
│   │   ├── error-handler.js         Chuẩn hóa lỗi 400/500 và chuyển tiếp khi headers đã gửi
│   │   ├── not-found.js             Trả JSON 404 cho route không tồn tại
│   │   └── middlewares.test.js      Kiểm tra phản hồi lỗi 400/404/500
│   ├── modules/
│   │   └── health/
│   │       ├── health.routes.js     Khai báo GET /health dưới prefix /api
│   │       ├── health.controller.js Tạo phản hồi health và trạng thái database
│   │       └── health.test.js       Kiểm tra hợp đồng GET /api/health
│   ├── routes/
│   │   └── index.js                 Gom router module dưới prefix /api
│   ├── app.js                       Tạo Express app và ghép middleware/router
│   └── server.js                    Kết nối database, mở cổng và dừng êm
├── .env.example
├── eslint.config.js
└── package.json
```

### Web

```text
apps/web/src/
├── config/env.js                    Đọc và chuẩn hóa VITE_API_BASE_URL
├── routes/AppRoutes.jsx             Ánh xạ route / tới HealthPage
├── layouts/MainLayout.jsx           Giữ nền và khung trang hiện tại
├── features/health/
│   ├── pages/HealthPage.jsx          Ghép nội dung màn hình và trạng thái health
│   ├── components/HealthStatusCard.jsx  Hiển thị trạng thái và nút thử lại
│   ├── hooks/useHealth.js            Tải lần đầu, giữ state, thử lại và cleanup
│   ├── api/health.api.js             Gọi endpoint health qua HTTP helper
│   └── tests/health.api.test.js      Kiểm tra endpoint do feature chọn
├── lib/
│   ├── http.js                       Gọi JSON, timeout, abort và cleanup
│   ├── latest-request.js             Hủy request cũ và bỏ qua kết quả cũ
│   └── tests/                        Test helper HTTP và request mới nhất
├── App.jsx                           Đặt BrowserRouter và AppRoutes
├── main.jsx                          Tạo React root và nạp CSS toàn cục
└── index.css                         Điểm nhập Tailwind
```

### Mobile

```text
apps/mobile/
├── src/
│   ├── config/env.js                 Đọc và chuẩn hóa EXPO_PUBLIC_API_BASE_URL
│   ├── navigation/RootNavigator.jsx  Khai báo native stack một màn hình, ẩn header
│   ├── features/health/
│   │   ├── screens/HealthScreen.jsx  Ghép màn hình, SafeAreaView và StatusBar
│   │   ├── components/HealthStatusCard.jsx  Hiển thị trạng thái và nút thử lại
│   │   ├── hooks/useHealth.js         Tải lần đầu, giữ state, thử lại và cleanup
│   │   ├── api/health.api.js          Gọi endpoint health qua HTTP helper
│   │   └── tests/health.api.test.js   Kiểm tra endpoint do feature chọn
│   └── lib/
│       ├── http.js                   Gọi JSON, timeout, abort và cleanup
│       ├── latest-request.js          Hủy request cũ và bỏ qua kết quả cũ
│       └── tests/                    Test helper HTTP và request mới nhất
├── App.jsx                            Đặt SafeAreaProvider và NavigationContainer
├── index.js                           Đăng ký component gốc với Expo
├── app.json
└── package.json
```

`assets/` chứa hình ảnh giao diện Expo, không liệt kê từng ảnh ở đây.

## C. Thứ tự đọc code

- API: `apps/api/src/server.js` → `apps/api/src/app.js` → `apps/api/src/routes/index.js` → `apps/api/src/modules/health/health.routes.js` → `health.controller.js`.
- Web: `apps/web/src/main.jsx` → `App.jsx` → `routes/AppRoutes.jsx` → `layouts/MainLayout.jsx` → `features/health/pages/HealthPage.jsx` → `hooks/useHealth.js` → `api/health.api.js` → `lib/http.js`.
- Mobile: `apps/mobile/index.js` → `App.jsx` → `src/navigation/RootNavigator.jsx` → `features/health/screens/HealthScreen.jsx` → `hooks/useHealth.js` → `api/health.api.js` → `lib/http.js`.

## D. Luồng chạy health

### Mở màn hình

Web vào `main.jsx`, nơi tạo React root và render `App` trong `StrictMode`. `App.jsx` đặt một `BrowserRouter`; `AppRoutes` chọn route `/`, rồi `MainLayout` giữ nền và khung trang. `HealthPage` gọi `useHealth`. Hook khởi tạo state `loading` và chạy `loadHealth` trong `useEffect`.

Mobile vào `index.js`, Expo đăng ký `App.jsx`. `App` đặt một `SafeAreaProvider` và một `NavigationContainer`; `RootNavigator` đăng ký screen `Health` với header tắt. `HealthScreen` dùng `SafeAreaView` theo bốn cạnh và gọi `useHealth` để bắt đầu cùng luồng tải.

### Bấm “Kiểm tra lại”

`HealthStatusCard` gọi callback `retry` được truyền qua props. `useHealth` bỏ qua callback nếu state vẫn `loading`; nếu không, đặt lại `loading` rồi gọi `loadHealth`. Nút cũng bị disable trong lúc tải để không tạo lượt bấm chồng nhau.

### API không phản hồi hoặc timeout

`health.api.js` chọn đường dẫn `/api/health` rồi gọi `requestJson` trong `lib/http.js`. HTTP helper tạo `AbortController` cho fetch, đặt timeout hữu hạn 8 giây, nối signal do hook quản lý và trong `finally` xóa timer cũng như listener. Khi hết thời gian, helper đổi lỗi abort do timeout thành thông báo có thể thử lại; hook chuyển lỗi thành state `error` để card hiển thị.

### API trả lỗi

Nếu response có HTTP status ngoài khoảng thành công, `requestJson` ném lỗi `API trả về HTTP <status>.` Feature không tự xử lý fetch hoặc timeout; hook nhận lỗi và đặt state `error`. Khi người dùng thử lại, cùng hook chuyển về `loading` và thực hiện một request mới.

### Rời màn hình hoặc bắt đầu request mới

`useHealth` cleanup gọi `requestManager.cancel()` khi component unmount. `latest-request.js` tăng mã request và abort controller đang chạy; vì vậy kết quả sau cleanup bị đánh dấu `ignored` và không cập nhật giao diện. Nếu request mới bắt đầu, request manager cũng hủy request cũ và chỉ trả kết quả của mã mới nhất. HTTP helper chịu việc abort fetch và dọn tài nguyên của chính request; request manager chịu vòng đời và tính mới nhất của kết quả.

### Luồng API

`server.js` gọi `connectToDatabase(config.mongoUri)`; nếu URI trống, database giữ trạng thái `not-configured` và API vẫn khởi động. `app.js` lần lượt gắn CORS, JSON parser, `apiRouter`, `notFound` và `errorHandler`. `healthRouter` ánh xạ `/health` tới `getHealth`, controller trả JSON hiện có cùng timestamp ISO.

Parser JSON không hợp lệ được `errorHandler` nhận diện và trả 400 `INVALID_JSON`. Endpoint không tồn tại đi qua `notFound` trả 404 `NOT_FOUND`. Lỗi khác được log thông tin an toàn rồi trả 500 `INTERNAL_ERROR`; nếu header đã gửi, middleware chuyển lỗi cho Express qua `next(error)`.

## E. Hướng dẫn thêm tính năng sau này

Ví dụ dưới đây chỉ chỉ đường đặt code cho “danh mục dịch vụ”; đây không phải xác nhận scope với giảng viên và không phải hạng mục được triển khai trong lượt này.

- API: tạo `apps/api/src/modules/services/` với route, controller, service, model và test tương ứng khi từng phần có trách nhiệm thật. Đăng ký router tại `apps/api/src/routes/index.js`.
- Web: đặt page, component, hook, API và test trong `apps/web/src/features/services/`. Thêm route cần thiết tại `routes/AppRoutes.jsx`.
- Mobile: đặt screen, component, hook, API và test trong `apps/mobile/src/features/services/`. Đăng ký screen trong `src/navigation/RootNavigator.jsx`.
- Cả hai client gọi cùng hợp đồng API; mỗi client tiếp tục dùng base URL riêng theo môi trường. Không chuyển component DOM sang mobile.

Không cần tạo đủ mọi tệp trước khi tính năng cần chúng.

## F. Quy tắc chọn vị trí code

- **Page/screen** ghép nội dung của một màn hình. **Component** trình bày một phần giao diện qua props; component không tự gọi endpoint.
- **Hook** giữ state, vòng đời và thao tác của feature. **Hàm API của feature** biết endpoint nào cần gọi và chuyển tham số sang HTTP helper.
- **HTTP helper** xử lý cơ chế chung như URL, response JSON, timeout, abort và cleanup. Nó không chứa endpoint health cụ thể.
- **Controller** nhận request/response HTTP và tạo phản hồi. **Service** chứa quy tắc nghiệp vụ độc lập với `req`/`res`; chỉ thêm khi nghiệp vụ có logic cần tách.
- Chỉ đưa component lên thư mục dùng chung khi có ít nhất hai feature thật sự sử dụng cùng component. Web và native không dùng chung UI.
- Tạo các tệp theo nhu cầu feature; không thêm service/model giả, barrel export, helper tổng quát hoặc tầng bổ sung chỉ để hoàn tất một cây thư mục.

## G. Đường dẫn cũ → mới

| Đường dẫn trước refactor | Vị trí sau refactor |
| --- | --- |
| `apps/api/src/config.js` | `apps/api/src/config/env.js` |
| `apps/api/src/database.js` | `apps/api/src/config/database.js` |
| Handler health trong `apps/api/src/app.js` | `modules/health/health.routes.js` và `health.controller.js` |
| Handler 404/500 trong `apps/api/src/app.js` | `middlewares/not-found.js` và `middlewares/error-handler.js` |
| `apps/api/src/app.test.js` | `modules/health/health.test.js` và `middlewares/middlewares.test.js` |
| `apps/web/src/App.jsx` | `routes/AppRoutes.jsx`, `layouts/MainLayout.jsx`, `features/health/pages/HealthPage.jsx`, `components/HealthStatusCard.jsx`, `hooks/useHealth.js` |
| `apps/web/src/api.js` | `features/health/api/health.api.js`, `lib/http.js`, `lib/latest-request.js`, `config/env.js` |
| `apps/web/src/api.test.js` | `features/health/tests/health.api.test.js` và `lib/tests/` |
| `apps/mobile/App.jsx` | `src/navigation/RootNavigator.jsx`, `features/health/screens/HealthScreen.jsx`, `components/HealthStatusCard.jsx`, `hooks/useHealth.js` |
| `apps/mobile/src/api.js` | `src/features/health/api/health.api.js`, `src/lib/http.js`, `src/lib/latest-request.js`, `src/config/env.js` |
| `apps/mobile/src/api.test.js` | `src/features/health/tests/health.api.test.js` và `src/lib/tests/` |
