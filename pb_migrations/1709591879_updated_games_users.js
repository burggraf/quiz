/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.listRule = "userid = @request.auth.id || (@collection.games_users.userid ?= @request.auth.id && @collection.games_users.gameid ?= gameid)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.listRule = "userid = @request.auth.id"

  return dao.saveCollection(collection)
})
