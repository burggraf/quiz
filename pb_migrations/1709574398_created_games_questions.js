/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5yvdsr9lql7lqc0",
    "created": "2024-03-04 17:46:38.431Z",
    "updated": "2024-03-04 17:46:38.431Z",
    "name": "games_questions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "54nzepi1",
        "name": "gameid",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "yuoqxwmtkfwxfyd",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "kfy5hp1i",
        "name": "triviaid",
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
  const collection = dao.findCollectionByNameOrId("5yvdsr9lql7lqc0");

  return dao.deleteCollection(collection);
})
