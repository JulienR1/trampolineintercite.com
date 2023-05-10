CREATE TABLE deployments
(
  id INT NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL DEFAULT NOW(),
  run_identifier INT NOT NULL,
  person_id INT NOT NULL,
  `status` VARCHAR(64) NOT NULL DEFAULT "queued",
  PRIMARY KEY (id),
  INDEX (run_identifier),
  UNIQUE (run_identifier)
);