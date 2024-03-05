/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zr86x69oqx4olkz")

  collection.name = "games_trivia_log"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zr86x69oqx4olkz")

  collection.name = "games_trivia_results"

  return dao.saveCollection(collection)
})
