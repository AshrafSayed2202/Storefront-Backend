# Storefront Backend Project

## FIRST 
### you have to create `.env` file that contains the following variables:
```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_user
SALT_ROUNDS=10
BCRYPT_PASSWORD=junglediff
TOKEN_SECRET=irelia
```
## SECOND 
### Setting up postgresql database

    - create database named store
    - create user named test_user with password test_user also
    - give test_user all access to store database

## THIRD
### install the modules in package.json

- Run `npm run install` to install all

## FORTH
### Build the server
- for migration use `npm run db-up`
- for typescript complie use `npm run tsc`
- for testing use `npm run test`
- you can also `use npm run watch` for watching typescript files

### you can use the serever on PORT : 3000
- http://localhost:3000

## ROUTES
- ### USERS Routes
    - Create: [post] http://localhost:3000/api/users to create a user.
    Parameters are: `user_name`, `first_name`, `last_name` and `password`.
    no Tokens required (you will recive one)
    - Index: [get] http://localhost:3000/api/users Token required.
    - Show: [get] http://localhost:3000/api/users/:id Token and `id` are required.
    - Edit: [put] http://localhost:3000/api/users/:id Token , `id` , user `parameters` are all required.
    - Delete: [delete] http://localhost:3000/api/users/:id Token and `id` are required.
- ### PRODUCTS Routes
    - Index: [get] http://localhost:3000/api/products to get a list of all
    products.
    - Show: [get] http://localhost:3000/api/products/:id `id` required.
    - Create: [post] http://localhost:3000/api/products to create a product.
    Parameters are: `name`, `price` and `category`.Token required.
    - Edit: [put] http://localhost:3000/api/products/:id Token , `id` , product `parameters` are all required.
    - Delete: [delete] http://localhost:3000/api/products/:id Token and `id` are required.
- ### ORDERS Routes
    - Index: [get] http://localhost:3000/api/orders Token required.
    - Show: [get] http://localhost:3000/api/orders/:user_id Token and `user_id` are required.
    - Create: [post] http://localhost:3000/api/orders Token and Parameters (`user_id` and `status`) are required.
    - Edit: [put] http://localhost:3000/api/orders/:id Token , `id` , order `parameters` are all required.
    - Delete: [delete] http://localhost:3000/api/orders/:id Token and `id` are required.
- ### ORDERPRODUCTS Routes
    - Index: [get] http://localhost:3000/api/orderproducts Token required.
    - Show: [get] http://localhost:3000/api/orderproducts/:id Token and `id` are required.
    - Create: [post] http://localhost:3000/api/orderproducts Token and Parameters required
    to add a product with parameter `product_id` to order with `order_id` in quantity of parameter `quantity`.
    - Edit: [put] http://localhost:3000/api/orderproducts/:id Token , `id` , orderProducts `parameters` are all required.
    - Delete: [delete] http://localhost:3000/api/orderproducts/:id Token and `id` are required.