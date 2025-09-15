USE `coh2_replays`;

DROP TABLE IF EXISTS `replays`;

CREATE TABLE IF NOT EXISTS `replays` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `uploader_name` VARCHAR(255) NOT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `map_name` VARCHAR(255) NOT NULL,
  `player_count` INT NOT NULL,
  `game_version` VARCHAR(50) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `upload_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);