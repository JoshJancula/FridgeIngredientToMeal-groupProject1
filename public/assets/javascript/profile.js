$(document).ready(function() {
  $('.modal').modal();
 
  $.get("api/user_data", {}, function(data) {
    console.log("getting all recipeData: " + data);
 
    // get elements
  });


  // delete user account
  $("#handleDelete").click(function() {
    // get the users id
    $.get("api/user_data", {}, function(data) {
      var id = data.id
      console.log("email1: " + id);
    }).done(function(user) {
      $.ajax({ // go delete that shit
        method: "DELETE",
        url: "/api/users/" + user.id
      }).done(function(data) { // tell me something good
        console.log("delete was successful: " + JSON.stringify(data));
        window.location.href = '/logout'; // redirect to login page
      });
    });
  });


// button to logout
$("#logout").on("click", function(event) {
  $.get("/logout", function(data) {
    window.location.href = '/index';
  });
});



// view profile button
$("#main").on("click", function(event) {
  event.preventDefault();
  // go to the profile
  window.location.href = '/index';
});





});