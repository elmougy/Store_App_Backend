/* Replace with your SQL commands */
INSERT INTO products(name ,price ,category) VALUES ('prod1',10 ,'cat1');
INSERT INTO products(name ,price ,category) VALUES ('prod2',20 ,'cat2');
INSERT INTO products(name ,price ,category) VALUES ('prod3',30 ,'cat1');

/* pass1 */ 
INSERT INTO users (firstName ,lastName ,password) VALUES ('fName','lName','$2b$10$RtKseI4qM3iP64R7KScO3eN3v/IkuvjVkCZccXzjabRy0cfbPdSk6');
INSERT INTO users (firstName ,lastName ,password) VALUES ('firstName','lastName','$2b$10$RtKseI4qM3iP64R7KScO3eN3v/IkuvjVkCZccXzjabRy0cfbPdSk6');

INSERT INTO orders (user_id, order_status) VALUES (1,'complete');
INSERT INTO orders (user_id, order_status) VALUES (1,'active');
INSERT INTO orders (user_id, order_status) VALUES (2,'complete');
INSERT INTO orders (user_id, order_status) VALUES (2,'active');

INSERT INTO order_details (order_id,product_id,quantity) VALUES (1,1,3);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (1,2,1);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (2,1,2);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (2,3,2);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (3,1,3);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (3,2,2);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (4,1,1);
INSERT INTO order_details (order_id,product_id,quantity) VALUES (4,2,3);