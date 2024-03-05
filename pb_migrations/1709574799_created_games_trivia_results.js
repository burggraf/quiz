/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zr86x69oqx4olkz",
    "created": "2024-03-04 17:53:19.055Z",
    "updated": "2024-03-04 17:53:19.055Z",
    "name": "games_trivia_results",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hlkbocfh",
        "name": "games_trivia_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "5yvdsr9lql7lqc0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "jsc9yhwt",
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
  const collection = dao.findCollectionByNameOrId("zr86x69oqx4olkz");

  return dao.deleteCollection(collection);
})
