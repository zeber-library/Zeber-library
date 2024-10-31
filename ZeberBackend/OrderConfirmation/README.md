# How to use backend APIs

# 1. http://localhost:PORT/api/v1/login/sendOTP
#     - request body should be sent this way => {email: <user_email>}

# 2. http://localhost:PORT/api/v1/login/verify-OTP
#     - request body should be sent this way => 
#         {
#         email: <user_email>,
#         OTP: <otp> // You will get this otp on <user_email>
#         }
#     - if verified <user_email> will be turned into a JWT token and sent to frontend

# 3. http://localhost:PORT/api/v1/adresses/getAll
#     - request body is empty for this call
#     - send jwt token from frontend this way => 
#         headers: {
#             "authorization": "Bearer <token>"
#             }
#     - backend will return you an array of addresses related to the <user_email>

# 4. http://localhost:PORT/api/v1/adresses/add
#     - request body should be sent this way =>
#         {
#         AddressLine: AddressLine1,
#         name: name,
#         Phone: Phone
#         }
#     - send jwt token from frontend this way => 
#         headers: {
#             "authorization": "Bearer <token>"
#             }
#     - backend will return you 
#         {
#         address._id, // use this for future calls
#         address_object // use this to update state
#         }

# 5. http://localhost:PORT/api/v1/adresses/update
#     - request body should be sent this way =>
#         {
#         address._id : <addressID> // address id that you received from backend earlier
#         }
#     - backend will return you 
#         {
#         address._id, // use this for future calls
#         address_object // use this to update state
#         }



# How to start redis server for OTP management

# 1. Install Docker Engine from https://www.docker.com/products/docker-desktop/

# 2. After installing start the Docker Engine

# 3. Now run this command on terminal : docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

# 4. Now go to localhost:8001 for redis server

# 5. your redis in-memory server is running and you can add or delete data