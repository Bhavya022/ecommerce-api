# ecommerce-api

## Description

This is a RESTful API for a simple e-commerce application. It manages products, categories, and user authentication using Node.js, Express, and MySQL.

## Features

- **Product Management**: Create, read, update, and delete products.
- **Category Management**: Create, read, update, and delete categories.
- **User Authentication**: User registration, login, and profile management.
- **Swagger Documentation**: API documentation available at `/api-docs`.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- MySQL

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
Install Dependencies

sh
Copy code
npm install
Setup Environment Variables

Create a .env file in the root directory and add your environment variables:

plaintext
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
PORT=5000
Setup MySQL Database

Create a MySQL database and run the necessary SQL scripts to set up the schema. You can find the SQL scripts in the sql directory (create this directory if needed).

Example:

sql
Copy code
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
Start the Application

sh
Copy code
node src/app.js
Access API Documentation

Visit http://localhost:5000/api-docs to view the Swagger documentation for the API.

API Endpoints
Products
GET /api/products: Retrieve all products.
GET /api/products/
: Retrieve a specific product by ID.
POST /api/products: Create a new product.
PUT /api/products/
: Update an existing product.
DELETE /api/products/
: Delete a product.
Categories
GET /api/categories: Retrieve all categories.
GET /api/categories/
: Retrieve a specific category by ID.
POST /api/categories: Create a new category.
PUT /api/categories/
: Update an existing category.
DELETE /api/categories/
: Delete a category.
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in an existing user.
GET /api/auth/profile: Retrieve user profile information (requires authentication).
Testing
To run tests, use the following command:

sh
Copy code
npm test