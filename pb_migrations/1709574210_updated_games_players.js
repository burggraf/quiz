/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtfjhznt",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  // remove
  collection.schema.removeField("vtfjhznt")

  return dao.saveCollection(collection)
})
