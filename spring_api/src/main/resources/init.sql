DROP TABLE IF EXISTS Products;
CREATE TABLE Products(
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255),
    price FLOAT
);

DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions(
    _id SERIAL PRIMARY KEY,
    id uuid,
    product_id VARCHAR(64),
    username VARCHAR(255),
    amount INTEGER,
    timestamp TIMESTAMP
);

DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;