CREATE TABLE messages
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(256) NOT NULL,
  `start_date` DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id)
);