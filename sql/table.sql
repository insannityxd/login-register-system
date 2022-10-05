CREATE TABLE `lrsys`.`users` (
    `ids` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`ids`)
);