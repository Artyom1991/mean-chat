define({ "api": [
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Get all users from DB.",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"\n}",
          "type": "String"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>array of users</p>"
          }
        ],
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>invalid auth token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Admin",
    "name": "GetApiUsers"
  },
  {
    "type": "post",
    "url": "/sign-in/",
    "title": "Log in to system, response with access token: JWT.",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "login",
            "description": "<p>user's login</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>users's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NoSuchUser",
            "description": ""
          },
          {
            "group": "400",
            "optional": false,
            "field": "NoLoginOrPassword",
            "description": ""
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "WrongPassword",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Auth",
    "name": "PostSignIn"
  },
  {
    "type": "post",
    "url": "/sign-up/",
    "title": "Register in system.",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>invalid fields</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "ConflictInDB",
            "description": "<p>user with one or more unique fields already exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"email\":{\"message\":\"Invalid email!\",\"name\":\"ValidatorError\",\"properties\":{\"regexp\":{},\"type\":\"regexp\",\"message\":\"Invalid email!\",\"path\":\"email\",\"value\":\"admin@a.ruuuuuuuuuuuuuuu\"},\"kind\":\"regexp\",\"path\":\"email\",\"value\":\"admin@a.ruuuuuuuuuuuuuuu\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Auth",
    "name": "PostSignUp"
  },
  {
    "type": "delete",
    "url": "/api/users/:user_login",
    "title": "Delete user.",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_login",
            "description": "<p>user's login</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"\n}",
          "type": "String"
        }
      ]
    },
    "permission": [
      {
        "name": "this user of admin"
      }
    ],
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>invalid auth token</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "User",
    "name": "DeleteApiUsersUser_login"
  },
  {
    "type": "get",
    "url": "/api/users/:user_login",
    "title": "Fetch single user by login.",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_login",
            "description": "<p>user's login</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"\n}",
          "type": "String"
        }
      ]
    },
    "permission": [
      {
        "name": "this user of admin"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>invalid auth token</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "User",
    "name": "GetApiUsersUser_login"
  },
  {
    "type": "put",
    "url": "/api/users/:user_login",
    "title": "Replace user by new one.",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_login",
            "description": "<p>user's login</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>new user</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ\"\n  \"content-type\": \"application/json\"\n}",
          "type": "String"
        }
      ]
    },
    "permission": [
      {
        "name": "this user of admin"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "new",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": ""
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>invalid auth token</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "User",
    "name": "PutApiUsersUser_login"
  }
] });
