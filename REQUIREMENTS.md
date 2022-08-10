## Data structure


### Users

|   Column   |          Type          |      
| ---------- | ---------------------- |
| id         | integer                |           
| first_name | character varying(64)  |  
| last_name  | character varying(64)  |           
| password   | character varying(255) | 

### Products
                       
|  Column  |         Type          | 
| -------- | --------------------- |
| id       | integer               |
| name     | character varying(64) |
| price    | integer               | 
| category | character varying(64) |     

### Orders

| Column  |         Type          |
| ------- | --------------------- |
| id      | integer               |        
| status  | character varying(64) | 
| user_id | bigint                |

### orders_products

|   Column   |  Type   | 
| ---------- | ------- |
| id         | integer |
| quantity   | integer |           
| order_id   | bigint  |           
| product_id | bigint  |       


## API ROUTES

### User
 - Make a POST request on `localhost:3000/api/user` and enter the body {first_name,last_name,password} to create a user
 - To authoticate the user you should make a POST request `localhost:3000/api/user/authenticate` and pass the {first_name,password}
 - Make a GET request to `localhost:3000/api/users` to get all users [token nedded]
 - You can GET specific user by making a GET request to `localhost:3000/api/user/:id` [token nedded]
 - Make a PUT request to update the user on `localhost:3000/api/user/:id` and pass the updated {first_name,last_name,passwor [token nedded]
 - Make a DELETE request to delete the user on `localhost:3000/api/user/:id`  [token nedded]

### Products
 - Make a POST request on `localhost:3000/api/product` and pass the body {name,price,category} to create a product [token nedded]
 - Make a GET request to `localhost:3000/api/products` to get all the prodcts [token nedded]
 - Make a GET requet to `localhost:3000/api/product/:id` to get a specific product [token nedded]
 - Update the products by making a PUT request on `localhost:3000/api/product:id` and pass the updated product {name,price,category} [token needed]
 - Make a DELETE request on `localhost:3000/api/product/:id` to delete the prodcut

### Orders
 - Make a POST request on `localhost:3000/api/order` and pass the body of the order {status,user_id}
 - Make a GET request on `localhost:3000/api/orders` to get all the orders
 - Make a GET reques on `localhost:3008/api/order/:id` to get specific order
 - Update the order by making a PUT request on `localhost:3000/api/order/:id` and pass the updated order body {status,user_id}
 - You can delete the order by making a DELETE request on `localhost:3000/api/order/:id`
 - Adding a product to an order is so simple you just make a POST request on `localhost:3000/api/order/:id/product` and pass {quantity,product_id} `:id` referes to the order_id
 - If you want to know the current order for a specific user you just make a GET request on `localhost:3000/api/current_order/:id` make sure to pass a valid user_id `:id` 
