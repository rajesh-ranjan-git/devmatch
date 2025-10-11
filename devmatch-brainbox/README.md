# 🌐 List of APIs

![API](https://img.shields.io/badge/API-Endpoints-blue?style=for-the-badge&logo=fastapi)

```bash
devmatch/
│
├── User APIs
│   ├── POST -> /user/register
│   ├── POST -> /user/login
│   ├── POST -> /user/logout
│   └── POST -> /user/forgotPassword
│
├── Profile APIs
│   ├── GET -> /profile/view
│   ├── GET -> /profile/view:id
│   ├── POST -> /profile/update
│   └── POST -> /profile/updatePassword
│
├── Explore API
│   └── GET -> /explore
│
├── Connection APIs
│   ├── POST -> /connection/connect/:status/:id
│   └── GET -> /connection/view
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
devmatch/
│
├── User Model
│   ├── _id -> ObjectId
│   ├── email -> String
│   ├── password -> String
│   ├── previousPassword -> String
│   ├── passwordLastUpdated -> Date
│   ├── firstName -> String
│   ├── middleName -> String
│   ├── lastName -> String
│   ├── nickName -> String
│   ├── age -> Number
│   ├── phone -> Number
│   ├── gender -> String
│   ├── avatarUrl -> String
│   ├── bio -> String
│   ├── maritalStatus -> String
│   ├── jobProfile -> String
│   ├── experience -> Number
│   ├── github -> String
│   ├── website -> String
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
