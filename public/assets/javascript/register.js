window.onload = function() {



  // Adding an event listener for when the form is submitted
  $("#registerUser").on('click', handleFormSubmit);

  // A function for handling what happens when the form to create a new user
  function handleFormSubmit(event) {


    var email = $("#registerEmail").val().trim();
    var password = $("#registerPassword").val().trim();
    var username = $("#username").val();

    event.preventDefault();
    // Don't submit unless the form is complete
    if (!password || !email) {
      return;
    }
    // Constructing a newMessage
    var newUser = {
      email: email,
      password: password,
      username: username,

    }; // submit the new user 
    submitToApi(newUser);

    // empty out the input fields

    $("#registerEmail").val("")
    $("#registerPassword").val("")
    $("#username").val("");



  }

  function submitToApi(user) {
    console.log("about to create user");
    $.post("/api/users", user, function(data, err) {

      console.log(JSON.stringify(data));
      console.log(JSON.stringify(err));
      if (err != "success") {
        console.log(err)
      }
      else {

        window.location.href = '/login';
      }
      // If there's an error, handle it by throwing up an alert
    }).catch(handleErr);
  }



  // function to handle errors
  function handleErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // login button up in nav
  $("#loginNav").on("click", function(event) {
    event.preventDefault();
    // go to the profile
    window.location.href = '/login';
  });


};
