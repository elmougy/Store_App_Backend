-setting up database:<br>

    1- update .env file with valid : POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER ,POSTGRES_PASSWORD  .
    
    2- run database command:
        CREATE USER shopping_user WITH PASSWORD 'password123';
        CREATE DATABASE shopping;
        CREATE DATABASE shopping_test;
        GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
        GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

    3- run command db-migrate up .

-package installation instructions:<br>

    run command : npm install 

-API routs :<br>

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

- to run tests: <code> npm run test </code>
     
- to start the server : <code>npm run start </code>

- Database port : in .env file => DB_PORT=5432
- Backend port : in .env file => SERVER_PORT=3000
- .env file: <br>

    POSTGRES_HOST=127.0.0.1 <br>
    POSTGRES_DB=shopping <br>
    POSTGRES_TEST_DB=shopping_test  <br>
    POSTGRES_USER=shopping_user <br>
    POSTGRES_PASSWORD=password123 <br>
    ENV=dev <br>
    BCRYPT_PASSWORD=password <br>
    SALT_ROUNDS=10 <br>
    TOKEN_SECRET=secret <br>
    SERVER_PORT=3000 <br>
    DB_PORT=5432 <br>

