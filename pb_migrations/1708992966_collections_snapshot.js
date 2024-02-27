/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-11-26 14:11:12.497Z",
      "updated": "2023-12-05 00:29:17.128Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": [
              "50x50",
              "150x150"
            ],
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "jwbo8uau8cdza7t",
      "created": "2023-11-30 01:06:44.884Z",
      "updated": "2023-11-30 14:17:27.650Z",
      "name": "trivia",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ahtdhx5c",
          "name": "category",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sifcjwk0",
          "name": "subcategory",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "534jzawb",
          "name": "question",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "wfteaaxj",
          "name": "a",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sn2s2xoz",
          "name": "b",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ehxq86tt",
          "name": "c",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "aqhvbxxs",
          "name": "d",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "csral4fg",
          "name": "difficulty",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "sqbdhmue1iaanpu",
      "created": "2023-11-30 19:39:35.496Z",
      "updated": "2023-11-30 19:46:55.219Z",
      "name": "trivia_log",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "hu6kp0d3",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "q9opanpu",
          "name": "question",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "jwbo8uau8cdza7t",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "h1wm3ti7",
          "name": "chosen",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "w1yeiy5s",
          "name": "correct",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": "user.id = user",
      "viewRule": "user.id = user",
      "createRule": "user.id = user",
      "updateRule": "user.id = user",
      "deleteRule": "user.id = user",
      "options": {}
    },
    {
      "id": "71ig7iys6y512y4",
      "created": "2023-12-04 02:21:59.069Z",
      "updated": "2024-02-27 00:06:23.832Z",
      "name": "userstate",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "z6eeimnc",
          "name": "user",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "h2lxikkv",
          "name": "state",
          "type": "json",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSize": 2000000
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_OQMyCAt` ON `userstate` (`user`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "user = user.id",
      "updateRule": "user = user.id",
      "deleteRule": "user = user.id",
      "options": {}
    },
    {
      "id": "7wif1o0ptbkqeej",
      "created": "2023-12-04 13:52:36.930Z",
      "updated": "2023-12-04 13:52:36.930Z",
      "name": "trivia_counts",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "e25lwuie",
          "name": "count",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "kz5iaqhj",
          "name": "category",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "gpowfgaw",
          "name": "subcategory",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "select (ROW_NUMBER() OVER()) as id, count(*) as count,category,subcategory from trivia group by category, subcategory order by category, subcategory"
      }
    },
    {
      "id": "7xtjicr41661oxr",
      "created": "2023-12-04 13:54:44.247Z",
      "updated": "2023-12-04 13:54:44.247Z",
      "name": "trivia_total",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ywold2l3",
          "name": "count",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "select 1 as id, count(*) as count from trivia;"
      }
    },
    {
      "id": "sy1tel6mzli6fdu",
      "created": "2023-12-05 01:49:46.252Z",
      "updated": "2024-02-27 00:06:23.832Z",
      "name": "trivia_log_score",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "nrejy6n5",
          "name": "correct",
          "type": "json",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSize": 2000000
          }
        },
        {
          "system": false,
          "id": "olupflfv",
          "name": "total",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "select user as id, sum(correct = 1) as correct,count(*) as total from trivia_log group by user;"
      }
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
