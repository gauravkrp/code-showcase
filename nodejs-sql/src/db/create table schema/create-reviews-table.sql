
USE myappdb; 

CREATE TABLE IF NOT EXISTS reviews 
  ( 
     id         CHAR(36) PRIMARY KEY, 
     user_id    CHAR(36) NOT NULL, 
     review      TEXT NOT NULL, 
     created_on   DATETIME NOT NULL, 
     updated_on   DATETIME NOT NULL 
  ); 