/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mal3ep1i",
    "name": "status",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  // remove
  collection.schema.removeField("mal3ep1i")

  return dao.saveCollection(collection)
})
