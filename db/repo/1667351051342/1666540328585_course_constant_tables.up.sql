CREATE TABLE offdays
(
  `date` DATE NOT NULL,
  `session_id` INT NOT NULL,
  reason TINYTEXT,
  PRIMARY KEY (`date`),
  FOREIGN KEY (`session_id`) REFERENCES `session`(id)
);

CREATE TABLE `weekday`
(
  id INT NOT NULL,
  label VARCHAR(16) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE course_type
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);
