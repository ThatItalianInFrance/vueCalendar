// database.js

const mysql = require('mysql2');  // Import mysql2 library

// Create a single connection instance
const connection = mysql.createConnection({
  host: 'localhost',          // Your database host
  user: 'root',      // Your database username
  password: '',  // Your database password
  database: 'testplanning'    // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log('Connected to the MySQL database');
});

// Export a function to execute queries
module.exports = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err); // Handle errors
        } else {
          resolve(results); // Return results
        }
      });
    });
  }
};

// -- --------------------------------------------------------
// -- Host:                         127.0.0.1
// -- Server version:               8.0.30 - MySQL Community Server - GPL
// -- Server OS:                    Win64
// -- HeidiSQL Version:             12.1.0.6537
// -- --------------------------------------------------------

// /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
// /*!40101 SET NAMES utf8 */;
// /*!50503 SET NAMES utf8mb4 */;
// /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
// /*!40103 SET TIME_ZONE='+00:00' */;
// /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
// /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
// /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


// -- Dumping database structure for testplanning
// CREATE DATABASE IF NOT EXISTS `testplanning` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
// USE `testplanning`;

// -- Dumping structure for table testplanning.employees
// CREATE TABLE IF NOT EXISTS `employees` (
//   `employee_id` int NOT NULL AUTO_INCREMENT,
//   `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
//   `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
//   `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   `hire_date` date DEFAULT NULL,
//   `department` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   PRIMARY KEY (`employee_id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.employees: ~4 rows (approximately)
// INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `email`, `hire_date`, `department`, `logo`) VALUES
// 	(1, 'Jean', 'Dupont', 'jean.dupont@example.com', '2024-01-15', 'Groupe A', 'https://placeholder.com/30?text=TB'),
// 	(2, 'Marie', 'Curie', 'marie.curie@example.com', '2023-07-20', 'Groupe B', 'https://placeholder.com/30?text=TB'),
// 	(3, 'Émile', 'Zola', 'emile.zola@example.com', '2022-09-12', 'Groupe A', 'https://placeholder.com/30?text=TB'),
// 	(4, 'Claire', 'Fontaine', 'claire.fontaine@example.com', '2024-03-10', 'Groupe C', 'https://placeholder.com/30?text=TB');

// -- Dumping structure for table testplanning.events
// CREATE TABLE IF NOT EXISTS `events` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `resource_id` int NOT NULL,
//   `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
//   `start` timestamp NOT NULL,
//   `end` timestamp NOT NULL,
//   `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
//   `background_color` varchar(7) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.events: ~17 rows (approximately)
// INSERT INTO `events` (`id`, `resource_id`, `title`, `start`, `end`, `status`, `background_color`) VALUES
// 	(1, 1, 'Réunion Mensuelle', '2024-11-20 09:00:00', '2024-11-20 11:00:00', NULL, '#2196F3'),
// 	(2, 1, 'Code review', '2024-11-21 09:00:00', '2024-11-20 11:00:00', NULL, '#2196F3'),
// 	(3, 2, 'Travail du Matin', '2024-11-21 07:30:00', '2024-11-21 11:00:00', NULL, '#FFC107'),
// 	(5, 4, 'Planification Mensuelle', '2024-11-23 13:00:00', '2024-11-23 15:00:00', NULL, '#4CAF50'),
// 	(6, 1, 'whatever', '2024-11-19 09:00:00', '2024-11-19 11:00:00', NULL, '#2196F3'),
// 	(7, 2, 'Travail du Matin', '2024-11-21 07:30:00', '2024-11-21 11:00:00', NULL, '#FFC107'),
// 	(9, 4, 'Planification Mensuelle', '2024-11-23 13:00:00', '2024-11-23 15:00:00', NULL, '#4CAF50'),
// 	(11, 2, 'Travail du Matin', '2024-11-21 07:30:00', '2024-11-21 11:00:00', NULL, '#FFC107'),
// 	(13, 4, 'Planification Mensuelle', '2024-11-23 13:00:00', '2024-11-23 15:00:00', NULL, '#4CAF50'),
// 	(16, 3, 'Travail d’Après-midi', '2024-11-22 12:00:00', '2024-11-22 16:00:00', NULL, '#FF5733'),
// 	(17, 4, 'Planification Mensuelle', '2024-11-23 13:00:00', '2024-11-23 15:00:00', NULL, '#4CAF50'),
// 	(19, 2, 'Travail du Matin', '2024-11-21 07:30:00', '2024-11-21 11:00:00', NULL, '#FFC107'),
// 	(20, 3, 'Travail d’Après-midi', '2024-11-22 12:00:00', '2024-11-22 16:00:00', NULL, '#FF5733'),
// 	(21, 4, 'Planification Mensuelle', '2024-11-23 13:00:00', '2024-11-23 15:00:00', NULL, '#4CAF50'),
// 	(22, 1, 'test', '2024-11-29 11:00:00', '2024-11-29 11:40:00', NULL, NULL),
// 	(23, 1, 'test', '2024-11-29 11:00:00', '2024-11-29 11:40:00', NULL, NULL),
// 	(24, 2, 'stoca', '2024-11-29 10:11:00', '2024-11-29 11:11:00', NULL, NULL);

// -- Dumping structure for table testplanning.exceptions
// CREATE TABLE IF NOT EXISTS `exceptions` (
//   `exception_id` int NOT NULL AUTO_INCREMENT,
//   `employee_id` int NOT NULL,
//   `exception_date` date NOT NULL,
//   `exception_type` enum('holiday','vacation','skipped_day','hourly_permission') COLLATE utf8mb4_general_ci NOT NULL,
//   `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   PRIMARY KEY (`exception_id`),
//   KEY `employee_id` (`employee_id`),
//   CONSTRAINT `exceptions_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.exceptions: ~0 rows (approximately)

// -- Dumping structure for table testplanning.holidays
// CREATE TABLE IF NOT EXISTS `holidays` (
//   `holiday_id` int NOT NULL AUTO_INCREMENT,
//   `holiday_date` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
//   `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
//   `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   `country` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   `is_public_holiday` tinyint(1) DEFAULT '1',
//   PRIMARY KEY (`holiday_id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.holidays: ~8 rows (approximately)
// INSERT INTO `holidays` (`holiday_id`, `holiday_date`, `name`, `description`, `country`, `is_public_holiday`) VALUES
// 	(1, '2024-01-01', 'New Year\'s Day', 'First day of the year', 'France', 1),
// 	(2, '2024-04-01', 'Easter Monday', 'Public holiday after Easter Sunday', 'France', 1),
// 	(3, '2024-05-01', 'Labor Day', 'International Workers\' Day', 'France', 1),
// 	(4, '2024-05-08', 'Victory in Europe Day', 'End of World War II in Europe', 'France', 1),
// 	(5, '2024-07-14', 'Bastille Day', 'French National Day', 'France', 1),
// 	(6, '2024-08-15', 'Assumption of Mary', 'Christian holiday', 'France', 1),
// 	(7, '2024-11-01', 'All Saints\' Day', 'Honoring all the saints', 'France', 1),
// 	(8, '2024-12-25', 'Christmas Day', 'Celebration of the birth of Jesus Christ', 'France', 1);

// -- Dumping structure for table testplanning.plannings
// CREATE TABLE IF NOT EXISTS `plannings` (
//   `planning_id` int NOT NULL AUTO_INCREMENT,
//   `employee_id` int NOT NULL,
//   `event_id` int DEFAULT NULL,
//   `date` date NOT NULL,
//   `start_time` time NOT NULL,
//   `end_time` time NOT NULL,
//   `status` enum('scheduled','modified','cancelled') COLLATE utf8mb4_general_ci DEFAULT 'scheduled',
//   `days_of_the_week` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
//   PRIMARY KEY (`planning_id`),
//   KEY `employee_id` (`employee_id`),
//   KEY `event_id` (`event_id`),
//   CONSTRAINT `plannings_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
//   CONSTRAINT `plannings_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.plannings: ~2 rows (approximately)
// INSERT INTO `plannings` (`planning_id`, `employee_id`, `event_id`, `date`, `start_time`, `end_time`, `status`, `days_of_the_week`) VALUES
// 	(1, 1, 2, '2024-01-15', '07:00:00', '10:00:00', 'scheduled', '[1,2,3,4,5]'),
// 	(2, 1, 3, '2024-11-27', '06:56:12', '09:56:18', 'scheduled', '[2,4]');

// -- Dumping structure for table testplanning.recurrences
// CREATE TABLE IF NOT EXISTS `recurrences` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `event_id` int NOT NULL,
//   `frequency` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
//   `interval` int NOT NULL,
//   `days_of_month` json NOT NULL,
//   `end_date` date NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `event_id` (`event_id`),
//   CONSTRAINT `recurrences_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
// ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// -- Dumping data for table testplanning.recurrences: ~2 rows (approximately)
// INSERT INTO `recurrences` (`id`, `event_id`, `frequency`, `interval`, `days_of_month`, `end_date`) VALUES
// 	(2, 2, 'weekly', 3, '[21]', '2025-01-01'),
// 	(3, 3, 'monthly', 1, '[22]', '2025-01-01');

// /*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
// /*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
// /*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
// /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
// /*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
