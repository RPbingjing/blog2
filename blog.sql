-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.21 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 blog 的数据库结构
CREATE DATABASE IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `blog`;

-- 导出  表 blog.article 结构
CREATE TABLE IF NOT EXISTS `article` (
  `articleId` int(11) NOT NULL AUTO_INCREMENT,
  `classType` varchar(32) NOT NULL,
  `title` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `contentToMark` text NOT NULL,
  `createTime` varchar(32) NOT NULL,
  `brief` varchar(128) NOT NULL,
  PRIMARY KEY (`articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=1555040064 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 blog.classify 结构
CREATE TABLE IF NOT EXISTS `classify` (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `classType` varchar(32) NOT NULL,
  `createTime` varchar(32) NOT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 blog.projs 结构
CREATE TABLE IF NOT EXISTS `projs` (
  `projId` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` varchar(32) NOT NULL,
  `title` varchar(32) NOT NULL,
  `descs` text NOT NULL,
  `showSrc` varchar(128) NOT NULL,
  `codeSrc` varchar(128) NOT NULL,
  `blogSrc` varchar(128) NOT NULL,
  PRIMARY KEY (`projId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 blog.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
