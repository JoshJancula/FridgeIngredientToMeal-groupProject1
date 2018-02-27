// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all saved recipes
  app.get("/api/recipes", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }

    db.Recipe.findAll({
      where: query,
      include: [db.fridgeUser]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get rotue for retrieving a single recipe
  app.get("/api/recipes/:id", function(req, res) {

    db.Recipe.findOne({
      where: {
        id: req.params.id
      },
      include: [db.fridgeUser]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // POST route for saving a new recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting recipes
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });


};
