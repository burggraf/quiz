/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuoqxwmtkfwxfyd")

  collection.deleteRule = "@request.auth.id = hostid"

  return dao.saveCollection(collection)
})
