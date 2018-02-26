
  //event listener for when the recipe is submitted
  $(document).on("click", ".saveRecipe", function(event) {
    var user;
    var title = $(this).attr("data-title");
    var image = $(this).attr("src");
    var id = $(this).attr("data-id");
    
  $.get("api/user_data", {}, function(data) {
    console.log("getting all recipeData: " + data);
   
  }).done(function(data){
       user = data.id
     // when we save a new recipe
    console.log("title: " + title + " image: " + image + " spoonId: " + id + " user: " + user);
    event.preventDefault();
    if (!user || user === "undefined") {
      $("#loginModal").show();
      
    } else {
    //  newRcipe object to hand to the database
    var newRecipe = {
       title: title,
       image: image,
       spoonId: id,
       fridgeUserId: user
        };
        
      submitRecipe(newRecipe);
  }
  
  });
  });
  
   // submits the recipe
  function submitRecipe(recipe) {
    // console.log("title: " + title + " image: " + image + " spoonId: " + id);
    $.post("/api/recipes", recipe, function() {
      window.location.href = "/index";
    });
  }

$("#why").on("click", function() {
   $("#loginModal").hide();
})