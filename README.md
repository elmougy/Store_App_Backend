-setting up database:
    1- update .env file with valid : POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER ,POSTGRES_PASSWORD  .
    2- run database commands:
        CREATE USER shopping_user WITH PASSWORD 'password123';
        CREATE DATABASE shopping;
        CREATE DATABASE shopping_test;
        GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
        GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

    3- run command db-migrate up .

-package installation instructions:
    1-run command : npm install 

-API routs :
    1-Products:
    index : GET("/products") .
    show : GET ("/products/:id") .
    create: POST ("/products") =>(authorization token required - body JSON parameters:( name ,price,category) )

    2-Users:
    index : GET ("/user")  =>(authorization token required)
    show : GET ("/user/:id")  =>(authorization token required)
    create : POST ("/user" )  => body JSON parameters:( firstName ,lastName , password).
    login: POST ("/user/login")  => body JSON parameters:( id ,password).

    3-Orders:
    current_Orders_by_user : GET ("/order/current?user_id=")  =>(authorization token required - enter a valid user_id parameter) 
    closed_Orders_by_user : GET ("/order/closed?user_id= ")  =>(authorization token required - enter a valid user_id parameter)

- to run tests : npm run test
- to start the server : npm run start 
- Database port : in .env file => DB_PORT=5432
- Backend port : in .env file => SERVER_PORT=3000
- .env file:
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=shopping
    POSTGRES_TEST_DB=shopping_test
    POSTGRES_USER=shopping_user
    POSTGRES_PASSWORD=password123
    ENV=dev
    BCRYPT_PASSWORD=password
    SALT_ROUNDS=10
    TOKEN_SECRET=secret
    SERVER_PORT=3000
    DB_PORT=5432

