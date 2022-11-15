CREATE TABLE course_instance
(
  course_id INT NOT NULL,
  type_id INT NOT NULL,
  session_id INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  price FLOAT NOT NULL,
  `weekday` INT NOT NULL,
  creator_id INT NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (start_time, end_time, `weekday`, course_id, session_id),
  FOREIGN KEY (`weekday`) REFERENCES `weekday`(id),
  FOREIGN KEY (course_id) REFERENCES course(id),
  FOREIGN KEY (creator_id) REFERENCES person(id),
  FOREIGN KEY (type_id) REFERENCES course_type(id),
  FOREIGN KEY (session_id) REFERENCES `session`(id)
);