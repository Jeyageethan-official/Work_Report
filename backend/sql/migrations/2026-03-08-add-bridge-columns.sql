USE workreport_auth;

SET @db := DATABASE();

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db AND table_name = 'users' AND column_name = 'is_disabled'
  ),
  'SELECT 1',
  'ALTER TABLE users ADD COLUMN is_disabled TINYINT(1) NOT NULL DEFAULT 0'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db AND table_name = 'users' AND column_name = 'role'
  ),
  'SELECT 1',
  'ALTER TABLE users ADD COLUMN role ENUM(''user'',''owner'') NOT NULL DEFAULT ''user'''
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db AND table_name = 'users' AND column_name = 'firebase_uid'
  ),
  'SELECT 1',
  'ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(128) NULL'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db AND table_name = 'users' AND column_name = 'last_login_at'
  ),
  'SELECT 1',
  'ALTER TABLE users ADD COLUMN last_login_at DATETIME NULL'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = @db AND table_name = 'users' AND index_name = 'uq_users_firebase_uid'
  ),
  'SELECT 1',
  'CREATE UNIQUE INDEX uq_users_firebase_uid ON users (firebase_uid)'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := IF(
  EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = @db AND table_name = 'users' AND index_name = 'idx_users_role_disabled'
  ),
  'SELECT 1',
  'CREATE INDEX idx_users_role_disabled ON users (role, is_disabled)'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
