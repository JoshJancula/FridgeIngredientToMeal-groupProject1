$(document).ready(function() {

  //event listener for when the recipe is submitted
  $(".saveRecipe").on("click", handleRecipe);
    
  // when we save a new recipe
  function handleRecipe(event) {
    event.preventDefault();
  
    //  newRcipe object to hand to the database
    var newRecipe = {
        // stuff
        };
        
      submitRecipe(newRecipe);
    
  }

  // submits the recipe
  function submitRecipe(recipe) {
    $.post("/api/recipes", recipe, function() {
      window.location.href = "/index";
    });
  }

  
 
});
