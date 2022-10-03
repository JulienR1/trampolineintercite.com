CREATE PROCEDURE increment_sendgrid_api_call()
BEGIN
	SET @today = current_date();
    
	IF NOT EXISTS (SELECT 1 FROM api_stats WHERE date = @today) THEN
		DELETE FROM api_stats WHERE date <> @today;    
		INSERT INTO api_stats (sendgrid_calls) VALUES (0);
    END IF;

    UPDATE api_stats SET sendgrid_calls = sendgrid_calls + 1 WHERE date = @today;
END;