PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Delete previous tables and indexes if exist
DROP TABLE IF EXISTS Users;
DROP INDEX IF EXISTS user_index;

-- Create Users table
CREATE TABLE Users (
    Username VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    HashedPass VARCHAR(255) NOT NULL,
    UNIQUE(Username, Email, HashedPass)
);

-- Create index for Users table
CREATE INDEX user_index
ON Users (Username);

-- Populate test data for Users table
INSERT INTO Users (Username, Email, HashedPass)
VALUES 
-- password for user ying is ying_pass
("ying", "ying@gmail.com", "pbkdf2:sha256:150000$gr6E9eAs$9b6ffb1cbdcf49a5e269f23f7341574155c4397f821323a8e67be9ac4cdb614d"),
-- password for user alex is alex_pass
("alex", "alex@gmail.com", "pbkdf2:sha256:150000$NX5cIDz8$4ec82d66c08d2254ddea7cc7f07529dbe4671885f5bcee910f0fbe8cbbbff803"),
-- password for user holiday is holiday_pass
("holiday", "holiday@gmail.com", "pbkdf2:sha256:150000$hZpcIIcx$cebca0228c2eb7a83b1aca09297abf88685f36cd4ba2e0b68223f8f6ea66279d"),
-- password for user test_user1 is test_pass1
("test_user1", "test_user1@gmail.com", "pbkdf2:sha256:150000$lH8ajOSR$e42203b64a5717d2a159b90889f7116b3966fed9cf7c8c7d6ccf2468c5116ef3"),
-- password for user test_user2 is test_pass2
("test_user2", "test_user2@gmail.com", "pbkdf2:sha256:150000$btzisI0Z$136431abb9af39b52f1297e32d266a95d25133b069d44cc683dd3ecb7bf5195b");

COMMIT;