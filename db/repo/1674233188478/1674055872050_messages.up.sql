CREATE TABLE messages
(
  id INT NOT NULL,
  `start_date` DATE NOT NULL,
  end_date DATE NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  visible BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);