CREATE TABLE log
(
  id INT NOT NULL AUTO_INCREMENT,
  affected_table VARCHAR(32) NOT NULL,
  message TINYTEXT NOT NULL,
  log_date DATE NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES person(id)
);