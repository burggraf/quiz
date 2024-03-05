/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.listRule = "userid = @request.auth.id || (@collection.games_users.userid ?= @request.auth.id && @collection.games_users.gameid ?= gameid)"
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.listRule = "@collection.games_users.userid ?= @request.auth.id && @collection.games_users.gameid ?= id"
  collection.viewRule = "@collection.games_users.userid ?= @request.auth.id && @collection.games_users.gameid ?= id"

  return dao.saveCollection(collection)
})
