
CREATE TABLE order_details (order_id INTEGER REFERENCES orders(id),product_id INTEGER REFERENCES products(id) , quantity INTEGER NOT NULL,
    CONSTRAINT order_product_key PRIMARY KEY (order_id, product_id) ) ;