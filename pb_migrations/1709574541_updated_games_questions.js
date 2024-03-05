/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5yvdsr9lql7lqc0")

  collection.name = "games_trivia"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5yvdsr9lql7lqc0")

  collection.name = "games_questions"

  return dao.saveCollection(collection)
})
