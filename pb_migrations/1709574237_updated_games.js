/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ur321gac",
    "name": "hostid",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  // remove
  collection.schema.removeField("ur321gac")

  return dao.saveCollection(collection)
})
