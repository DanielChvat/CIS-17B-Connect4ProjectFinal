-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: c4db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_accounts` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(256) DEFAULT NULL,
  `Wins` int(10) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_accounts`
--

LOCK TABLES `entity_accounts` WRITE;
/*!40000 ALTER TABLE `entity_accounts` DISABLE KEYS */;
INSERT INTO `entity_accounts` VALUES (1,'admin','$2y$10$SJsnSfj.94lCICuhr2HO4uqw4DsXR1kcQmT73GaY75pTQQDU8GY8i',0,NULL),(2,'Daniel','$2y$10$68kFQtfslAZrPRPpzA9i7e.KUfo/gRLlQx8Puq25idCAbOUtHIzsO',NULL,NULL),(3,'Noah','$2y$10$Td.Y9GaIYAFD5wBWjTbojO5EsuEBE6NhOEUV/ow46VLo/tHESnGRS',NULL,NULL),(4,'Noel','$2y$10$geyIJxdIyf/s/XpsUZmVk.abIOYqApKF83fqpzO2x6xdFF.VbCuF2',NULL,NULL),(5,'Mark','$2y$10$pvGeWIlF6jY8YlvUukmVJebdWHAeRzSRBf/nNRYvS9l7A77mFpjuS',NULL,NULL),(6,'Michael','$2y$10$iRgVU3tYfsOPC2HOtAVWdOw4Ojqt4/zejyPFH01m.gKvkOxL6gKSG',NULL,NULL),(7,'Lisa','$2y$10$gexwWVSeH.xd.JJuxXGRvOBe6xAd.oeG6zAWFI9RZr18sTxLJ6A4.',NULL,NULL);
/*!40000 ALTER TABLE `entity_accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-26 16:44:07
