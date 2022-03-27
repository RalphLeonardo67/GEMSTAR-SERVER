-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2022 at 10:42 PM
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
  `date_created` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `logs_id` varchar(50) NOT NULL,
  `logs_type` varchar(200) NOT NULL,
  `created_at` bigint(20) UNSIGNED NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` varchar(40) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `url_link` varchar(1000) NOT NULL,
  `date` bigint(20) NOT NULL,
  `notified_by` varchar(40) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `project_status_id` varchar(40) NOT NULL,
  `project_id` varchar(40) NOT NULL,
  `status_id` int(1) NOT NULL,
  `employee_id` varchar(40) NOT NULL,
  `date_created` bigint(20) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('1dfa4584-e597-4822-b065-e01ba29038dd', 'Owner', 'Test', '', 975802000000, 3, 'owner@mail.com', 'owner', '%242a%2410%24BiJGeEcmV0xecIDDyUvQQufsUpTPLPkGSI2tBPbml24ogmX2WAd2O', 1, 'Carmona, Cavite1', 1638470000000, 1638470000000),
('329e1d64-b4f1-44bc-9537-2d8a9926e338', 'Employee', 'Test', '', 1638660000000, 2, 'employee@gmail.com', 'employee', '%242a%2410%24l%2FsttBmfa3iw7CEqD4iSFegMgUSdpg%2FhI4%2FzUl20k2f1EJ1PlKI%2FS', 1, 'Carmona, Cavite', 1638650000000, 1638650000000);

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
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`project_status_id`);

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
