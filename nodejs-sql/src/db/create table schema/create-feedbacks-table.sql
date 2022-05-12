
USE myappdb; 

CREATE TABLE IF NOT EXISTS feedbacks 
  ( 
     id         CHAR(36) PRIMARY KEY, 
     user_id    CHAR(36)  NOT NULL,
     given_by_user_id    CHAR(36) NOT NULL,
     feedback      TEXT , 
     created_on   DATETIME, 
      assigned_on   DATETIME NOT NULL
  );