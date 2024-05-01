# shared-doctor-care
## Quickstart (after downloading this project)
1. Open this project with your favorite editor(IDE), eg: Visual Studio Code
2. Run the command (to install the node_modules): npm install
3. Copy the .env.example, create a new file, name ".env"  in root folder (the same level with .env.example)
4. Create the database: open Mysql Workbench or PHP myadmin or any database management system, run the "database.sql" in the "database" folder.
It will automatically create a new schema, name "doctorcare" in your database.
5. Update the .env file
- If you use "no-password" to login to your database, this variable "DB_PASSWORD" will be blank, otherwise, provide your password.
Default, I use the root account. If you use other accounts, change the "DB_USERNAME" variable.
- With the variable "MAIL_USERNAME", is your email 
"MAIL_PASSWORD" is your email app password (not your email's password). you need to generate one here: https://myaccount.google.com/apppasswords
( Select App: Mail, Select Device: Windows Computer -> Generate )
6. To run this app, use the command: npm start

**Trong này từ đồ án cũ chuyển thành đồ án mới là
Supporter chuyển thành bệnh nhân
Clinic là gói khám (để package thì bị lỗi nên để clinic luôn)
Có gì sai sót khi chuyển thì sửa luôn nhé

Phần gói khám chưa hoàn thành
Phần supporter chuyển thành bệnh nhân vẫn chưa ổn
Chưa làm phần đăng nhập cho user
Mọi người check thử lại hết cái nào k ổn ghi vào đây nhé

Các quy trình sử dụng web (frontend)

- Đăng nhập
    Home (main/homepage/homepage.ejs)
    |__ Đăng nhập (auth/login.ejs)
        |__ Quên mật khẩu (auth/login.ejs)
            |__ Đổi mật khẩu (auth/reset-password.ejs)

- Đăng ký 
    Home (main/homepage/homepage.ejs)
    |__ Đăng ký (auth/register.ejs)

- Xem bác sĩ
    Home (main/homepage/homepage.ejs)
    |__ Tất cả bác sĩ (main/homepage/allDoctors.ejs)
        |__ Chi tiết bác sĩ (main/homepage/doctor.ejs)
    
    hoặc
    Home (main/homepage/homepage.ejs)
    |__ Tất cả chuyên khoa (main/homepage/allSpecialozation.ejs)
        |__ Chi tiết bác sĩ (main/homepage/doctor.ejs)

    có thêm phần bình luận của bệnh nhân đối với bác sĩ
        |__ Chi tiết bác sĩ (main/homepage/doctor.ejs)
            |__ Gửi bình luận (main/homepage/feedback.ejs)
    
    khi đặt lịch khám
        |__ Chi tiết bác sĩ (main/homepage/doctor.ejs)
            |__ Hiện thông tin đặt lịch khám (main/homepage/infoBooking.ejs)

- Xem chuyên khoa
    Home (main/homepage/homepage.ejs)
    |__ Tất cả chuyên khoa (main/homepage/allSpecialozation.ejs)
        |__ Chi tiết chuyên khoa (main/homepage/specialization.ejs)

- Xem gói khám
    Home (main/homepage/homepage.ejs)
    |__ Tất cả gói khám (main/homepage/allClinic.ejs)
        |__ Chi tiết gói khám (main/homepage/clinic.ejs)

- Xem bài đăng (chưa hoàn thiện)
    Home (main/homepage/homepage.ejs)
    |__ Tất cả bài đăng (main/homepage/allPostPagination.ejs)
        |__ Chi tiết bài đăng (main/homepage/post.ejs)
        |__ Tìm bài đăng (main/homepage/searchPost.ejs)

**Phần admin:

- Phần khung bên trái: (main/user/includes/sidebar.ejs)

- Phần khung phía trên: (main/user/includes/topbar.ejs)

- Phần chính của admin/dashboard/điều khiển: (main/user/home.ejs)

- Bác sĩ: 
    |__ Tạo bác sĩ: (main/user/admins/createDoctor.ejs)
    |__ Chỉnh sửa bác sĩ: (main/user/admins/editDoctor.ejs)
    |__ Quản lý bác sĩ: (main/user/admins/manageDoctor.ejs)

- Người dùng:
    |__ Quản lý người dùng: (main/user/admins/manageUser.ejs)  (Từ quản lý supporter chuyển qua quản lý user)

- Gói khám:
    |__ Tạo gói khám: (main/user/admins/createClinic.ejs)
    |__ Chỉnh sửa gói khám: (main/user/admins/editClinic.ejs)
    |__ Quản lý gói khám: (main/user/admins/manageClinic.ejs)

- Bài đăng:
    |__ Tạo bài đăng: (main/user/admins/createPost.ejs)
    |__ Chỉnh sửa bài đăng: (main/user/admins/editPost.ejs)
    |__ Quản lý bài đăng: (main/user/admins/managePost.ejs)


Khúc này hơi dư nên mn xem để coi bỏ phần nào nhé
- Lịch trình: (chưa hoàn thiện)
    |__ Tạo lịch trình: (main/user/admins/createSchedule.ejs)
    |__ Lịch trình: (main/user/admins/Schedule.ejs)

- Kế hoạch:
    |__ Quản lý kế hoạch (main/user/admins/manageScheduleForDoctor.ejs)

- Quản lý các lịch đã hẹn (chưa hoàn thiện) - có thể search và xem lại lịch đã hẹn
    |__ Quản lý lịch hẹn (main/user/admins/manageAppointment.ejs)

- Quản lý các bệnh nhân đặt lịch 
    |__ Quản lý bệnh nhân đặt lịch (main/user/admins/managePatient.ejs)