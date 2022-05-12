-- DROP DATABASE IF EXISTS ;   
-- CREATE DATABASE IF NOT EXISTS ;   

USE myappdb; 

-- DROP TABLE IF EXISTS user; // dropping for testing/development only

CREATE TABLE IF NOT EXISTS users 
  ( 
     id         CHAR(36) PRIMARY KEY, 
     name       VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     is_admin   BOOL NOT NULL DEFAULT false, 
     created_on   DATETIME NOT NULL, 
     review_created_on   DATETIME, , 
     review_updated_on   DATETIME NOT NULL,
     review      TEXT
  ); 