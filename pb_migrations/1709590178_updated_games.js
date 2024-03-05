/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  collection.listRule = ""
  collection.updateRule = "@request.auth.id = hostid"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  collection.listRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
