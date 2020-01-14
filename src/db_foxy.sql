-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-01-2020 a las 19:36:47
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_foxy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `authors` varchar(255) NOT NULL,
  `categories` varchar(255) NOT NULL,
  `rate` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`book_id`, `title`, `authors`, `categories`, `rate`, `img`, `isbn`, `user_id`) VALUES
(1, '50 shades of success', 'Jadson Edington', 'Array', 3, 'http://books.google.com/books/content?id=O8JWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 1),
(2, 'Percy Jackson: The Demigod Files', 'Rick Riordan', 'Array', 4, 'http://books.google.com/books/content?id=c5387N8EUEYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 1),
(3, 'Percy Jackson: The Demigod Files', 'Rick Riordan', 'Array', 5, 'http://books.google.com/books/content?id=c5387N8EUEYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 1),
(4, 'Filología Neotestamentaria 50', 'Varios Autores, Lautaro Roig Lanzillotta', 'Array', 4, 'http://books.google.com/books/content?id=rgWIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 1),
(5, 'Filología Neotestamentaria 50', 'Varios Autores, Lautaro Roig Lanzillotta', 'Array', 5, 'http://books.google.com/books/content?id=rgWIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 1),
(6, '50', '', '', 4, '', '', 1),
(7, '50', '', '', 3, '', '', 1),
(8, 'percy jackson', '', '', 4, '', '', 4),
(9, '50', '', '', 4, '', '', 4),
(10, 'Filología Neotestamentaria 50', 'Varios Autores, Lautaro Roig Lanzillotta', 'Array', 3, 'http://books.google.com/books/content?id=rgWIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', '', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `comment`) VALUES
(2, 10, 1, 'hello'),
(3, 11, 1, 'first comment'),
(4, 11, 1, 'second'),
(5, 11, 1, 'third'),
(6, 11, 1, 'last for now...');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follows`
--

CREATE TABLE `follows` (
  `follow_id` int(11) NOT NULL,
  `follower` int(11) NOT NULL,
  `following` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `follows`
--

INSERT INTO `follows` (`follow_id`, `follower`, `following`) VALUES
(1, 1, 4),
(2, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `popularity` int(11) NOT NULL,
  `admin` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`group_id`, `name`, `description`, `image`, `popularity`, `admin`, `date_created`) VALUES
(3, 'Gryffindor', 'The house where Harry Potter. Therefore, the best one.', 'https://www.claires.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dweaacccf4/images/hi-res/51337_3.jpg?sw=2000&sh=2000&sm=fit', 1000, 1, '0000-00-00 00:00:00'),
(4, 'Slytherin', 'The opponets of the best house of Hogwarts.', 'https://shoptrends.com/pub/media/catalog/product/cache/8c01c332ca8fc596e6b515a82e5be04e/p/o/pod16729-1_1.jpg', 1000, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_members`
--

CREATE TABLE `group_members` (
  `gm_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `group_members`
--

INSERT INTO `group_members` (`gm_id`, `user_id`, `group_id`) VALUES
(2, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likedposts`
--

CREATE TABLE `likedposts` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likedposts`
--

INSERT INTO `likedposts` (`like_id`, `post_id`, `user_id`) VALUES
(2, 1, 1),
(3, 1, 2),
(4, 1, 2),
(5, 1, 2),
(6, 4, 12),
(7, 11, 4),
(8, 12, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `img`, `likes`, `date`) VALUES
(2, 1, 'post', '', 3, '2020-01-11 11:29:30'),
(10, 4, '', '', 0, '0000-00-00 00:00:00'),
(11, 4, 'hole', '', 1, '2020-01-12 22:49:28'),
(12, 4, 'hole', '', 2, '2020-01-14 14:00:34'),
(13, 4, 'hkk', '', 0, '0000-00-00 00:00:00'),
(14, 1, '$content', '$image', 0, '0000-00-00 00:00:00'),
(15, 1, 'ee', '', 0, '0000-00-00 00:00:00'),
(16, 1, 'hello', 'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687', 0, '0000-00-00 00:00:00'),
(17, 4, 'quiero hacr un pot\npero\nque \ntenga \nlinead', '', 0, '0000-00-00 00:00:00'),
(18, 1, 'lets see if it works', '', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `savedposts`
--

CREATE TABLE `savedposts` (
  `save_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `savedposts`
--

INSERT INTO `savedposts` (`save_id`, `post_id`, `user_id`) VALUES
(3, 13, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `join_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `cover_img` text NOT NULL,
  `profile_img` text NOT NULL DEFAULT 'https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `username`, `password`, `bio`, `join_date`, `cover_img`, `profile_img`) VALUES
(1, 'Jeremy', 'jermy2918', '19922202', 'U know who I am.', '2020-01-10 14:08:35', 'https://s3-us-east-2.amazonaws.com/enterate24backup/wp-content/uploads/2019/10/08180834/L_5b150f23729cb_shutterstock_552368572.jpg', 'https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png'),
(4, 'Jose', 'jose2020', '12345678', 'bio', '2020-01-14 13:41:28', '', 'https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indices de la tabla `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indices de la tabla `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`gm_id`);

--
-- Indices de la tabla `likedposts`
--
ALTER TABLE `likedposts`
  ADD PRIMARY KEY (`like_id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indices de la tabla `savedposts`
--
ALTER TABLE `savedposts`
  ADD PRIMARY KEY (`save_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `follows`
--
ALTER TABLE `follows`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `group_members`
--
ALTER TABLE `group_members`
  MODIFY `gm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `likedposts`
--
ALTER TABLE `likedposts`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `savedposts`
--
ALTER TABLE `savedposts`
  MODIFY `save_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
