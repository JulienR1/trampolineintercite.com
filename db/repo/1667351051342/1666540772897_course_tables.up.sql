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
