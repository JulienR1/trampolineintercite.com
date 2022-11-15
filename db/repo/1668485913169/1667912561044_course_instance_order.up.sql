CREATE TABLE course_instance_order
(
  course_id INT NOT NULL,
  session_id INT NOT NULL,
  `order` INT NOT NULL,
  PRIMARY KEY (course_id, session_id),
  FOREIGN KEY (course_id) REFERENCES course(id),
  FOREIGN KEY (session_id) REFERENCES session(id),
  UNIQUE (session_id, `order`)
);