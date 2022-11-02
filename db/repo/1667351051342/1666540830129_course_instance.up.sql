CREATE TABLE course_instance
(
  course_id INT NOT NULL,
  `weekday` INT NOT NULL,
  availability_id INT NOT NULL,
  start_time DATE NOT NULL,
  end_time DATE NOT NULL,
  type_id INT NOT NULL,
  price FLOAT NOT NULL,
  `order` INT NOT NULL,
  ceator_id INT NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (start_time, end_time, `weekday`, course_id, availability_id),
  FOREIGN KEY (`weekday`) REFERENCES `weekday`(id),
  FOREIGN KEY (course_id) REFERENCES course(id),
  FOREIGN KEY (ceator_id) REFERENCES person(id),
  FOREIGN KEY (availability_id) REFERENCES course_availability(availability_id),
  FOREIGN KEY (type_id) REFERENCES course_type(id),
  UNIQUE (`order`, type_id),
  CONSTRAINT valid_time CHECK (end_time > start_time)
);