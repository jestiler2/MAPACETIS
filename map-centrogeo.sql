-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2022 a las 23:45:18
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `map-centrogeo`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete history` ()   DELETE FROM `history-map` WHERE date < (CURRENT_TIMESTAMP - INTERVAL 1 DAY)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history-map`
--

CREATE TABLE `history-map` (
  `id` int(11) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lat1` double NOT NULL,
  `log1` double NOT NULL,
  `lat2` double DEFAULT NULL,
  `log2` double DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `color` varchar(10) NOT NULL,
  `colorGUI` varchar(10) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `history-map`
--

INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES
(41, 'l4tcrb4ecpq', '2022-09-04 21:30:13', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'place_of_worship', 'Amenity', 1, 'c8300f', '#c8300f', NULL),
(42, 'l4tcrb4ecpq', '2022-09-04 21:30:11', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'tertiary', 'Way', 1, '#d169e5', '#d169e5', NULL),
(43, 'l4tcrb4ecpq', '2022-09-04 21:30:22', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'townhall', 'Amenity', 0, '8017db', '#8017db', NULL),
(44, 'o7228bu2o1l', '2022-09-04 21:32:32', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'townhall', 'Amenity', 1, '8017db', '#8017db', NULL),
(45, 'o7228bu2o1l', '2022-09-04 21:32:33', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'tertiary', 'Way', 1, '#d169e5', '#d169e5', NULL),
(46, 'o7228bu2o1l', '2022-09-04 21:32:28', 20.544346216059193, -89.33909445900785, 20.5263597839408, -89.31988754099216, 'place_of_worship', 'Amenity', 1, 'c8300f', '#c8300f', NULL),
(47, 'n86k4yqh6xg', '2022-09-04 21:39:11', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'bank', 'Amenity', 1, 'dc93c6', '#dc93c6', NULL),
(48, 'n86k4yqh6xg', '2022-09-04 21:39:10', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'crossing', 'Highway', 1, 'd42ec5', '#d42ec5', NULL),
(49, 'n86k4yqh6xg', '2022-09-04 21:39:15', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'primary', 'Way', 1, '#21bd6e', '#21bd6e', NULL),
(50, 'n86k4yqh6xg', '2022-09-04 21:39:07', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'turning_circle', 'Highway', 1, '2f01ef', '#2f01ef', NULL),
(51, 'n86k4yqh6xg', '2022-09-04 21:39:11', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'police', 'Amenity', 1, 'd7bbb4', '#d7bbb4', NULL),
(52, 'n86k4yqh6xg', '2022-09-04 21:37:27', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'path', 'Way', 1, '#055bef', '#055bef', NULL),
(53, 'en8p8m6b3x6', '2022-09-04 21:40:39', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'primary', 'Way', 0, '#21bd6e', '#21bd6e', NULL),
(54, 'en8p8m6b3x6', '2022-09-04 21:40:27', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'police', 'Amenity', 1, 'd7bbb4', '#d7bbb4', NULL),
(55, 'en8p8m6b3x6', '2022-09-04 21:40:26', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'bank', 'Amenity', 1, 'dc93c6', '#dc93c6', NULL),
(56, 'en8p8m6b3x6', '2022-09-04 21:39:31', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'turning_circle', 'Highway', 1, '2f01ef', '#2f01ef', NULL),
(57, 'en8p8m6b3x6', '2022-09-04 21:39:31', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'crossing', 'Highway', 1, 'd42ec5', '#d42ec5', NULL),
(58, 'en8p8m6b3x6', '2022-09-04 21:39:36', 20.990744392045507, -89.64534759521486, 20.953255424097417, -89.59745407104494, 'path', 'Way', 1, '#055bef', '#055bef', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `history-map`
--
ALTER TABLE `history-map`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `history-map`
--
ALTER TABLE `history-map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `Delete history` ON SCHEDULE EVERY 1 DAY STARTS '2022-09-04 01:55:29' ON COMPLETION NOT PRESERVE ENABLE DO CALL `Delete history`$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
