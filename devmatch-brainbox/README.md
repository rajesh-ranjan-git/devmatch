# List of APIs

## User APIs

- POST -> /user/login
- POST -> /user/register
- POST -> /user/logout

## Profile APIs

- GET -> /profile/view
- GET -> /profile/view/:id
- POST -> /profile/update
- POST -> /profile/updatePassword
- POST -> /profile/forgotPassword

## Feed API

- GET -> /feed

## Connection APIs

- GET -> /connection/request/:status/:id
- GET -> /connection/view
- GET -> /connection/review

## Notification APIs

- GET -> /notification/get
- GET -> /notification/mark/:status

# Models

## User Model

- \_id -> ObjectId
- email -> unique -> required
- password -> At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@, #, $, %, &) and min 6 length
- firstName -> lowercase (1-50) -> required
- middleName -> lowercase (1-50)
- lastName -> lowercase (1-50)
- nickName -> lowercase (1-50)
- age -> number (18-100) -> required
- gender -> string -> "male" | "female" | "other" -> required
- avatarUrl -> string
- bio -> string (4-100)
- status -> string -> "married" | "single"
- jobProfile -> string (max 100)
- experience -> number
- gitHub -> string
- website -> string
- organization -> string (max 100)
- interests -> [string]

## Connection Model

- \_id -> ObjectId
- senderId -> ObjectId -> ref - User -> required
- receiverId -> ObjectId -> ref - User -> required
- status -> string -> "pending" | "accepted" | "rejected" | "ignored" | "blocked" -> required -> default : "pending"

## Notification Model

- \_id -> ObjectId
- type -> string -> "request" | "chat" -> required
- body -> string -> required
- title -> string -> required
- status -> string -> "read" | "unread" -> required -> default : "unread"
