-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2019 a las 05:26:35
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id8126632_lab4_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoriaID` int(11) NOT NULL,
  `sectorID` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadomesa`
--

CREATE TABLE `estadomesa` (
  `estadoMesaID` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estadomesa`
--

INSERT INTO `estadomesa` (`estadoMesaID`, `nombre`) VALUES
(1, 'libre'),
(2, 'con cliente esperando pedido'),
(3, 'con cliente comiendo'),
(4, 'con cliente pagando'),
(5, 'cerrada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadopedido`
--

CREATE TABLE `estadopedido` (
  `estadoPedidoID` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estadopedido`
--

INSERT INTO `estadopedido` (`estadoPedidoID`, `nombre`) VALUES
(1, 'pendiente'),
(2, 'en preparacion'),
(3, 'listo para servir'),
(4, 'entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itemmenu`
--

CREATE TABLE `itemmenu` (
  `itemMenuID` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
  `sectorID` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `itemmenu`
--

INSERT INTO `itemmenu` (`itemMenuID`, `nombre`, `descripcion`, `sectorID`, `precio`) VALUES
(1, 'Vino tinto', NULL, 1, '200'),
(2, 'Cerveza', NULL, 2, '150'),
(3, 'Empanada', NULL, 3, '50'),
(4, 'Flan casero', NULL, 4, '120');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `MesaID` int(11) NOT NULL,
  `codigo` varchar(5) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `estadoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `mesa`
--

INSERT INTO `mesa` (`MesaID`, `codigo`, `estadoID`) VALUES
(1, '00001', 1),
(2, '00002', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `pedidoID` int(11) NOT NULL,
  `mozoID` int(11) DEFAULT NULL,
  `mesaID` int(11) DEFAULT NULL,
  `codigo` varchar(5) COLLATE latin1_spanish_ci DEFAULT NULL,
  `nombreCliente` varchar(50) COLLATE latin1_spanish_ci DEFAULT NULL,
  `foto` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `estadoPedidoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidodetalle`
--

CREATE TABLE `pedidodetalle` (
  `pedidoDetalleID` int(11) NOT NULL,
  `itemMenuID` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `tiempoEstimado` int(11) DEFAULT NULL,
  `pedidoID` int(11) NOT NULL,
  `estadoPedidoID` int(11) NOT NULL,
  `usuarioID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `perfilID` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`perfilID`, `nombre`) VALUES
(1, 'admin'),
(2, 'socio'),
(3, 'mozo'),
(4, 'bartender'),
(5, 'cocinero'),
(6, 'cervecero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilsector`
--

CREATE TABLE `perfilsector` (
  `perfilID` int(11) NOT NULL,
  `sectorID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `perfilsector`
--

INSERT INTO `perfilsector` (`perfilID`, `sectorID`) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(4, 1),
(5, 3),
(5, 4),
(6, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE `sector` (
  `sectorID` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`sectorID`, `nombre`) VALUES
(1, 'Barra de tragos y vinos'),
(2, 'Barra de choperas de cerveza artesanal'),
(3, 'Cocina'),
(4, 'Candy bar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`) VALUES
(1),
(2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuarioID` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `apellido` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `codigo` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `perfilID` int(11) NOT NULL,
  `borrado` tinyint(1) NOT NULL,
  `suspendido` tinyint(1) NOT NULL,
  `clave` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuarioID`, `nombre`, `apellido`, `codigo`, `email`, `fecha`, `perfilID`, `borrado`, `suspendido`, `clave`) VALUES
(1, 'administrador', 'admin', 'admin', 'admin@comandita.com', '1990-08-07', 1, 0, 0, 'test'),
(2, 'socio', 'socio', 'socio', 'socio@comandita.com', '1990-08-07', 2, 0, 0, 'test'),
(3, 'mozo', 'mozo', 'mozo', 'mozo@comandita.com', '1990-08-07', 3, 0, 0, 'test'),
(4, 'bartender', 'bartender', 'bartender', 'bartender@comandita.com', '1990-08-07', 4, 0, 0, 'test'),
(5, 'cocinero', 'cocinero', 'cocinero', 'cocinero@comandita.com', '1990-08-07', 5, 0, 0, 'test'),
(6, 'cervecero', 'cervecero', 'cervecero', 'cervecero@comandita.com', '1990-08-07', 6, 0, 0, 'test');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoriaID`);

--
-- Indices de la tabla `estadomesa`
--
ALTER TABLE `estadomesa`
  ADD PRIMARY KEY (`estadoMesaID`);

--
-- Indices de la tabla `estadopedido`
--
ALTER TABLE `estadopedido`
  ADD PRIMARY KEY (`estadoPedidoID`);

--
-- Indices de la tabla `itemmenu`
--
ALTER TABLE `itemmenu`
  ADD PRIMARY KEY (`itemMenuID`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`MesaID`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`pedidoID`);

--
-- Indices de la tabla `pedidodetalle`
--
ALTER TABLE `pedidodetalle`
  ADD PRIMARY KEY (`pedidoDetalleID`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`perfilID`);

--
-- Indices de la tabla `perfilsector`
--
ALTER TABLE `perfilsector`
  ADD PRIMARY KEY (`perfilID`,`sectorID`);

--
-- Indices de la tabla `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`sectorID`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuarioID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estadomesa`
--
ALTER TABLE `estadomesa`
  MODIFY `estadoMesaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estadopedido`
--
ALTER TABLE `estadopedido`
  MODIFY `estadoPedidoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `itemmenu`
--
ALTER TABLE `itemmenu`
  MODIFY `itemMenuID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `mesa`
--
ALTER TABLE `mesa`
  MODIFY `MesaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `pedidoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidodetalle`
--
ALTER TABLE `pedidodetalle`
  MODIFY `pedidoDetalleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `perfilID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
  MODIFY `sectorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
