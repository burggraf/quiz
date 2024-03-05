/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.name = "games_users"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.name = "games_players"

  return dao.saveCollection(collection)
})
