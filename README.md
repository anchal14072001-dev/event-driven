# Event-Driven E-Commerce Microservices

📂 Project Structure
microservices-project/
├── docker-compose.yml
├── .env
│── Services/
├── user-service/
├── order-service/
├── payment-service/
├── api-gateway/
├── event-bus/   ← RabbitMQ connection helper
└── README.md
 
🚀 1. Setup & Run Instructions
# Prerequisites
 
Node.js v22.16.0
Docker & Docker Compose installed
RabbitMQ - http://localhost:15672
credential :- username: *****
              password: ***** 

 
# Services will be available at:
 
API Gateway → http://localhost:4000
 
User Service → http://localhost:4001
 
Order Service → http://localhost:4002
 
Payment Service → http://localhost:4003
 
RabbitMQ Dashboard → http://localhost:15672 (guest/guest)
 
MongoDB → localhost:27017
 

🔄 2. Saga Workflow Explanation
 
The system uses the Saga Pattern for distributed transactions.
 
# Success Flow
 
User places an order → Order Service creates order with status PENDING.
 
Order Service publishes ORDER_CREATED event to RabbitMQ.
 
Payment Service consumes the event → processes payment (random success/failure).
 
If success → publishes PAYMENT_SUCCESS.
 
Order Service consumes event → updates order status to CONFIRMED.
 
# Failure Flow
 
If Payment Service publishes PAYMENT_FAILED,
 
Order Service consumes it → updates order status to CANCELED.
 
This ensures data consistency across services without distributed locks.
 
📌 3. Example API Usage
Register User
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "userName":"John",
    "userEmail":"John@gmail.com",
    "userPassword":"John123",
    "userMobileNo":"9876567899",
    "userAddress":"Pune"
    }'
 
Login User
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{ 
    "userEmail":"John@gmail.com",
    "userPassword":"John123"
    }'
 
 
Response:
 
{  
  "message": "Login successful",
    "user": {
        "_id": "68c1640402fc325766a9def4",
        "userName": "abc",
        "userEmail": "abc@gmail.com"
    },
    "token": "eyJhbGciOi..." 
    }
 
Create Order
curl -X POST http://localhost:4000/orders \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "68c118f0342f150f4835bdbe",
    "items":[{"product":"Laptop","quantity":1,"price":1000}],
    "totalAmount":1000
  }'
 
 
Response:
 
{ 
  "userId": "68c118f0342f150f4835bdbe",
    "items": [
        {
            "product": "bag",
            "quantity": 2,
            "price": 1000,
            "_id": "68c11fe8e6629d7dbed3021b"
        }
    ],
    "totalAmount": 2000,
    "status": "PENDING",
    "_id": "68c11fe8e6629d7dbed3021a",
    "createdAt": "2025-09-10T06:51:20.463Z",
    "updatedAt": "2025-09-10T06:51:20.463Z"
     }
 
Get Order Status
curl -X GET http://localhost:4000/orders/<orderId> \
  -H "Authorization: Bearer <JWT_TOKEN>"
 
 
Possible responses:
 {
 "_id": "68c11fe8e6629d7dbed3021a",
    "userId": "68c118f0342f150f4835bdbe",
    "items": [
        {
            "product": "bag",
            "quantity": 2,
            "price": 1000,
            "_id": "68c11fe8e6629d7dbed3021b"
        }
    ],
    "totalAmount": 2000,
    "status": "CONFIRMED",
    "createdAt": "2025-09-10T06:51:20.463Z",
    "updatedAt": "2025-09-10T06:51:20.599Z"
}
Same for { "status": "CONFIRMED" }
        { "status": "CANCELED" }
 
📬 4. Postman
 
A ready-to-use Postman Collection is including 
 
Register User
 
Login User
 
Create Order
 
Get Order
 
Update Order
 
5.✅ Tech Stack
 
Node.js + Express.js
 
MongoDB
 
RabbitMQ
 
Docker & Docker Compose
 
JWT Auth
 
Saga Orchestration Pattern
 
✅ Summary
 
Independent services with their own DBs (MongoDB).
 
Asynchronous communication using RabbitMQ.
 
Saga Orchestration for transaction consistency.
 
API Gateway for client access.

