-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: c4db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `entity_accounts`
--

DROP TABLE IF EXISTS `entity_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity_accounts` (
  `UserID` int(10) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Wins` int(10) DEFAULT 0,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_accounts`
--

LOCK TABLES `entity_accounts` WRITE;
/*!40000 ALTER TABLE `entity_accounts` DISABLE KEYS */;
INSERT INTO `entity_accounts` VALUES (27,'admin','User','Admin',0),(28,'noahscott','Scott','Noah',1),(29,'ghost','test','was',1);
/*!40000 ALTER TABLE `entity_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_admin`
--

DROP TABLE IF EXISTS `entity_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity_admin` (
  `AdminID` int(10) NOT NULL AUTO_INCREMENT,
  `UserID` int(10) DEFAULT NULL,
  `Role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AdminID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `entity_admin_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `entity_accounts` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_admin`
--

LOCK TABLES `entity_admin` WRITE;
/*!40000 ALTER TABLE `entity_admin` DISABLE KEYS */;
INSERT INTO `entity_admin` VALUES (4,27,'ADMIN');
/*!40000 ALTER TABLE `entity_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `LoginID` int(10) NOT NULL AUTO_INCREMENT,
  `UserID` int(10) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`LoginID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `entity_accounts` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (3,NULL,'$2y$10$Cf5Eha8CuHAxaAxlZlD3k.vWK2SD8NzCLF4dQjd8o14jVUkc6YOnG'),(7,0,'$2y$10$9U1bf34QKS59mNwGT8QlleP/Bo0An1RE9Qtl0tUUUWhx.tOF6Os9a'),(10,27,'$2y$10$NUSIACXMUYsCPiq4CKOrseip2FyEx6ZaSjVgLpZhcFQIAwIuAfw8G'),(11,28,'$2y$10$lxnE6sim3mtT.VZmW32mZeju8WYWZRxF0oX/48e0qHCjNhw6EKtCC'),(12,29,'$2y$10$iMZPNAZLrcZe6Ko7AipJgubPwGndioj7/xVpSLoB821M03fEtxZ5C');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01  6:48:41
