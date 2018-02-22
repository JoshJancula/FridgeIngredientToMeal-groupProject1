$(document).ready(function() {

  //event listener for when the recipe is submitted
  $(".saveRecipe").on("click", handleRecipe);
  // Gets the part of the url that comes after the "?"
  var url = window.location.profile;

  // when we save a new recipe
  function handleRecipe(event) {
    event.preventDefault();
  
    //  newRcipe object to hand to the database
    var newRecipe = {
        // stuff
        };

 
      submitRecipe(newRecipe);
    
  }

  // Submits a new post and brings user to blog page upon completion
  function submitRecipe(recipe) {
    $.post("/api/recipes", recipe, function() {
      window.location.href = "/index";
    });
  }

  
 
});
