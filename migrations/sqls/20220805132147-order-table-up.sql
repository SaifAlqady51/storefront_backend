/* Replace with your SQL commands */

CREATE TABLE orders(id SERIAL PRIMARY KEY, status VARCHAR(64), user_id bigint REFERENCES users(id));