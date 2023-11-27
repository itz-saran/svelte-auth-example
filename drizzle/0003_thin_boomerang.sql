-- Custom SQL migration file, put you code below! --
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = now();
  RETURN NEW;
END;
$$ LANGUAGE "plpgsql";

CREATE TRIGGER users_update_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();