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
- phone -> number (10) -> required
- gender -> string -> "male" | "female" | "other" -> required
- avatarURL -> string
- bio -> string (4-100)
- maritalStatus -> string -> "married" | "single" | "separated"
- jobProfile -> string (max 100)
- experience -> number
- gitHub -> string
- website -> string
- organization -> string (max 100)
- skills -> [string]
- interests -> [string]
- address -> {
  street -> string (max 100)
  landmark -> string (max 100)
  city -> string (max 100)
  state -> string (max 100)
  countryCode -> number (2)
  country -> string (max 100)
  pinCode -> number (6)
  }

## Connection Model

- \_id -> ObjectId
- senderId -> ObjectId -> ref - User -> required
- receiverId -> ObjectId -> ref - User -> required
- status -> string -> "pending" | "accepted" | "rejected" | "ignored" | "blocked" -> required -> default : "pending"

## Notification Model

- \_id -> ObjectId
- type -> string -> "request" | "chat" -> required
- title -> string (max 100) -> required
- body -> string (max 100) -> required
- status -> string -> "read" | "unread" -> required -> default : "unread"
