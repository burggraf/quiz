/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sj5atpkjvg64527",
    "created": "2024-03-04 17:42:47.740Z",
    "updated": "2024-03-04 17:42:47.740Z",
    "name": "games_players",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "smsqrqu4",
        "name": "userid",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527");

  return dao.deleteCollection(collection);
})
