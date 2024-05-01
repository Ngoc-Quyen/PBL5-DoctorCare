-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2020 at 02:41 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctorcare`
--
CREATE DATABASE IF NOT EXISTS `doctorcare` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `doctorcare`;

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
CREATE TABLE IF NOT EXISTS `clinics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `introductionHTML` text DEFAULT NULL,
  `introductionMarkdown` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `clinics`
--

INSERT INTO `clinics` (`id`, `name`, `introductionHTML`, `introductionMarkdown`, `description`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Gói khám sức khỏe tổng quát cơ bản cho nữ', '<p>Gói khám bao gồm: Khám lâm sàng, Xét nghiệm máu, xét nghiệm chức năng gan, thận, chức năng chuyển hóa, chụp Xquang, siêu âm ổ bụng, điện tim. \r\nGói khám tại Phòng khám Bệnh viện Đại học Y dược 1\r\nGói khám dành cho đối tượng trên 15 tuổi.</p>', 'Gói khám bao gồm: Khám lâm sàng, Xét nghiệm máu, xét nghiệm chức năng gan, thận, chức năng chuyển hóa, chụp Xquang, siêu âm ổ bụng, điện tim. \r\nGói khám tại Phòng khám Bệnh viện Đại học Y dược 1\r\nGói khám dành cho đối tượng trên 15 tuổi.', '', 'usa-az.jpg', '2020-11-13 19:44:36', '2020-11-13 20:44:20', NULL),
(2, 'Gói khám sức khỏe tổng quát nâng cao dành cho nam','<p>Gói khám giúp phát hiện: các vấn đề về thận, tiền liệt tuyến, tuyến giáp, tiết niệu, gan, mật, tim mắt, tai mũi họng, răng, bất thường về các loại tế bào máu, bệnh viêm gan siêu vi B, viêm gan siêu vi C....Kiểm tra tổng thể\r\nĐối tượng: Nam, trên 15 tuổi</p>', 'Gói khám giúp phát hiện: các vấn đề về thận, tiền liệt tuyến, tuyến giáp, tiết niệu, gan, mật, tim mắt, tai mũi họng, răng, bất thường về các loại tế bào máu, bệnh viêm gan siêu vi B, viêm gan siêu vi C....Kiểm tra tổng thể\r\nĐối tượng: Nam, trên 15 tuổi', 'Gói khám giúp phát hiện: các vấn đề về thận, tiền liệt tuyến, tuyến giáp, tiết niệu, gan, mật, tim mắt, tai mũi họng, răng, bất thường về các loại tế bào máu, bệnh viêm gan siêu vi B, viêm gan siêu vi C....Kiểm tra tổng thể\r\nĐối tượng: Nam, trên 15 tuổi', 'mayo-clinic-health-system.jpg', '2020-11-13 19:44:36', '2020-11-13 20:46:01', NULL),
(3, 'Gói khám sức khỏe tổng quát chuyên sâu dành cho nữ', NULL, NULL, NULL, 'campbell-clinic.jpg', '2020-11-13 19:44:36', '2020-11-13 19:44:36', NULL),
(4, 'Gói khám sức khỏe cơ bản', NULL, NULL, NULL, 'cleveland-clinic-usa.jpg', '2020-11-13 19:44:36', '2020-11-13 19:44:36', NULL),
(5, 'Gói khám tổng quát tiêu chuẩn cho nam và nữ ', NULL, NULL, NULL, 'clinic-Ft-McCoy.jpg', '2020-11-13 19:44:36', '2020-11-13 19:44:36', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--
DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `timeBooking` varchar(255) DEFAULT NULL,
  `dateBooking` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `doctorId`, `timeBooking`, `dateBooking`, `name`, `phone`, `content`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(2, 2, '08:00 - 09:00', '15/11/2020', 'Alex', '0321456789', 'very good!', 1, '2024-04-15 08:25:42', '2024-04-15 08:25:56', NULL),
(3, 2, '10:00 - 11:00', '15/11/2020', 'Kane', '0321848484', 'excellent service. I love it', 1, '2024-04-15 08:28:51', '2024-04-15 08:28:56', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctor_users`
--

DROP TABLE IF EXISTS `doctor_users`;
CREATE TABLE IF NOT EXISTS `doctor_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) NOT NULL,
  `specializationId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `doctor_users`
--

INSERT INTO `doctor_users` (`id`, `doctorId`, `specializationId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 2, 1, '2024-04-13 19:46:18', '2024-04-13 19:46:18', NULL),
(2, 3, 3, '2024-04-13 20:19:56', '2024-04-13 20:19:56', NULL),
(3, 4, 7, '2024-04-13 20:20:15', '2024-04-13 20:20:15', NULL),
(4, 5, 4, '2024-04-13 20:20:26', '2024-04-13 20:20:26', NULL),
(5, 6, 1, '2024-04-13 20:20:38', '2024-04-14 19:49:26', NULL),
(6, 7, 1, '2024-04-13 20:20:53', '2024-04-14 19:49:12', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `extrainfos`
--

DROP TABLE IF EXISTS `extrainfos`;
CREATE TABLE IF NOT EXISTS `extrainfos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` int(11) DEFAULT NULL,
  `historyBreath` text DEFAULT NULL,
  `placeId` int(11) DEFAULT NULL,
  `oldForms` text DEFAULT NULL,
  `sendForms` text DEFAULT NULL,
  `moreInfo` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `extrainfos`
--

INSERT INTO `extrainfos` (`id`, `patientId`, `historyBreath`, `placeId`, `oldForms`, `sendForms`, `moreInfo`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(6, 6, '', 0, NULL, NULL, '', '2024-04-16 23:04:01', '2024-04-16 23:04:01', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `statusId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `dateBooking` varchar(255) DEFAULT NULL,
  `timeBooking` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `isSentForms` tinyint(1) NOT NULL DEFAULT 0,
  `isTakeCare` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `patients`
--

INSERT INTO `patients` (`id`, `doctorId`, `userId`, `statusId`, `name`, `phone`, `dateBooking`, `timeBooking`, `email`, `gender`, `year`, `address`, `description`, `isSentForms`, `isTakeCare`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(4, 2, 3, 1, 'Alex', '0321456789', '15/11/2020', '08:00 - 09:00', 'alex@gmail.com', 'male', '1998', '', 'aaaaaaaaaaaaaaaaaa', 1, 0, '2024-04-14 20:20:18', '2024-04-14 20:22:14', NULL),
(5, 2, 3, 1, 'Kane', '0321848484', '15/11/2020', '10:00 - 11:00', 'kane@gmail.com', 'male', '1997', '', '', 0, 0, '2020-11-15 08:27:25', '2020-11-15 08:27:40', NULL),
(6, 2, 3, 1, 'HT', '0934978913', '17/04/2024', '13:00 - 14:00', 'hongtien003@gmail.com', 'male', '', '', '', 0, 0, '2024-04-16 23:04:01', '2024-04-16 23:28:49', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `places`
--

DROP TABLE IF EXISTS `places`;
CREATE TABLE IF NOT EXISTS `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)  ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `places`
--

INSERT INTO `places` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Đà Nẵng', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(2, 'Huế', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(3, 'Quảng Nam', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(4, 'Hà Tĩnh', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(5, 'Quảng Trị', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `contentMarkdown` text DEFAULT NULL,
  `contentHTML` text DEFAULT NULL,
  `forDoctorId` int(11) DEFAULT NULL,
  `forSpecializationId` int(11) DEFAULT NULL,
  `writerId` int(11) NOT NULL,
  `confirmByDoctor` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `contentMarkdown`, `contentHTML`, `forDoctorId`, `forSpecializationId`, `writerId`, `confirmByDoctor`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'No', 'No', '', -1, 1, 8 , NULL, NULL, '2024-03-13 20:29:11', '2024-03-13 20:35:21', NULL),
(2, '', 'No', '', -1, 2, 9, NULL, NULL, '2024-03-13 20:36:34', '2024-03-13 20:39:00', NULL),
(3, '', 'No', '', -1, 3, 10, NULL, NULL, '2024-03-13 20:38:04', '2024-03-13 20:38:43', NULL),
(4, 'Bác sĩ Phạm Hải Đăng', 'No', '<p>No</p>', 4, -1, 11, NULL, NULL, '2024-03-13 20:58:42', '2024-03-19 23:54:47', NULL),
(5, 'Bác sĩ Nguyễn Văn A', 'No', '<p>No</p>', 2, -1, 8, NULL, NULL, '2024-03-13 21:00:19', '2024-03-19 23:54:55', NULL),
(6, 'Bác sĩ Võ Văn B', 'No', '<p>No</p>', 3, -1, 9, NULL, NULL, '2024-03-13 21:00:37', '2024-04-19 23:54:03', NULL),
(7, 'Bác sĩ Phạm Bình Nguyên', 'No', '<p>No</p>', 5, -1, 10, NULL, NULL, '2024-03-13 21:00:52', '2024-03-19 23:53:54', NULL),
(8, 'Bác sĩ Nguyễn Cảnh Nam', 'No', '<p>No</p>', 6, -1, 11, NULL, NULL, '2024-03-13 21:01:09', '2024-04-19 23:53:43', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'ADMIN', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(2, 'DOCTOR', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(3, 'USER', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedules`
--

DROP TABLE IF EXISTS `schedules`;
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `maxBooking` varchar(255) DEFAULT NULL,
  `sumBooking` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=297 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `schedules`
--

INSERT INTO `schedules` (`id`, `doctorId`, `date`, `time`, `maxBooking`, `sumBooking`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(297, 2, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(298, 2, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(299, 2, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(300, 2, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(301, 2, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(302, 2, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(303, 2, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(304, 2, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(305, 2, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(306, 2, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(307, 2, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(308, 2, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(309, 2, '17/04/2024', '13:00 - 14:00', '2', '2', '2024-04-16 22:50:08', '2024-04-16 23:28:49', NULL),
(310, 2, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(311, 2, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(312, 2, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(313, 2, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(314, 2, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(315, 2, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(316, 2, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(317, 2, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(318, 2, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(319, 2, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(320, 2, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(321, 3, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(322, 3, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(323, 3, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(324, 3, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(325, 3, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(326, 3, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(327, 3, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(328, 3, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(329, 3, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(330, 3, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(331, 3, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(332, 3, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(333, 3, '17/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(334, 3, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(335, 3, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(336, 3, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(337, 3, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(338, 3, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(339, 3, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(340, 3, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(341, 3, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(342, 3, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(343, 3, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(344, 3, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(345, 4, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(346, 4, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(347, 4, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(348, 4, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(349, 4, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(350, 4, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(351, 4, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(352, 4, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(353, 4, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(354, 4, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(355, 4, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(356, 4, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(357, 4, '17/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(358, 4, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(359, 4, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(360, 4, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(361, 4, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(362, 4, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(363, 4, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(364, 4, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(365, 4, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(366, 4, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(367, 4, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(368, 4, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(369, 5, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(370, 5, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(371, 5, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(372, 5, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(373, 5, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(374, 5, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(375, 5, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(376, 5, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(377, 5, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(378, 5, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(379, 5, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(380, 5, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(381, 5, '17/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(382, 5, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(383, 5, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(384, 5, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(385, 5, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(386, 5, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(387, 5, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(388, 5, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(389, 5, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(390, 5, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(391, 5, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(392, 5, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(393, 6, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(394, 6, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(395, 6, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(396, 6, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(397, 6, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(398, 6, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(399, 6, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(400, 6, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(401, 6, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(402, 6, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(403, 6, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(404, 6, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(405, 6, '17/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(406, 6, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(407, 6, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(408, 6, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(409, 6, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(410, 6, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(411, 6, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(412, 6, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(413, 6, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(414, 6, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(415, 6, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(416, 6, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(417, 7, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(418, 7, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(419, 7, '16/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(420, 7, '16/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(421, 7, '16/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(422, 7, '16/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(423, 7, '16/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(424, 7, '16/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(425, 7, '17/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(426, 7, '17/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(427, 7, '17/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(428, 7, '17/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(429, 7, '17/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(430, 7, '17/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(431, 7, '17/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(432, 7, '17/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(433, 7, '18/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(434, 7, '18/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(435, 7, '18/04/2024', '10:00 - 11:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(436, 7, '18/04/2024', '11:00 - 12:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(437, 7, '18/04/2024', '13:00 - 14:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(438, 7, '18/04/2024', '14:00 - 15:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(439, 7, '18/04/2024', '15:00 - 16:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(440, 7, '18/04/2024', '16:00 - 17:00', '2', '0', '2024-04-16 22:50:08', '2024-04-16 22:50:08', NULL),
(441, 1, '16/04/2024', '09:00 - 10:00', '2', '0', '2024-04-16 23:27:55', '2024-04-16 23:27:55', NULL),
(442, 1, '16/04/2024', '08:00 - 09:00', '2', '0', '2024-04-16 23:33:06', '2024-04-16 23:33:06', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200311024259-users.js'),
('20200311025445-create-role.js'),
('20200311025538-create-post.js'),
('20200311025553-create-clinic.js'),
('20200311025604-create-specialization.js'),
('20200311025619-create-schedule.js'),
('20200311025632-create-status.js'),
('20200311025648-create-patient.js'),
('migration-create-comment.js'),
('migration-create-doctor-user.js'),
('migration-create-extraInfo.js'),
('migration-create-place.js'),
('migration-create-adminLog.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `session`
--

INSERT INTO `session` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('M4XQDCsE_8xdCiFdlIQxQk7Ska3Nby06', '2024-04-28 14:09:17', '{\"cookie\":{\"originalMaxAge\":86399996,\"expires\":\"2024-04-28T07:09:17.013Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"flash\":{}}', '2024-04-27 09:14:49', '2024-04-27 14:09:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `specializations`
--

DROP TABLE IF EXISTS `specializations`;
CREATE TABLE IF NOT EXISTS `specializations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `specializations`
--

INSERT INTO `specializations` (`id`, `name`, `description`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Tai Mũi Họng', NULL, 'TaiMuiHong.png', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(2, 'Phẫu thuật thần kinh', NULL, 'ThanKinh.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL),
(3, 'Tiêu hóa', NULL, 'TieuHoa.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL),
(4, 'Tim mạch', NULL, 'TimMach.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL),
(5, 'Đông Y', NULL, 'DongY.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL),
(6, 'Hô hấp', NULL, 'HoHap.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL),
(7, 'Nhi Khoa', NULL, 'NhiKhoa.png', '2024-04 19:44:36', '2024-04-13 19:44:36', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `statuses`
--

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'SUCCESS', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(2, 'FAILED', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(3, 'PENDING', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(4, 'NEW', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(5, 'DONE', '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `adminlogs`
--

DROP TABLE IF EXISTS `adminlogs`;
CREATE TABLE IF NOT EXISTS `adminlogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `adminlogs`
--

INSERT INTO `adminlogs` (`id`, `patientId`, `adminId`, `content`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(7, 4, 1, 'The patient made an appointment from the system ', '2024-04-14 20:20:18', '2024-04-14 20:20:18', NULL),
(8, 4, 1, 'New appointments have been received', '2024-04-14 20:20:41', '2024-04-14 20:20:41', NULL),
(9, 4, 1, 'Cancel with reason - The patient canceled the schedule', '2024-04-14 20:20:47', '2024-04-14 20:20:47', NULL),
(10, 5, 1, 'The patient made an appointment from the system ', '2024-04-15 08:27:25', '2024-04-15 08:27:25', NULL),
(11, 5, 1, 'New appointments have been received', '2024-04-15 08:27:36', '2024-04-15 08:27:36', NULL),
(12, 5, 1, 'The appointment has been successfully booked', '2024-04-15 08:27:40', '2024-04-15 08:27:40', NULL),
(13, 6, 1, 'The patient made an appointment from the system ', '2024-04-16 23:04:01', '2024-04-16 23:04:01', NULL),
(14, 6, 1, 'New appointments have been received', '2024-04-16 23:26:33', '2024-04-16 23:26:33', NULL),
(15, 6, 1, 'The appointment has been successfully booked', '2024-04-16 23:28:49', '2024-04-16 23:28:49', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT 'male',
  `description` text DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `phone`, `avatar`, `gender`, `description`, `roleId`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admin ', 'admin@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456732', 'admin.png', 'male', NULL, 1, 1, '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(2, 'Bác sĩ Nguyễn Văn A', 'doctor@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor3.jpg', 'male', '   ', 2, 1, '2024-04-13 19:44:36', '2024-04-13 19:46:18', NULL),
(3, 'Bác sĩ Võ Văn B', 'doctor5@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor4.jpg', 'male', '   ', 2, 1, '2024-04-13 19:44:36', '2024-04-13 20:19:55', NULL),
(4, 'Bác sĩ Phạm Hải Đăng', 'doctor10@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor1.jpg', 'male', '   ', 2, 1, '2024-04-13 19:44:36', '2024-04-13 20:20:15', NULL),
(5, 'Bác sĩ Phạm Bình Nguyên', 'doctor1@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor2.jpg', 'male', '   ', 2, 1, '2024-04-13 19:44:36', '2024-04-13 20:20:26', NULL),
(6, 'Bác sĩ Nguyễn Cảnh Nam', 'doctor2@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor3.jpg', 'male', '      ', 2, 1, '2024-04-13 19:44:36', '2024-04-14 19:49:26', NULL),
(7, 'Bác sĩ Bùi Minh Hà', 'doctor3@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456735', 'doctor4.jpg', 'male', '      ', 2, 1, '2024-04-13 19:44:36', '2024-04-14 19:49:12', NULL),
(8, 'Hoàng Văn Hải', 'user@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456736', 'supporter.png', 'male', NULL, 3, 1, '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(9, 'Nguyễn Minh Hậu', 'user1@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456736', 'supporter.png', 'male', NULL, 3, 0, '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(10, 'Vũ Hồng Hạnh', 'user2@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456736', 'supporter.png', 'male', NULL, 3, 1, '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL),
(11, 'Trần Văn Quang', 'user3@gmail.com', '$2a$07$Bq0hCq3kVrvKUHfMT0NJROmQkx09aEQkGlwBGEdw799YJvWqH1kuy', 'ĐN', '088456736', 'supporter.png', 'male', NULL, 3, 1, '2024-04-13 19:44:36', '2024-04-13 19:44:36', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
