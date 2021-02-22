-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 22, 2021 at 02:31 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `PhoneBook`
--

CREATE TABLE `PhoneBook` (
  `First` varchar(30) NOT NULL,
    `Last` varchar(30) NOT NULL,
      `Phone` varchar(20) NOT NULL,
        `Type` enum('Business','Friend','Family','Other') NOT NULL,
	  `ID` int NOT NULL
	  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PhoneBook`
--

INSERT INTO `PhoneBook` (`First`, `Last`, `Phone`, `Type`, `ID`) VALUES
('Kelly', 'de Castro', '34434342', 'Family', 1),
('Bill', 'Yeakus', '234324234', 'Friend', 2),
('Ken', 'Smithertonings', '123123213', 'Other', 4),
('Crosely', 'Blimpchips', '213231233', 'Friend', 6),
('Niles', 'Bloomgarden', '32424332324', 'Other', 7),
('Wilmer', 'Black', '21312312231', 'Other', 10),
('jim', 'skon', '234323443', 'Family', 14),
('snake', 'Brisbee', '334333', 'Business', 15),
('Judy', 'Phillips', '345.654.5654', 'Friend', 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PhoneBook`
--
ALTER TABLE `PhoneBook`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PhoneBook`
--
ALTER TABLE `PhoneBook`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
  COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
