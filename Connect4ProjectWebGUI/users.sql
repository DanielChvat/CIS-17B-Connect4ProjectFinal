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
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(256) DEFAULT NULL,
  `Wins` int(10) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_accounts`
--

LOCK TABLES `entity_accounts` WRITE;
/*!40000 ALTER TABLE `entity_accounts` DISABLE KEYS */;
INSERT INTO `entity_accounts` VALUES (1,'admin','$2y$10$SJsnSfj.94lCICuhr2HO4uqw4DsXR1kcQmT73GaY75pTQQDU8GY8i',0,NULL),(2,'Daniel','$2y$10$68kFQtfslAZrPRPpzA9i7e.KUfo/gRLlQx8Puq25idCAbOUtHIzsO',0,1),(3,'Noah','$2y$10$Td.Y9GaIYAFD5wBWjTbojO5EsuEBE6NhOEUV/ow46VLo/tHESnGRS',0,NULL),(4,'Noel','$2y$10$geyIJxdIyf/s/XpsUZmVk.abIOYqApKF83fqpzO2x6xdFF.VbCuF2',0,NULL),(5,'Mark','$2y$10$pvGeWIlF6jY8YlvUukmVJebdWHAeRzSRBf/nNRYvS9l7A77mFpjuS',0,NULL),(6,'Michael','$2y$10$iRgVU3tYfsOPC2HOtAVWdOw4Ojqt4/zejyPFH01m.gKvkOxL6gKSG',0,NULL),(7,'Lisa','$2y$10$gexwWVSeH.xd.JJuxXGRvOBe6xAd.oeG6zAWFI9RZr18sTxLJ6A4.',0,NULL),(8,'PianoMan','$2y$10$ijTz9UTBC31bmM0PPOQ91uAPhDh9GQ6Nh/P/UcjVVvTB5r8HMc0Iq',0,1),(10,'NewUser','$2y$10$udcHlQ2iAUcclc6O1FW.5.7tRAEcBc8esP6sJ2rHqCl0bMnODUhFe',0,1),(11,'Test','$2y$10$8j36nH9qpDCT9YfWQIYe1OtQkUovtZd.7eKWaDq0VQU244232p4zS',8,NULL),(13,'Character','$2y$10$RvmvASIC4ZOG9ZwvDvteVukhzaWALGrOucLjDJtqEoY7HZ94Z8y4O',1,NULL);
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

-- Dump completed on 2024-05-30 18:55:09
