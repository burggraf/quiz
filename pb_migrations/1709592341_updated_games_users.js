/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.viewRule = "userid = @request.auth.id || (@collection.games_users.userid ?= @request.auth.id && @collection.games_users.gameid ?= gameid)"
  collection.createRule = "userid = @request.auth.id"
  collection.updateRule = "userid = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sj5atpkjvg64527")

  collection.viewRule = ""
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
