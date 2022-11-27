DROP FUNCTION IF EXISTS get_next_weekday;

CREATE FUNCTION get_next_weekday(`start_date` DATE, target_weekday INT)
RETURNS DATE
DETERMINISTIC
BEGIN
DECLARE next_weekday DATE;
SELECT DATE_ADD(`start_date`, INTERVAL MOD(target_weekday - DAYOFWEEK(`start_date`) + 7, 7) DAY) INTO next_weekday;
RETURN next_weekday;
END ;