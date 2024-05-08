# Backend

1.  Tạo bảng lên database MySql dùng câu lệnh: npx sequelize-cli db:migrate
2.  Up dữ liệu lên database MySql: npx sequelize-cli db:seed:all
    => Tham khảo ở đây: https://sequelize.org/docs/v6/other-topics/migrations/
3.  Hash code password:
    cài bcrypt -> npm install --save bcrypt
    \*Nếu bị lỗi thì cài : npm i bcryptjs
4.  Hiển thị vai truong mong muon (ko phai hien thi het)
    let user = await db.User.findOne({
    atributes: ['email', 'roleId'], // Lay vai truong mong muon
    where: { email: userEmail },
    });

khi gọi db nhớ phải dùng await

5. Cách xóa các commit chưa được push
   Mixed Reset: Lệnh này sẽ chuyển HEAD của bạn đến commit mà bạn muốn quay lại và đặt tất cả các thay đổi từ commit đó trở về trạng thái "staged" (đã được chuẩn bị cho commit).
   git reset --mixed HEAD~[số commit]
