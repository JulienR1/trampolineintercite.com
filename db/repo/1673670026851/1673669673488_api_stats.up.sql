CREATE TABLE api_stats
(
  `date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  sendgrid_calls INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`date`)
);