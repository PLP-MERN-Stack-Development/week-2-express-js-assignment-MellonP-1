# Express.js RESTful API Assignment

This project is a RESTful API built using Express.js that manages a simple product catalog. It demonstrates CRUD operations, middleware usage, and error handling.

---

## Table of Contents

You should fill in the Table of Contents section with the provided list. Here is the rewritten markdown content to place at `$SELECTION_PLACEHOLDER$`:

```markdown
- [Project Overview](#project-overview)  
- [Setup Instructions](#setup-instructions)  
- [API Endpoints](#api-endpoints)  
- [Middleware](#middleware)  
- [Error Handling](#error-handling)  
- [Testing](#testing)  
- [Author](#author)  
```
---

## Project Overview

This API allows users to create, read, update, and delete products with fields such as `id`, `name`, `description`, `price`, `category`, and `inStock` status. It includes middleware for request logging, authentication, validation, and comprehensive error handling.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd express-api

2. Install dependancies
npm install

3. Start the server:

npm start

4. The API runs at:

http://localhost:3000

## API Endpoints
# Base URL

http://localhost:3000/api/products


## Endpoints

GET	/api/products
GET	/api/products/:id	
POST	/api/products
PUT	/api/products/:id
DELETE	/api/products/:id

## Example Requests
List all products:
GET http://localhost:3000/api/products

Get product with ID 1:
GET http://localhost:3000/api/products/1

Create a new product:
POST http://localhost:3000/api/products
Body (JSON):

{
  "name": "Tablet",
  "description": "10 inch display tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
Update product with ID 1:
PUT http://localhost:3000/api/products/1
Body (JSON):

{
  "price": 1100,
  "inStock": false
}
Delete product with ID 1:
DELETE http://localhost:3000/api/products/1

# Middleware
- Logger Middleware: Logs request method, URL, and timestamp

- Authentication Middleware: Checks API key in request headers

- Validation Middleware: Validates product creation and update data

- Error Handling Middleware: Handles 404, validation, and general errors with appropriate responses

# Error Handling
- 404 Not Found: When product with specified ID does not exist

- 400 Bad Request: For validation errors during create/update

- 401 Unauthorized: If API key is missing or invalid (if enabled)

- 500 Internal Server Error: For unexpected server errors

# Testing
Use Postman, Insomnia, or curl to test the API endpoints locally.

Example curl command to list all products:

curl http://localhost:3000/api/products

## Author
Mellon Pakkies
GitHub link: @MellonP