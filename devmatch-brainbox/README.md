# 🌐 List of APIs

![API](https://img.shields.io/badge/API-Endpoints-blue?style=for-the-badge&logo=fastapi)

```bash
devmatch
│
🤖 devmatch-brainbox 🤖
│
├── Default API
│   └── GET -> /api
│
├── User APIs
│   ├── GET -> /api/user/checkAuth
│   ├── POST -> /api/user/register
│   ├── POST -> /api/user/login
│   ├── POST -> /api/user/logout
│   └── POST -> /api/user/forgot-password
│
├── Profile APIs
│   ├── GET -> /api/profile/view
│   ├── GET -> /api/profile/view/:id
│   ├── POST -> /api/profile/update
│   └── POST -> /api/profile/update-password
│
├── Explore API
│   └── GET -> /api/explore
│
├── Connection APIs
│   ├── POST -> /api/connection/:status/:id
│   └── GET -> /api/connection/connections
│   └── GET -> /api/connection/requests
│
├── Notification APIs
│   ├── GET -> /notification/view
│   └── POST -> /notification/mark/:status/:id
│
└── /
```

# Models

![Models](https://img.shields.io/badge/Models-Mongoose-green?style=for-the-badge&logo=mongodb)

```bash
devmatch
│
🤖 devmatch-brainbox 🤖
│
├── User Model
│   ├── _id -> ObjectId
│   ├── email -> String
│   ├── password -> String
│   ├── previousPassword -> String
│   ├── passwordLastUpdated -> Date
│   ├── userName -> String
│   ├── firstName -> String
│   ├── middleName -> String
│   ├── lastName -> String
│   ├── nickName -> String
│   ├── age -> Number
│   ├── phone -> Number
│   ├── gender -> String
│   ├── avatarUrl -> String
│   ├── coverPhotoUrl -> String
│   ├── bio -> String
│   ├── maritalStatus -> String
│   ├── jobProfile -> String
│   ├── experience -> Number
│   ├── facebook -> String
│   ├── instagram -> String
│   ├── twitter -> String
│   ├── github -> String
│   ├── linkedin -> String
│   ├── youtube -> String
│   ├── website -> String
│   ├── company -> String
│   ├── organization -> String
│   ├── skills -> [String]
│   ├── interests -> [String]
│   ├── address
│   │   ├── street -> String
│   │   ├── landmark -> String
│   │   ├── city -> String
│   │   ├── state -> String
│   │   ├── countryCode -> Number
│   │   ├── country -> String
│   │   └── pinCode -> Number
│   │
│   └── timestamps -> true
│
├── Connection Model
│   ├── _id -> ObjectId
│   ├── senderId -> ObjectId
│   ├── receiverId -> ObjectId
│   ├── connectionStatus -> String
│   ├── rejectedBySenderCount -> Number
│   ├── rejectedByReceiverCount -> Number
│   ├── lastActionedBy -> ObjectId
│   └── timestamps -> true
│
├── Notification Model
│   ├── _id -> ObjectId
│   ├── type -> String
│   ├── to -> ObjectId
│   ├── from -> ObjectId
│   ├── title -> String
│   ├── body -> String
│   ├── status -> String
│   └── timestamps -> /true
│
└── /
```
