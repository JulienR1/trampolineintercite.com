CREATE TABLE partner
(
  id INT NOT NULL AUTO_INCREMENT,
  website_link VARCHAR(512),
  `start_date` DATE NOT NULL,
  end_date DATE,
  label VARCHAR(128) NOT NULL,
  image_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES image(id)
);