CREATE TABLE deployments
(
  id INT NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL DEFAULT NOW(),
  run_identifier INT NOT NULL,
  person_id INT NOT NULL,
  status_id INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX (run_identifier)
);