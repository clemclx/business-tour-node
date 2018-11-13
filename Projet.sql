-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 13 Novembre 2018 à 16:00
-- Version du serveur :  5.7.24-0ubuntu0.16.04.1
-- Version de PHP :  7.1.24-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `archive`
--

CREATE TABLE `archive` (
  `id` int(11) NOT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext,
  `originalRecordId` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `cards`
--

CREATE TABLE `cards` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `dice`
--

CREATE TABLE `dice` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `value` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `gameboard`
--

CREATE TABLE `gameboard` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `numberOfCurrentPlayers` double DEFAULT NULL,
  `isWin` tinyint(1) DEFAULT NULL,
  `hasBegun` tinyint(1) DEFAULT NULL,
  `playersId` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `gameboard`
--

INSERT INTO `gameboard` (`createdAt`, `updatedAt`, `id`, `numberOfCurrentPlayers`, `isWin`, `hasBegun`, `playersId`) VALUES
(1542104384101, 1542119516236, 1, 4, 0, 1, 0),
(1542104387364, 1542117843098, 2, 2, 0, 1, 0),
(1542104392815, 1542118072498, 3, 1, 0, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `gamescore`
--

CREATE TABLE `gamescore` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `moneyEarned` double DEFAULT NULL,
  `numberPropertiesBought` double DEFAULT NULL,
  `totalDuration` datetime DEFAULT NULL,
  `numberTurns` double DEFAULT NULL,
  `idPlayer` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `globalstats`
--

CREATE TABLE `globalstats` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `numberWins` double DEFAULT NULL,
  `numberLoses` double DEFAULT NULL,
  `averageDurationGame` datetime DEFAULT NULL,
  `idPlayer` double DEFAULT NULL,
  `numberTotalGamesPlayed` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pion`
--

CREATE TABLE `pion` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `initialPosition` double DEFAULT NULL,
  `currentPosition` double DEFAULT NULL,
  `diceValue` double DEFAULT NULL,
  `idPlayer` double DEFAULT NULL,
  `numberTurns` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE `player` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `isSuperAdmin` tinyint(1) DEFAULT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetTokenExpiresAt` double DEFAULT NULL,
  `emailProofToken` varchar(255) DEFAULT NULL,
  `emailProofTokenExpiresAt` double DEFAULT NULL,
  `emailStatus` varchar(255) DEFAULT NULL,
  `emailChangeCandidate` varchar(255) DEFAULT NULL,
  `lastSeenAt` double DEFAULT NULL,
  `initialMoney` double DEFAULT NULL,
  `currentMoney` double DEFAULT NULL,
  `inJail` tinyint(1) DEFAULT NULL,
  `isBankrupt` tinyint(1) DEFAULT NULL,
  `numberOfHouses` double DEFAULT NULL,
  `numberOfRoundsJailed` double DEFAULT NULL,
  `numberOfDoubleDice` double DEFAULT NULL,
  `idOfTheCurrentGame` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `player`
--

INSERT INTO `player` (`createdAt`, `updatedAt`, `id`, `emailAddress`, `password`, `fullName`, `isSuperAdmin`, `passwordResetToken`, `passwordResetTokenExpiresAt`, `emailProofToken`, `emailProofTokenExpiresAt`, `emailStatus`, `emailChangeCandidate`, `lastSeenAt`, `initialMoney`, `currentMoney`, `inJail`, `isBankrupt`, `numberOfHouses`, `numberOfRoundsJailed`, `numberOfDoubleDice`, `idOfTheCurrentGame`) VALUES
(1542104507589, 1542104507634, 1, 'a@a.fr', '$2a$10$OLsYHfhlTkMDBEQF2Iz.WeSP/o88kr9E/0m1Ns1tzad.3o/TXqVp2', 'a', 0, '', 0, '', 0, 'confirmed', '', 1542104507633, 0, 0, 0, 0, 0, 0, 0, 1),
(1542104520014, 1542108972253, 2, 'z@z.fr', '$2a$10$MBfDWaGuLWAJwEmokTIdSewCXI1FG.ZNOwLcK/gNpPs/AwPuQvT.m', 'z', 0, '', 0, '', 0, 'confirmed', '', 1542104520047, 0, 0, 0, 0, 0, 0, 0, 1),
(1542117120651, 1542117120697, 3, 'r@r.fr', '$2a$10$2RHzAbGJNRc2LS86h6VCu.itQYWJnCjROfy/FKZpB56Dhpgotic02', 'r', 0, '', 0, '', 0, 'confirmed', '', 1542117120697, 0, 0, 0, 0, 0, 0, 0, 1),
(1542117135719, 1542117135763, 4, 'o@o.fr', '$2a$10$knRUmx3riS0/PySTj3v3GO3tf7Mk6fEriFZ11AIGOIo.pRwQ2dayK', 'o', 0, '', 0, '', 0, 'confirmed', '', 1542117135763, 0, 0, 0, 0, 0, 0, 0, 1),
(1542117216803, 1542117216843, 5, 'q@q.fr', '$2a$10$P5RnanlpSLAZKSv91KawFOAZCL/ZZjDqMX0ODkfAauThuhKToKQ5O', 'q', 0, '', 0, '', 0, 'confirmed', '', 1542117216842, 0, 0, 0, 0, 0, 0, 0, 0),
(1542117355847, 1542117355895, 6, 'g@g.fr', '$2a$10$HXtAY5.GxdI3I62Kb7tn7.EWXC.vbpnJuk8tQ3IJbgwHTkXgflpEW', 'g', 0, '', 0, '', 0, 'confirmed', '', 1542117355894, 0, 0, 0, 0, 0, 0, 0, 2),
(1542117382350, 1542117382396, 7, 'h@h.fr', '$2a$10$DSAblJ0D6H5p.VWDjf2KdeH1VteTGO1A36eeU28D2jjbEyvsr2e9.', 'h', 0, '', 0, '', 0, 'confirmed', '', 1542117382396, 0, 0, 0, 0, 0, 0, 0, 3);

-- --------------------------------------------------------

--
-- Structure de la table `tile`
--

CREATE TABLE `tile` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `isOwned` tinyint(1) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `tileType` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `isSuperAdmin` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `archive`
--
ALTER TABLE `archive`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `dice`
--
ALTER TABLE `dice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `gameboard`
--
ALTER TABLE `gameboard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `gamescore`
--
ALTER TABLE `gamescore`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `globalstats`
--
ALTER TABLE `globalstats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `pion`
--
ALTER TABLE `pion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `emailAddress` (`emailAddress`);

--
-- Index pour la table `tile`
--
ALTER TABLE `tile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `archive`
--
ALTER TABLE `archive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `dice`
--
ALTER TABLE `dice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `gameboard`
--
ALTER TABLE `gameboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `gamescore`
--
ALTER TABLE `gamescore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `globalstats`
--
ALTER TABLE `globalstats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `pion`
--
ALTER TABLE `pion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `tile`
--
ALTER TABLE `tile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
