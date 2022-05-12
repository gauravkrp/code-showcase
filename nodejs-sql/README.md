# Rest API with NodeJs, Express and Mysql for  project

### Technology -- Tools, Libraries and Stacks used

This example uses a number of open source projects to work properly:

* [node.js] - 16.0.0
* [Express]
* [mysql2]
* [bcryptjs]
* [jsonwebtoken]
* [express-validator]
* [dotenv]
* [cors]

### Getting Started

``` sh
# cd into backend
cd backend

# add your mysql username, mysql password and db name, port to env variables

# Import mysql database using Command line or phpmyadmin
# db name is myappdb but you can change 

mysql -u [db_username] -p[db_password] < create-users-table.sql

# sample database is in ./db folder (file name is myappdb.sql)
# import sample db for quick run

# Install dependencies
npm install

# Run the server locally in dev mode
npm run dev

# api server is running on port 5000
# http://localhost:5000/api/
```

### Application Logic
1. MySQL database is used and two tables are created.
2. users table is used for users and feedbacks table is used for feedbacks on reviews.
3. API routes can be found in ./src/routes/
4. Various custom middleware and utilities are used like auth middleware, error handling and user schema validator
