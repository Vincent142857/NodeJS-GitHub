# Nhận AccessToken mới khi Token hết hạn mà người dùng không cần login lại như Facebook | Axios API

Method 1: Kiem tra thoi gian tren may local truoc khi gui len server, tiet kiem duoc request
https://www.youtube.com/watch?v=7fKjiBcBj3E


# REST Security với JWT có lẽ đây là phương pháp tốt nhất AccessToken hết hạn hiện nay | JWT Secure. Check token ngay tren server

https://www.youtube.com/watch?v=nONm8yu_9gE&t=158s
Triển khai phương án 2, bào mật tốt nhất

## Save token
sessionStorage
localStorage
cookie


# Cách triển khai thuật toán CHẶN HACKER chiếm JWT cho dù đánh cắp KEYSECRET trong database | JWT
https://www.youtube.com/watch?v=pK3oBX0vB38&t=649s


# Token (JWT) Làm sao thu hồi một token bị HACK và một vài câu hỏi về mức độ an toàn khi sử dụng token
https://www.youtube.com/watch?v=93fTk16-st0&t=212s

## Vi sao Access Token lai ton tai trong thoi gian ngan?
* Các ứng dụng khác đang sử dụng cùng một Access Token, và việc này khiến thời gian tồn tại của Access Token trở nên ngắn hạn.
* Nếu ứng dụng không hoạt động một thời gian dài, các Access Token đã tạo ra sẽ hết hạn và phải được cập nhật lại.
* Nếu người dùng cố gắng đăng nhập vào lúc Access Token đã hết hạn, ứng dụng sẽ cần tạo một Access Token mới để duy trì truy cập.


Token refresh được sử dụng khi token access cần được gia hạn. Một khi ứng dụng nhận được token access, nó có thể sử dụng nó để truy cập vào các tài nguyên bảo vệ cho một khoảng thời gian nhất định (thường là vài giờ). Sau đó, token access sẽ hết hạn, và ứng dụng sẽ cần sử dụng token refresh để lấy một token access mới.

