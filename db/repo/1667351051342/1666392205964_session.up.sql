CREATE TABLE `session`
(
  id INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NOT NULL,
  end_date DATE NOT NULL,
  label VARCHAR(128) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT valid_range CHECK (end_date > `start_date`)
);
