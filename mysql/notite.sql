SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


--
-- Database: `notite`
--
CREATE DATABASE `notite` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `notite`;

----------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(5) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Parola` varchar(30) DEFAULT NULL
 
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `Id` int(5) NOT NULL AUTO_INCREMENT,
  `User_id` int(5) NOT NULL foreignKey,
  `Materie` varchar(100) DEFAULT NULL,
  `Comentariu` text DEFAULT NULL,
  `Contributie` text NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

