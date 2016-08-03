-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jul 28, 2016 at 01:06 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `VersammlungsOrganisation`
--

-- --------------------------------------------------------

--
-- Table structure for table `boxfields`
--

CREATE TABLE `boxfields` (
`id` int(11) NOT NULL,
  `boxfieldname` text NOT NULL,
  `themeboxid` int(11) NOT NULL,
  `boxfieldindex` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boxfields`
--

INSERT INTO `boxfields` (`id`, `boxfieldname`, `themeboxid`, `boxfieldindex`) VALUES
(1, 'Ύμνος και Προσευχή', 1, 2),
(2, 'Εισαγωγικά Σχόλια', 1, 3),
(3, 'Καθαριότητα', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `boxthemes`
--

CREATE TABLE `boxthemes` (
`id` int(11) NOT NULL,
  `firstday` date NOT NULL,
  `lastday` date NOT NULL,
  `boxfieldid` int(11) NOT NULL,
  `themeValue` text NOT NULL,
  `themeboxid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boxthemes`
--

INSERT INTO `boxthemes` (`id`, `firstday`, `lastday`, `boxfieldid`, `themeValue`, `themeboxid`) VALUES
(1, '2016-07-11', '2016-07-17', 1, 'Όμιλος Α', 1),
(2, '2016-07-11', '2016-07-17', 3, 'Γενετίδης Π.', 1),
(4, '2016-07-11', '2016-07-17', 2, 'Κολτσακίδης T.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `congregationGroups`
--

CREATE TABLE `congregationGroups` (
`id` int(10) NOT NULL,
  `groupname` text NOT NULL,
  `responibleUserId` int(10) NOT NULL,
  `secondresponible` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `congregationGroups`
--

INSERT INTO `congregationGroups` (`id`, `groupname`, `responibleUserId`, `secondresponible`) VALUES
(1, 'Όμιλος Β', 25, 9),
(2, 'Όμιλος Α', 25, 9);

-- --------------------------------------------------------

--
-- Table structure for table `congregations`
--

CREATE TABLE `congregations` (
`id` int(10) NOT NULL,
  `languageCode` text NOT NULL,
  `clientId` text NOT NULL,
  `clientName` text NOT NULL,
  `street` text,
  `streetnumber` text,
  `postalCode` text,
  `country` text
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `congregations`
--

INSERT INTO `congregations` (`id`, `languageCode`, `clientId`, `clientName`, `street`, `streetnumber`, `postalCode`, `country`) VALUES
(1, 'GR', '123', 'Greichisch', 'Leitershofer Str.', '112', '86157', 'Augsburg');

-- --------------------------------------------------------

--
-- Table structure for table `themeboxes`
--

CREATE TABLE `themeboxes` (
`id` int(11) NOT NULL,
  `boxname` text NOT NULL,
  `boxpage` text NOT NULL,
  `clientId` varchar(255) NOT NULL,
  `positionIndex` int(11) NOT NULL,
  `headercolor` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `themeboxes`
--

INSERT INTO `themeboxes` (`id`, `boxname`, `boxpage`, `clientId`, `positionIndex`, `headercolor`) VALUES
(1, 'ΈΝΑΡΞΗ', 'livingAndService', '123', 1, '#D2D2D2');

-- --------------------------------------------------------

--
-- Table structure for table `userRoles`
--

CREATE TABLE `userRoles` (
`roleId` int(10) unsigned NOT NULL,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userRoles`
--

INSERT INTO `userRoles` (`roleId`, `roleName`) VALUES
(1, 'clientAdmin'),
(2, 'user'),
(3, 'eldest'),
(4, 'ministerialServants');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`userId` int(10) unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `clientId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `roleId` bigint(20) NOT NULL,
  `token` text COLLATE utf8_unicode_ci NOT NULL,
  `congregationsGroupId` int(11) NOT NULL,
  `shortname` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `firstname`, `lastname`, `created_at`, `updated_at`, `clientId`, `roleId`, `token`, `congregationsGroupId`, `shortname`) VALUES
(8, 'p.genetidis@devnet.de', '356a192b7913b04c54574d18c28d46e6395428ab', 'Πέτρος', 'Γενετίδης', '2016-06-24 10:38:11', NULL, '123', 1, 'p.genetidis@devnet.de | 5791072c19fac5791072c19fb65791072c19fbd', 1, 'Γενετίδης Π.'),
(9, 'naso.tournas@hotmail.de', '7288edd0fc3ffcbe93a0cf06e3568e28521687bc', 'Νάσος', 'Τούρνας', '2016-06-27 13:51:12', NULL, '123', 4, 'LOGGED OUT', 1, 'Τούρνας Ν.'),
(25, 'a.mpatsios@devnet.de', '356a192b7913b04c54574d18c28d46e6395428ab', 'Αντρέας', 'Μπατσιος', '2016-06-30 14:24:25', NULL, '123', 3, 'a.mpatsios@devnet.de | 57752c8f1415c57752c8f1416657752c8f1416e', 1, 'Μπατσιος Α.'),
(26, 't.koltsakidis@gmail.com', 'ef386cf65ed24179c5cf4a465f877bd53b2bd0e3', 'Tζένος', 'Κολτσακίδης', '2016-07-07 17:41:37', NULL, '123', 3, 'LOGGED OUT', 1, 'Κολτσακίδης T.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boxfields`
--
ALTER TABLE `boxfields`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `boxthemes`
--
ALTER TABLE `boxthemes`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `congregationGroups`
--
ALTER TABLE `congregationGroups`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `congregations`
--
ALTER TABLE `congregations`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themeboxes`
--
ALTER TABLE `themeboxes`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userRoles`
--
ALTER TABLE `userRoles`
 ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`userId`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boxfields`
--
ALTER TABLE `boxfields`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `boxthemes`
--
ALTER TABLE `boxthemes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `congregationGroups`
--
ALTER TABLE `congregationGroups`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `congregations`
--
ALTER TABLE `congregations`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `themeboxes`
--
ALTER TABLE `themeboxes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `userRoles`
--
ALTER TABLE `userRoles`
MODIFY `roleId` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;