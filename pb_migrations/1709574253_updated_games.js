/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hvy8wccl",
    "name": "title",
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
  collection.schema.removeField("hvy8wccl")

  return dao.saveCollection(collection)
})
