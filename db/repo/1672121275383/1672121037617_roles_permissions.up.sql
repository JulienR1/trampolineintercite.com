CREATE TABLE role
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE person_to_role
(
  person_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (person_id, role_id)
);

CREATE TABLE permission
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role_to_permission
(
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id)
);