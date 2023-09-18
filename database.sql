SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `eshop` DEFAULT CHARACTER SET utf8;
USE `eshop`;

CREATE TABLE IF NOT EXISTS `eshop`.`gender` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gender_name` VARCHAR(20) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`users` (
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(20) NULL,
  `mobile` VARCHAR(10) NULL,
  `joined_date` DATETIME NULL,
  `verification_code` VARCHAR(20) NULL,
  `status` INT NULL,
  `gender_id` INT NOT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_users_gender_idx` (`gender_id` ASC),
  CONSTRAINT `fk_users_gender`
    FOREIGN KEY (`gender_id`)
    REFERENCES `eshop`.`gender` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`profile_img` (
  `path` VARCHAR(100) NOT NULL,
  `users_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`path`),
  INDEX `fk_profile_img_users1_idx` (`users_email` ASC),
  CONSTRAINT `fk_profile_img_users1`
    FOREIGN KEY (`users_email`)
    REFERENCES `eshop`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`category` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `cat_name` VARCHAR(45) NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`model` (
  `model_id` INT NOT NULL AUTO_INCREMENT,
  `model_name` VARCHAR(45) NULL,
  PRIMARY KEY (`model_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`brand` (
  `brand_id` INT NOT NULL AUTO_INCREMENT,
  `brand_name` VARCHAR(45) NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`model_has_brand` (
  `model_model_id` INT NOT NULL,
  `brand_brand_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_model_has_brand_brand1_idx` (`brand_brand_id` ASC),
  INDEX `fk_model_has_brand_model1_idx` (`model_model_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_model_has_brand_model1`
    FOREIGN KEY (`model_model_id`)
    REFERENCES `eshop`.`model` (`model_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_model_has_brand_brand1`
    FOREIGN KEY (`brand_brand_id`)
    REFERENCES `eshop`.`brand` (`brand_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`color` (
  `clr_id` INT NOT NULL AUTO_INCREMENT,
  `clr_name` VARCHAR(45) NULL,
  PRIMARY KEY (`clr_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `status_name` VARCHAR(45) NULL,
  PRIMARY KEY (`status_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`condition` (
  `condition_id` INT NOT NULL AUTO_INCREMENT,
  `condition_name` VARCHAR(45) NULL,
  PRIMARY KEY (`condition_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` DOUBLE NULL,
  `qty` INT NULL,
  `description` TEXT NULL,
  `title` VARCHAR(100) NULL,
  `datetime_added` DATETIME NULL,
  `delivery_fee_colombo` DOUBLE NULL,
  `delivery_fee_other` DOUBLE NULL,
  `category_cat_id` INT NOT NULL,
  `model_has_brand_id` INT NOT NULL,
  `color_clr_id` INT NOT NULL,
  `status_status_id` INT NOT NULL,
  `condition_condition_id` INT NOT NULL,
  `users_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_category1_idx` (`category_cat_id` ASC),
  INDEX `fk_product_model_has_brand1_idx` (`model_has_brand_id` ASC),
  INDEX `fk_product_color1_idx` (`color_clr_id` ASC),
  INDEX `fk_product_status1_idx` (`status_status_id` ASC),
  INDEX `fk_product_condition1_idx` (`condition_condition_id` ASC),
  INDEX `fk_product_users1_idx` (`users_email` ASC),
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_cat_id`)
    REFERENCES `eshop`.`category` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_model_has_brand1`
    FOREIGN KEY (`model_has_brand_id`)
    REFERENCES `eshop`.`model_has_brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_color1`
    FOREIGN KEY (`color_clr_id`)
    REFERENCES `eshop`.`color` (`clr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_status1`
    FOREIGN KEY (`status_status_id`)
    REFERENCES `eshop`.`status` (`status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_condition1`
    FOREIGN KEY (`condition_condition_id`)
    REFERENCES `eshop`.`condition` (`condition_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_users1`
    FOREIGN KEY (`users_email`)
    REFERENCES `eshop`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`brand_has_category` (
  `brand_brand_id` INT NOT NULL,
  `category_cat_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_brand_has_category_category1_idx` (`category_cat_id` ASC),
  INDEX `fk_brand_has_category_brand1_idx` (`brand_brand_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_brand_has_category_brand1`
    FOREIGN KEY (`brand_brand_id`)
    REFERENCES `eshop`.`brand` (`brand_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_brand_has_category_category1`
    FOREIGN KEY (`category_cat_id`)
    REFERENCES `eshop`.`category` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`product_img` (
  `img_path` VARCHAR(100) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`img_path`),
  INDEX `fk_product_img_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_img_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `eshop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`province` (
  `province_id` INT NOT NULL AUTO_INCREMENT,
  `province_name` VARCHAR(45) NULL,
  PRIMARY KEY (`province_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`district` (
  `district_id` INT NOT NULL AUTO_INCREMENT,
  `district_name` VARCHAR(45) NULL,
  `province_province_id` INT NOT NULL,
  PRIMARY KEY (`district_id`),
  INDEX `fk_district_province1_idx` (`province_province_id` ASC),
  CONSTRAINT `fk_district_province1`
    FOREIGN KEY (`province_province_id`)
    REFERENCES `eshop`.`province` (`province_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`city` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `city_name` VARCHAR(45) NULL,
  `district_district_id` INT NOT NULL,
  PRIMARY KEY (`city_id`),
  INDEX `fk_city_district1_idx` (`district_district_id` ASC),
  CONSTRAINT `fk_city_district1`
    FOREIGN KEY (`district_district_id`)
    REFERENCES `eshop`.`district` (`district_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `eshop`.`users_has_address` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `line1` TEXT NULL,
  `line2` TEXT NULL,
  `postal_code` VARCHAR(5) NULL,
  `users_email` VARCHAR(100) NOT NULL,
  `city_city_id` INT NOT NULL,
  INDEX `fk_users_has_city_city1_idx` (`city_city_id` ASC),
  INDEX `fk_users_has_city_users1_idx` (`users_email` ASC),
  PRIMARY KEY (`address_id`),
  CONSTRAINT `fk_users_has_city_users1`
    FOREIGN KEY (`users_email`)
    REFERENCES `eshop`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_city_city1`
    FOREIGN KEY (`city_city_id`)
    REFERENCES `eshop`.`city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
