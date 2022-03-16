-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2022 at 02:26 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gemstar_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `carousel`
--

CREATE TABLE `carousel` (
  `carousel_id` varchar(40) NOT NULL,
  `users_id` varchar(40) NOT NULL,
  `caption` varchar(100) NOT NULL,
  `date_updated` float NOT NULL,
  `is_inactive` int(1) NOT NULL DEFAULT 0,
  `file_name` varchar(255) NOT NULL,
  `file_destination` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` varchar(40) NOT NULL,
  `project_id` varchar(40) NOT NULL,
  `users_id` varchar(40) NOT NULL,
  `comment_content` varchar(1000) NOT NULL,
  `date_created` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `project_id`, `users_id`, `comment_content`, `date_created`) VALUES
('33b2d1e5-4487-49e8-bab4-1c5b37e4565f', '880661c2-9822-421f-b096-c2d14f88595a', '1dfa4584-e597-4822-b065-e01ba29038dd', '<p class=\"mb-0\">test</p>', 1638500000000);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `logs_id` varchar(50) NOT NULL,
  `logs_type` varchar(200) NOT NULL,
  `created_at` float NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `users_id` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` varchar(40) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `url_link` varchar(1000) NOT NULL,
  `date` float NOT NULL,
  `notified_by` varchar(40) NOT NULL,
  `users_id` varchar(40) NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `is_dismiss` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` varchar(40) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_description` varchar(500) NOT NULL,
  `users_id` varchar(40) NOT NULL,
  `employee_id` varchar(40) NOT NULL,
  `start_date` float NOT NULL,
  `end_date` float NOT NULL,
  `date_created` float NOT NULL,
  `status_id` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `users_id`, `employee_id`, `start_date`, `end_date`, `date_created`, `status_id`) VALUES
('b5e55ec2-d004-4c98-bb5f-405bee451d3a', 'Test Project 1', '', 'bdbd7ee2-70cd-4f86-afed-0f2444d5778e', '329e1d64-b4f1-44bc-9537-2d8a9926e338', 1638750000000, 1639180000000, 1638760000000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `project_file`
--

CREATE TABLE `project_file` (
  `project_file_id` varchar(40) NOT NULL,
  `project_id` varchar(40) NOT NULL,
  `date_uploaded` float NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `original_file_name` varchar(255) NOT NULL,
  `file_path` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_file`
--

INSERT INTO `project_file` (`project_file_id`, `project_id`, `date_uploaded`, `file_name`, `original_file_name`, `file_path`) VALUES
('4b6f87a6-949e-41f6-8879-4665e1f1c3d1', 'b5e55ec2-d004-4c98-bb5f-405bee451d3a', 1638760000000, '45cce1ff-ac4b-4867-9455-b6cca1701761.jpg', 'IMG20211008142010.jpg', 'uploads/projects/b5e55ec2-d004-4c98-bb5f-405bee451d3a'),
('8f9b47e0-6133-4f5b-84ef-b8ed51625aa0', '4ff5aadc-975f-4cae-acb3-c26fb1641619', 1638470000000, '0873f8b1-6b67-449e-9588-62cdded5c09e.jpg', 'IMG20211008142010.jpg', 'uploads/projects/4ff5aadc-975f-4cae-acb3-c26fb1641619'),
('f525efa6-4f22-4319-a642-621d8111cfb4', '880661c2-9822-421f-b096-c2d14f88595a', 1638470000000, '5b8cf510-a97c-4c0c-a374-939d23f7aec6.jpg', 'IMG20211008142010.jpg', 'uploads/projects/880661c2-9822-421f-b096-c2d14f88595a');

-- --------------------------------------------------------

--
-- Table structure for table `project_qoutation`
--

CREATE TABLE `project_qoutation` (
  `project_qoutation_id` varchar(40) NOT NULL,
  `project_qoutation_detail_id` varchar(40) NOT NULL,
  `quantity` int(4) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `services_id` varchar(40) NOT NULL,
  `services_name` varchar(200) NOT NULL,
  `unit_price` float NOT NULL,
  `price` float NOT NULL,
  `last_updated` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_qoutation`
--

INSERT INTO `project_qoutation` (`project_qoutation_id`, `project_qoutation_detail_id`, `quantity`, `unit`, `services_id`, `services_name`, `unit_price`, `price`, `last_updated`) VALUES
('e773376d-5ddf-4916-83cd-f1a0b8c6c9e2', '4da72537-6ba6-47f5-8dc4-71df57faed4e', 12, 'pcs', 'd79242f7-2d77-4b66-bcdd-cc037d5cf7b8', 'Engine Valve Ring Insert / Fabrication/Installation', 12312, 147744, 1638760000000);

-- --------------------------------------------------------

--
-- Table structure for table `project_qoutation_detail`
--

CREATE TABLE `project_qoutation_detail` (
  `project_qoutation_detail_id` varchar(40) NOT NULL,
  `date` float NOT NULL,
  `customer` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `engine_model` varchar(100) NOT NULL,
  `serial_number` varchar(40) NOT NULL,
  `project_id` varchar(40) NOT NULL,
  `is_final` tinyint(1) NOT NULL,
  `is_show` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_qoutation_detail`
--

INSERT INTO `project_qoutation_detail` (`project_qoutation_detail_id`, `date`, `customer`, `address`, `engine_model`, `serial_number`, `project_id`, `is_final`, `is_show`) VALUES
('4da72537-6ba6-47f5-8dc4-71df57faed4e', 1638760000000, 'Monkey, Luffy', 'Foosha Village, Goa Kingdom', 'HMFP', '1234124', 'b5e55ec2-d004-4c98-bb5f-405bee451d3a', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `services_id` varchar(50) NOT NULL,
  `services_name` varchar(200) NOT NULL,
  `services_price` float NOT NULL,
  `created_at` int(13) NOT NULL,
  `updated_at` int(13) NOT NULL,
  `users_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`services_id`, `services_name`, `services_price`, `created_at`, `updated_at`, `users_id`) VALUES
('04905146-d576-4ad6-9454-9979b460b4b8', 'Crankshaft Check Alignment', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('1eaa084e-a067-4171-a401-0bdafd8c2553', 'Con. Rod Arm Re-standard / Fitting Bearing', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('35d154aa-18d0-41b6-8dbc-5600ddc61f86', 'Cylinder Head / Block Cracktest-Hydrotest', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('40c6b3c1-60db-4ffb-a3c0-4b2cf408eba9', 'Cylinder Head Degreasing-Turbowash', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('44350bf0-28b6-4823-b25c-3719b06411c5', 'Cylinder Bore / Reboring O.S', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('4c5b4f4f-c75c-42fb-9fe6-bd3263a832f7', 'Crankshaft Straightening (Owner\'s risk)', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('5acffe55-ddf3-4395-ab0d-dbc5a261ffbe', 'Engine Valve Guide Replace', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('5c668b1e-15b8-46f0-9b79-72ca7f5069fd', 'Crankshaft Oil Seal Seat Build-up / Machining', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('65bfc4f5-c141-4a2c-a35d-fd25314ccf49', 'Engine Valve Seat Refacing', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('71b4beef-6cb7-4f93-8b59-ed7705eb000c', 'Camshaft / Balancer Bushing Replace & Fitting', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('796d1d42-2456-412d-9a92-537138ca4d5e', 'Engine Valve Refacing / Valve Lapping', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('8407e6aa-09a6-4440-93f0-0d26f7ec8cdc', 'Con. Rod Pin Bushing Replace', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('89027e08-8be3-4125-bcae-3c8ca39cc85d', 'Cylinder Head / Block Resurface', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('91cc6af6-b03d-4a55-ab40-c7b75f9ab36e', 'Engine Valve / Tappet Clearance-Re-Setting', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('a0fd179d-541a-483f-8bb4-4b2e7b30d584', 'Main Housing Align Bore / Fitting Main Bearing', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('a5d5a0b2-9e84-4ad3-a545-d4b4c4d8cffe', 'Cylinder Block Degreasing-Turbowash', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('c1ece73a-49e5-4554-993c-e6bb396c1da0', 'Crankshaft Main / Con. Rod Joumal Re-grind', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('cf3b0ca0-57d9-4296-83ee-02c5dd279188', 'Cylinder Bore Sleeving/Honing/Replace Liner', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('d79242f7-2d77-4b66-bcdd-cc037d5cf7b8', 'Engine Valve Ring Insert / Fabrication/Installation', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd'),
('dac560b9-5e0e-49ec-889f-cbc4009d4f91', 'Crankshaft Main / Con. Rod Joumal Polish', 0, 2147483647, 2147483647, '1dfa4584-e597-4822-b065-e01ba29038dd');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sid` varchar(255) NOT NULL,
  `sess` text NOT NULL,
  `expired` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`sid`, `sess`, `expired`) VALUES
('oJPt2sfYUJI5-dsFWfM-NLTCF61AU5D4', '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2021-12-20T04:24:21.881Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":\"1dfa4584-e597-4822-b065-e01ba29038dd\",\"user\":{\"first_name\":\"Owner\",\"last_name\":\"Test\",\"middle_name\":\"\",\"birthday\":975802000000,\"user_level_name\":\"Owner\",\"user_level_acc\":\"owner\",\"email\":\"owner@mail.com\",\"user_name\":\"owner\",\"is_confirmed\":1,\"address\":\"Carmona, Cavite\"}}', '2021-12-28 19:45:58');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(2) NOT NULL,
  `status_acr` varchar(10) NOT NULL,
  `status_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_acr`, `status_name`) VALUES
(1, 'todo', 'To Do'),
(2, 'pending', 'Pending'),
(3, 'in_progres', 'In Progress'),
(4, 'done', 'Done'),
(5, 'cancel', 'Cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` varchar(40) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `birthday` float NOT NULL,
  `user_level_id` int(1) NOT NULL DEFAULT 1,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `is_confirmed` tinyint(1) NOT NULL DEFAULT 1,
  `address` varchar(255) NOT NULL,
  `created_at` float NOT NULL,
  `updated_at` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `first_name`, `last_name`, `middle_name`, `birthday`, `user_level_id`, `email`, `user_name`, `password`, `is_confirmed`, `address`, `created_at`, `updated_at`) VALUES
('1dfa4584-e597-4822-b065-e01ba29038dd', 'Owner', 'Test', '', 975802000000, 3, 'owner@mail.com', 'owner', '%242a%2410%24BiJGeEcmV0xecIDDyUvQQufsUpTPLPkGSI2tBPbml24ogmX2WAd2O', 1, 'Carmona, Cavite', 1638470000000, 1638470000000),
('329e1d64-b4f1-44bc-9537-2d8a9926e338', 'Employee', 'Test', '', 1638660000000, 2, 'employee@gmail.com', 'employee', '%242a%2410%24l%2FsttBmfa3iw7CEqD4iSFegMgUSdpg%2FhI4%2FzUl20k2f1EJ1PlKI%2FS', 1, 'Carmona, Cavite', 1638650000000, 1638650000000),
('bdbd7ee2-70cd-4f86-afed-0f2444d5778e', 'Luffy', 'Monkey', 'D', 925862000000, 1, 'test@mail.com', 'test', '%242a%2410%24GkxKz7zTISR4bhxgWseg..d3hel7woB.6REKqJ6V0Wc1QlfSF0JLG', 1, 'Foosha Village, Goa Kingdom', 1638470000000, 1638470000000),
('fc32db51-7d96-41fc-b22f-ff42e96d2b01', 'Ace', 'Portgas', 'D', 982714000000, 1, 'test1@mail.com', 'test1', '%242a%2410%24NHb8V.lmbkGJk14JOg65a.l6tMYsjBqu4EHZru2cK3GwoG0O1tA0a', 0, 'Carmona, Cavite', 1639960000000, 1639960000000),
('fcec6d0d-2f0f-4257-b82e-841514b43834', 'Garp', 'Monkey', 'D', 772070000000, 1, 'test2@mail.com', 'test2', '%242a%2410%24UJKw3zcGYb.zJFCfbRdSFekEbdQjhAw%2FyTb25OhPfKwch1sUgtOmy', 0, 'Carmona, Cavite', 1639960000000, 1639960000000);

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `user_level_id` int(1) NOT NULL,
  `user_level_name` varchar(50) NOT NULL,
  `user_level_acc` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_level`
--

INSERT INTO `user_level` (`user_level_id`, `user_level_name`, `user_level_acc`) VALUES
(1, 'Costumer', 'csm'),
(2, 'Employee', 'emp'),
(3, 'Owner', 'owner');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`carousel_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `project_file`
--
ALTER TABLE `project_file`
  ADD PRIMARY KEY (`project_file_id`);

--
-- Indexes for table `project_qoutation`
--
ALTER TABLE `project_qoutation`
  ADD PRIMARY KEY (`project_qoutation_id`);

--
-- Indexes for table `project_qoutation_detail`
--
ALTER TABLE `project_qoutation_detail`
  ADD PRIMARY KEY (`project_qoutation_detail_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`services_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- Indexes for table `user_level`
--
ALTER TABLE `user_level`
  ADD PRIMARY KEY (`user_level_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
