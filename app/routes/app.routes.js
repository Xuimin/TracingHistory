module.exports = app => {
  const history = require("../controllers/history.controllers.js");

  var router = require("express").Router();

  router.post("/", history.create);
  router.get("/", history.getAll);
  router.get("/:id", history.getById);
  router.put("/:id", history.update);
  router.delete("/:id", history.deleteById);
  router.delete("/", history.deleteAll);
  router.get("/search/:keyword", history.search);

  // localhost:3000/history/
  app.use("/history", router);
}