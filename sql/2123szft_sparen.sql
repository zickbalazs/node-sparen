-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2022 at 02:42 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2123szft_sparen`
--
create database if not exists 2123szft_sparen default character set utf8 collate utf8_hungarian_ci;
-- --------------------------------------------------------

--
-- Table structure for table `spendings`
--

CREATE TABLE `spendings` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `moneyAmount` float NOT NULL,
  `spendDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `spendings`
--

INSERT INTO `spendings` (`id`, `uid`, `type`, `moneyAmount`, `spendDate`) VALUES
(1, 1, 5, 10000, '2022-10-31'),
(2, 1, 2, 6700, '2022-10-26'),
(3, 1, 11, 140000, '2022-10-07'),
(4, 1, 8, 2000, '2022-10-19'),
(5, 1, 8, 2330, '2022-10-20'),
(6, 1, 11, 149000, '2022-11-01'),
(7, 1, 4, 16800, '2022-11-01'),
(8, 1, 1, 12000, '2022-11-01'),
(11, 1, 4, 4000, '2022-11-01'),
(12, 1, 3, 1600, '2022-11-01');

-- --------------------------------------------------------

--
-- Table structure for table `spendingtype`
--

CREATE TABLE `spendingtype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `icon` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `colorCode` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `isProfit` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `spendingtype`
--

INSERT INTO `spendingtype` (`id`, `name`, `icon`, `colorCode`, `isProfit`) VALUES
(1, 'Groceries/Food', 'bi-basket3', 'E00000', 0),
(2, 'Medical', 'bi-lungs', 'D90000', 0),
(3, 'Pills', 'bi-prescription2', 'D20000', 0),
(4, 'Fuel', 'bi-fuel-pump', 'CF0000', 0),
(5, 'Bills', 'bi-receipt', 'CB0000', 0),
(6, 'Cosmetical', 'bi-basket3', 'C40000', 0),
(7, 'Private Doctor', 'bi-heart-pulse', 'B60000', 0),
(8, 'Video Game', 'bi-dpad', 'AF0000', 0),
(9, 'Electronical appliance', 'bi-tv', 'A80000', 0),
(10, 'Car-related', 'bi-car-front', '700000', 0),
(11, 'Payments', 'bi-wallet2', '1F9B00', 1),
(12, 'Extra earnings', 'bi-piggy-bank', '0EA300', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uname` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `passwd` text COLLATE utf8_hungarian_ci NOT NULL,
  `regDate` date NOT NULL DEFAULT current_timestamp(),
  `isBanned` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `email`, `passwd`, `regDate`, `isBanned`) VALUES
(1, 'admin', 'admin@admin.com', 'd033e22ae348aeb5660fc2140aec35850c4da997', '2022-10-27', 0),
(2, 'zick', 'zick@zick.com', 'd033e22ae348aeb5660fc2140aec35850c4da997', '2022-10-27', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `spendings`
--
ALTER TABLE `spendings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `spendingtype`
--
ALTER TABLE `spendingtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `spendings`
--
ALTER TABLE `spendings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `spendingtype`
--
ALTER TABLE `spendingtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `spendings`
--
ALTER TABLE `spendings`
  ADD CONSTRAINT `spendings_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `spendings_ibfk_2` FOREIGN KEY (`type`) REFERENCES `spendingtype` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
