CREATE TABLE user(
    userId INT primary key AUTO_INCREMENT,
    userName varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);

INSERT INTO user(userName, contactNumber, email, password, status, role)
values('Shreyas', '8073168737', 'shre2441@gmail.com', 'shreyas100005', 'true', 'admin');

CREATE TABLE category(
    categoryId INT NOT NULL AUTO_INCREMENT,
    categoryName varchar(255) NOT NULL,
    primary key(categoryId)
);

CREATE TABLE product(
    pId INT NOT NULL AUTO_INCREMENT,
    pName varchar(255) NOT NULL,
    categoryId INTEGER NOT NULL,
    description varchar(255),
    price INTEGER,
    status varchar(20),
    primary key(pId)
);

CREATE TABLE bill(
    id INT  NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total INT NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);

CREATE TABLE ingredient (
    ingredientId INT NOT NULL AUTO_INCREMENT,
    ingredientName VARCHAR(255) NOT NULL,
    quantityOnHand INT,
    unitOfMeasurement VARCHAR(50),
    supplier VARCHAR(255),
    PRIMARY KEY (ingredientId)
);