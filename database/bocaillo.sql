-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bocaillo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bocaillo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bocaillo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bocaillo` ;

-- -----------------------------------------------------
-- Table `bocaillo`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bocaillo`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contrasenya` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bocaillo`.`foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`foro` (
  `idForo` INT NOT NULL AUTO_INCREMENT,
  `Propietario` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(200) NULL DEFAULT NULL,
  `Categoria` INT NOT NULL,
  PRIMARY KEY (`idForo`),
  INDEX `fk_foro_categoria_idx` (`Categoria` ASC) VISIBLE,
  INDEX `fk_foro_propietario_idx` (`Propietario` ASC) VISIBLE,
  CONSTRAINT `fk_foro_categoria`
    FOREIGN KEY (`Categoria`)
    REFERENCES `bocaillo`.`categoria` (`idCategoria`) ON DELETE CASCADE,
  CONSTRAINT `fk_foro_propietario`
    FOREIGN KEY (`Propietario`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`) ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bocaillo`.`mensaje_privado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`mensaje_privado` (
  `idMensaje` INT NOT NULL AUTO_INCREMENT,
  `contenido` VARCHAR(200) NOT NULL,
  `emisor` INT NOT NULL,
  `receptor` INT NOT NULL,
  `fechaEmision` DATETIME NOT NULL,
  PRIMARY KEY (`idMensaje`),
  INDEX `fk_mensaje_emisor_idx` (`emisor` ASC) VISIBLE,
  INDEX `fk_mensaje_receptor_idx` (`receptor` ASC) VISIBLE,
  CONSTRAINT `fk_mensaje_emisor`
    FOREIGN KEY (`emisor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`) ON DELETE CASCADE,
  CONSTRAINT `fk_mensaje_receptor`
    FOREIGN KEY (`receptor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`) ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bocaillo`.`mensaje_foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`mensaje_foro` (
  `idMensaje_foro` INT NOT NULL AUTO_INCREMENT,
  `contenido` VARCHAR(200) NOT NULL,
  `foro` INT NOT NULL,
  `emisor` INT NOT NULL,
  `fechaEmision` DATETIME NOT NULL,
  PRIMARY KEY (`idMensaje_foro`),
  INDEX `fk_mensaje_foro_idx` (`foro` ASC) VISIBLE,
  INDEX `fk_mensaje_foro_emisor_idx` (`emisor` ASC) VISIBLE,
  CONSTRAINT `fk_mensaje_foro`
    FOREIGN KEY (`foro`)
    REFERENCES `bocaillo`.`foro` (`idForo`) ON DELETE CASCADE,
  CONSTRAINT `fk_mensaje_foro_emisor`
    FOREIGN KEY (`emisor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`) ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
