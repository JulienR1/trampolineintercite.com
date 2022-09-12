CREATE OR REPLACE VIEW partner_data AS
SELECT website_link, label, width, height, url, alt
FROM partner, image
WHERE NOW() >= start_date AND (end_date IS NULL OR NOW() <= end_date);