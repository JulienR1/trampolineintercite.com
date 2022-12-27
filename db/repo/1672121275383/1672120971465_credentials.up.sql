CREATE TABLE credentials
(
  email VARCHAR(64) NOT NULL,
  `password` VARCHAR(1024) NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY (person_id),
  UNIQUE (email)
);