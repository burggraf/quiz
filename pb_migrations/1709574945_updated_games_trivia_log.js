/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zr86x69oqx4olkz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dheplbzl",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ge2gqhms",
    "name": "correct",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ardded2u",
    "name": "points",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zr86x69oqx4olkz")

  // remove
  collection.schema.removeField("dheplbzl")

  // remove
  collection.schema.removeField("ge2gqhms")

  // remove
  collection.schema.removeField("ardded2u")

  return dao.saveCollection(collection)
})
