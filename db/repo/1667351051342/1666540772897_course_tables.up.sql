CREATE TABLE course_availability
(
  availability_id INT NOT NULL AUTO_INCREMENT,
  always_available BOOLEAN NOT NULL DEFAULT FALSE,
  `session_id` INT,
  PRIMARY KEY (availability_id),
  FOREIGN KEY (session_id) REFERENCES `session`(id)
);

CREATE TABLE course
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(128) NOT NULL,
  `description` TEXT NOT NULL,
  subtitle VARCHAR(256),
  image_id INT NOT NULL,
  default_type_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES `image`(id),
  FOREIGN KEY (default_type_id) REFERENCES course_type(id)
);
