# Storefront Backend Project

## FIRST 
### you have to create `.env` file that contains the following variables:
```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_user
SALT_ROUNDS=10
BCRYPT_PASSWORD=junglediff
TOKEN_SECRET=irelia
#ENV=test
```
## SECOND 
### Setting up postgresql database

- connect to the default postgres databage as the server's root user `psgl -U postgres`
- In psql run the following to create a yser
    - `CREATE USER test_user WITH PASSWORD 'test_user';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE store WITH OWNER test_user;`
    - `CREATE DATABASE store_test WITH OWNER test_user;`
- Connect to the database and grant all privileges
    - Grant for dev database
        - `\c store test_user` then enter the password 'test_user'
        - `GRANT ALL PRIVILEGES ON DATABASE store TO test_user;`
    - Grant for test database
        - `\c store_test test_user` then enter the password 'test_user'
        - `GRANT ALL PRIVILEGES ON DATABASE store_test TO test_user;`
### The database will run on port `5432`. You can access the server on localhost on port `3000`
## THIRD
### install the modules in package.json

- Run `npm run install` to install all dependencies and devDependencies

## FORTH
### Build the server
- for migration use `npm run db-up`
- for testing use `npm run test`
## the built scripts in the package.json file is running on windows powershell to switch between the dev database and te test database so if you are using linux please replace the `remove-hash` script value with `sed -i '/ENV=test/s/^#//g' .env` and the `add-hash` script value with `sed -i '/ENV=test/s/^/#/g' .env`
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