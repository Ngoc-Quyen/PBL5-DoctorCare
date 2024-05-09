-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 09, 2024 lúc 04:05 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pbl5`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `allcodes`
--

CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEn` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `allcodes`
--

INSERT INTO `allcodes` (`id`, `key`, `type`, `valueEn`, `valueVi`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE', 'Admin', 'Quản trị viên', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE', 'Doctor', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE', 'Patient', 'Bệnh nhân', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'S1', 'STATUS', 'New', 'Lịch hẹn mới', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'S2', 'STATUS', 'Confirmed', 'Đã xác nhận', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'S3', 'STATUS', 'Done', 'Đã khám xong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'S4', 'STATUS', 'Cancel', 'Đã hủy', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T1', 'TIME', '8:00 AM - 8:15 AM', '8:00 - 8:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T2', 'TIME', '8:20 AM - 8:35 AM', '8:20 - 8:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T3', 'TIME', '8:40 AM - 8:55 AM', '8:40 - 8:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T4', 'TIME', '9:00 AM - 9:15 AM', '9:00 - 9:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T5', 'TIME', '9:20 AM - 9:35 AM', '9:20 - 9:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T6', 'TIME', '9:40 AM - 9:55 AM', '9:40 - 9:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T7', 'TIME', '10:00 AM - 10:15 AM', '10:00 - 10:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T8', 'TIME', '10:20 AM - 10:35 AM', '10:20 - 10:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'T9', 'TIME', '10:40 AM - 10:55 AM', '10:40 - 10:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'T10', 'TIME', '1:00 PM - 1:15 PM', '13:00 - 13:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'T11', 'TIME', '1:20 PM - 1:35 PM', '13:20 - 13:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'T12', 'TIME', '1:40 PM - 1:55 PM', '13:40 - 13:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'T13', 'TIME', '2:00 PM - 2:15 PM', '14:00 - 14:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'T14', 'TIME', '2:20 PM - 2:35 PM', '14:20 - 14:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'T15', 'TIME', '2:40 PM - 2:55 PM', '14:40 - 14:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'T16', 'TIME', '3:00 PM - 3:15 PM', '15:00 - 15:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'T17', 'TIME', '3:20 PM - 3:35 PM', '15:20 - 15:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'T18', 'TIME', '3:40 PM - 3:55 PM', '15:40 - 15:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'T19', 'TIME', '4:00 PM - 4:15 PM', '16:00 - 16:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'T20', 'TIME', '4:20 PM - 4:35 PM', '16:20 - 16:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'T21', 'TIME', '4:40 PM - 4:55 PM', '16:40 - 16:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'P0', 'POSITION', 'None', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'P1', 'POSITION', 'Master', 'Thạc sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 'P2', 'POSITION', 'Doctor', 'Tiến sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'P3', 'POSITION', 'Associate Professor', 'Phó giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'P4', 'POSITION', 'Professor', 'Giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'M', 'GENDER', 'Male', 'Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 'F', 'GENDER', 'Female', 'Nữ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'O', 'GENDER', 'Other', 'Khác', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `id` varchar(255) NOT NULL,
  `pateintId` varchar(255) DEFAULT NULL,
  `doctorId` varchar(255) DEFAULT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `ExamimationDate` date DEFAULT NULL,
  `ExamimationTime` time DEFAULT NULL,
  `TimeBooking` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `packageId` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctorspecialties`
--

CREATE TABLE `doctorspecialties` (
  `id` int(11) NOT NULL,
  `doctorId` varchar(255) DEFAULT NULL,
  `specialtyId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `doctorspecialties`
--

INSERT INTO `doctorspecialties` (`id`, `doctorId`, `specialtyId`, `createdAt`, `updatedAt`) VALUES
(1, 'eric2@gmail.com', 'CXK', '2024-05-09 02:48:54', '2024-05-09 14:03:47'),
(13, 'eric2@gmail.com', 'TK', '2024-05-09 13:38:56', '2024-05-09 14:03:29'),
(14, 'hongquang68@gmail.com', 'TH', '2024-05-09 13:39:26', '2024-05-09 13:39:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `histories`
--

CREATE TABLE `histories` (
  `id` varchar(255) NOT NULL,
  `pateintId` varchar(255) DEFAULT NULL,
  `doctorId` varchar(255) DEFAULT NULL,
  `decription` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `id` varchar(255) NOT NULL,
  `currentNumber` int(11) DEFAULT NULL,
  `maxNumber` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `doctorId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-allcode.js'),
('migration-create-booking.js'),
('migration-create-doctor-specialty.js'),
('migration-create-history.js'),
('migration-create-schedule.js'),
('migration-create-specialty.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('GrTFjZ5eNj2SIWcMFzA1xP4sEsHpkSbI', '2024-05-10 18:03:34', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-05-10T11:03:34.144Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"flash\":{},\"user\":{\"email\":\"eric2@gmail.com\",\"roleId\":\"2\"}}', '2024-05-09 18:03:25', '2024-05-09 18:03:34'),
('WPzL6MbGPpOddh9-6nTyM6lYpFDOLIiy', '2024-05-10 20:23:53', '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2024-05-10T13:23:53.355Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"flash\":{},\"user\":{\"email\":\"eric2@gmail.com\",\"roleId\":\"2\"}}', '2024-05-09 18:48:43', '2024-05-09 20:23:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `specialties`
--

CREATE TABLE `specialties` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `specialties`
--

INSERT INTO `specialties` (`id`, `name`, `description`, `avatar`, `createdAt`, `updatedAt`) VALUES
('CXK', 'Cơ xương khớp', 'mo ta cxk', 'https://firebasestorage.googleapis.com/v0/b/pbl5-a1f37.appspot.com/o/avatarUser%2FavtProfile.png?alt=media&token=1cce41f4-4103-49c0-a510-b7fae4e8a31d', '2024-05-08 10:16:11', '2024-05-09 01:55:07'),
('TH', 'Tieu hoa', 'Mota khoa tieu hoa', 'https://firebasestorage.googleapis.com/v0/b/pbl5-a1f37.appspot.com/o/avatarUser%2FavtProfile.png?alt=media&token=1cce41f4-4103-49c0-a510-b7fae4e8a31d', '2024-05-09 01:58:17', '2024-05-09 01:58:17'),
('TK', 'Thần kinh', 'mo ta Than kinh', 'Anh chua chinh sua', '2024-05-08 10:15:30', '2024-05-09 01:54:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` date DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`, `gender`, `address`, `phone`, `birthday`, `avatar`, `roleId`, `createdAt`, `updatedAt`) VALUES
('acer@gmail.com', '$2a$10$SPyPaWn9HEGdn0/bFm/kpOrXIghhxdNjxd9Sq0C8Nn7zIf/0v2q0y', 'Admin', 'Laptop', 1, 'Trung Quoc', '0967838838', '2022-07-13', NULL, '1', '2024-05-03 19:07:16', '2024-05-09 20:02:36'),
('baophuc@gmail.com', '$2a$10$yVSaGhrPZfFsBrNRtnWSBOtIYD.fjZTXj5PvyrrK23QjUR2WcIbRm', 'Bảo Phúc', 'Phạm', NULL, NULL, NULL, NULL, NULL, '3', '2024-05-07 16:03:50', '2024-05-07 16:03:50'),
('eric2@gmail.com', '$2a$10$MrgeTyCqKVwhBRjL00nis.sEiXLOvtvAhuIhV1qcJXuV8JM81l4zi', 'Eric tu Postman', 'Nguyen tu Client', 1, 'Ha Noi', '0908766556', NULL, NULL, '2', '2024-05-03 21:30:28', '2024-05-09 02:38:06'),
('gamer@gmail.com', '$2a$10$NawXko2ywhtBurwfW001tuFsd2zvKAs7AYXNL15On6B3doBdyIOY6', 'Gamer', 'Stream', 1, 'Trung Quoc', '0967838838', NULL, NULL, '1', '2024-05-03 19:08:44', '2024-05-03 19:08:44'),
('hongquang68@gmail.com', '$2a$10$zIZZhHNpWe2.EBO5FbneAumaKGvfvaR/oiEl.LwYBq.vFwad0Of1u', 'Hong Quang', 'Nguyen Thi', NULL, NULL, NULL, NULL, NULL, '2', '2024-05-07 16:01:26', '2024-05-09 02:37:38'),
('hongtrang12@gmail.com', '$2a$10$IovKBp7DO8HMEGdsYHdFo.3R7j4JgXJoImjp5N9r7yjKVDjFTzRt.', 'Trang', 'Pham', NULL, NULL, NULL, NULL, NULL, '3', '2024-05-07 15:56:50', '2024-05-07 15:56:50'),
('quangminh@gmail.com', '$2a$10$IovKBp7DO8HMEGdsYHdFo.3R7j4JgXJoImjp5N9r7yjKVDjFTzRt.', 'Quang Minh', 'Trần', NULL, NULL, NULL, NULL, NULL, '3', '2024-05-07 15:58:27', '2024-05-07 15:58:27'),
('quyentran23@gmail.com', '$2a$10$UndaotZvq9sSm6SGZko94eDvw9F13CDBltwwERpx5d5gpaq0ItLQi', 'Thinh', 'Nguyen', NULL, NULL, NULL, NULL, NULL, '2', '2024-05-07 11:02:59', '2024-05-09 02:35:30');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `doctorspecialties`
--
ALTER TABLE `doctorspecialties`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Chỉ mục cho bảng `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `doctorspecialties`
--
ALTER TABLE `doctorspecialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
