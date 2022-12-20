# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]



#### API routs :
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



## Data Shapes
- TABLE products : (id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER, category VARCHAR) 
- TABLE users (id SERIAL PRIMARY KEY,firstName VARCHAR, lastName VARCHAR, password VARCHAR)
- TYPE status AS ENUM ('active', 'complete')
- TABLE orders (id SERIAL PRIMARY KEY,user_id INTEGER REFERENCES users(id), order_status status) 
- TABLE order_details (order_id INTEGER REFERENCES orders(id),product_id INTEGER REFERENCES products(id) , quantity INTEGER, CONSTRAINT order_product_key PRIMARY KEY (order_id, product_id) )







