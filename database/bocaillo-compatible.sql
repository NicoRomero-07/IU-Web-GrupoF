CREATE SCHEMA IF NOT EXISTS `bocaillo` default charset utf8 collate utf8_general_ci;
USE `bocaillo`; 
-- -----------------------------------------------------
-- Table `bocaillo`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))



-- -----------------------------------------------------
-- Table `bocaillo`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contrasenya` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )



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
  INDEX `fk_foro_categoria_idx` (`Categoria` ASC) ,
  INDEX `fk_foro_propietario_idx` (`Propietario` ASC) ,
  CONSTRAINT `fk_foro_categoria`
    FOREIGN KEY (`Categoria`)
    REFERENCES `bocaillo`.`categoria` (`idCategoria`),
  CONSTRAINT `fk_foro_propietario`
    FOREIGN KEY (`Propietario`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`))



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
  INDEX `fk_mensaje_emisor_idx` (`emisor` ASC) ,
  INDEX `fk_mensaje_receptor_idx` (`receptor` ASC) ,
  CONSTRAINT `fk_mensaje_emisor`
    FOREIGN KEY (`emisor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`),
  CONSTRAINT `fk_mensaje_receptor`
    FOREIGN KEY (`receptor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`))



-- -----------------------------------------------------
-- Table `bocaillo`.`mesaje_foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bocaillo`.`mesaje_foro` (
  `idMesaje_foro` INT NOT NULL AUTO_INCREMENT,
  `contenido` VARCHAR(200) NOT NULL,
  `foro` INT NOT NULL,
  `emisor` INT NOT NULL,
  `fechaEmision` DATETIME NOT NULL,
  PRIMARY KEY (`idMesaje_foro`),
  INDEX `fk_mensaje_foro_idx` (`foro` ASC) ,
  INDEX `fk_mensaje_foro_emisor_idx` (`emisor` ASC) ,
  CONSTRAINT `fk_mensaje_foro`
    FOREIGN KEY (`foro`)
    REFERENCES `bocaillo`.`foro` (`idForo`),
  CONSTRAINT `fk_mensaje_foro_emisor`
    FOREIGN KEY (`emisor`)
    REFERENCES `bocaillo`.`usuario` (`idUsuario`))



