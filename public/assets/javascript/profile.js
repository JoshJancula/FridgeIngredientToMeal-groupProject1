$(document).ready(function() {
    // initially hide the carousel area
    $("#videosGoHere").hide();

    $('.modal').modal();
    // get the current logged in user info
    $.get("api/user_data", {}, function(data) {}).done(function(data) {
        let id = data.id;
        // get that users recipes
        $.get("/api/users/" + id, function(data) {
            console.log("Recipes", data);
            let recipes = data.Recipes;
            if (recipes.length <= 0) {
                // tell them they don't have any
                displayEmpty();
            }
            else {

                getAll(recipes)

            }
        });

    })


    // if they don't have any yet
    function displayEmpty() {
        // there is nothing in here so....
        $("#instructions").html("<h3>You haven't saved any recipes yet.</h3>");
    }

    // get all the recipes and display the saved recipes
    function getAll(response) {
        var results = response;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            var recipeDiv = $("<div class='item'>");
            var id = results[i].id
            getRecipe(id, i, recipeDiv);
            //store the results here
            var title = results[i].title;
            var image = results[i].image;
            var deleteButton = $("<button class='btn deleteRecipe'>Delete Recipe</button>");
            deleteButton.attr("data-id", id);
            deleteButton.attr("src", image);
            deleteButton.attr("data-title", title)
            //Validation logic of title
            var findHashtag = title.search("#"); //find if title has a hashtag.
            //Hashtags usually have multiple words strung together without spaces, bringing search results to 0.
            //if a title does have a hashtag, we dont want to display that title.
            if (findHashtag !== -1) {
                // if hash tag exists we dont want  to execute rest of code, skip this iteration
                continue;
            }
            var uriTitle = title.replace(/\(.+?\)/g, ''); //replace parentheses with +
            uriTitle = uriTitle.replace(/[^a-z0-9+]+/gi, ' '); //replace all non  a-z 0-9 with a space
            uriTitle = encodeURIComponent(uriTitle).replace(/%20/g, '+'); //encode to uri and change encoded spaces to +

            // Creating a paragraph tag with recipe title
            var p = $("<h6 class='individualRecipes'>").text(title);
            p.attr("data-title", uriTitle);

            // Creating an image tag
            image = "<a href='#pageBottom'><div class= 'dynamicImage'><img src=" + image + " class='individualRecipes' data-title=" + uriTitle + "> <p class='hoverText'>Click to find a helpful cooking tutorial</p></div></a>";

            // append the paragraph and image we created to the "recipeDiv" div we created
            recipeDiv.append(p);
            recipeDiv.append(deleteButton);
            recipeDiv.append(image);

            // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
            $("#myRecipes").prepend(recipeDiv);

            // set image to regular opacity
            $(document).ready(function() {
                $('img').animate({
                    opacity: 1
                });

                // function for on hover of image fade the image
                $('img').hover(function() {
                    $(this).stop().animate({ opacity: .4 }, 200);

                }, function() {
                    $(this).stop().animate({ opacity: 1 }, 500)
                });
            });

            // function when you hover over image to display text
            $(document).ready(function() {
                $('.hoverText').hide();
            });
            $('.dynamicImage').hover(function() {
                // show user the hoverText
                $(this).find('.hoverText').fadeIn();

            }, function() {
                // fade it out and hide it
                $(this).find('.hoverText').fadeOut();
            });

        }
    }


    // function to get the recipe information for each recipe we got
    function getRecipe(id, recipeNumber, recipeDiv) {
        var queryURL2 = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
        queryURL2 += '?' + $.param({

            'includeNutrition': false

        });
        $.ajax({
            url: queryURL2,
            headers: { 'X-Mashape-Key': 'xsChWYIjxDmshHomTXHaaWmn7DuTp1ernr7jsnEXl2Nrg8DGIE' },
            method: 'GET'

        }).done(function(response2) {

            var results = response2;
            //creating a dropdown to display these results under each recipe
            var ul = $("<ul class='dropdown-content' id='dropdown" + recipeNumber + "'>")
            // <!-- Dropdown Trigger -->
            var dropdownList = $("<a>");
            dropdownList.addClass("dropdown-button btn");
            dropdownList.attr('data-activates', "dropdown" + recipeNumber);
            // adding each ingredient to dropdown list
            dropdownList.text("ingredients");
            var ingredientNames = results.extendedIngredients
            for (var i = 0; i < ingredientNames.length; i++) {
                var li = "<li>" + "-" + ingredientNames[i].name + "</li>";
                ul.append(li);
            }

            dropdownList.append(ul);

            // prepend the recipeDiv to the "#recipesGoHere" div in the HTML
            $(recipeDiv).append(dropdownList);
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button

                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });


        });


    }




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

    // delete a recipe 
    $(document).on("click", ".deleteRecipe", function(event) {
        let id = $(this).attr("data-id");
        $.ajax({
                method: "DELETE",
                url: "/api/recipes/" + id
            })
            .done(function() {
                window.location.href = '/profile';
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



    // end document ready
});


// Firebase config
var config = {
    apiKey: "AIzaSyB3lbSA5Y4e4StvaYtm5sno0pDad-90NeM",
    authDomain: "groupproject1-fridgetomeal.firebaseapp.com",
    databaseURL: "https://groupproject1-fridgetomeal.firebaseio.com",
    projectId: "groupproject1-fridgetomeal",
    storageBucket: "groupproject1-fridgetomeal.appspot.com",
    messagingSenderId: "32759158700"
};

firebase.initializeApp(config);
var database = firebase.database();

$(function() {
    //Function populates our videosGoHere division when called by click event.
    $(document.body).on("click", ".individualRecipes", function(e) {
        e.preventDefault();


        $("#videosGoHere").html(""); //clear out old carousel videos if present
        $("#videosGoHere").show();
        var carousel = $("<div class='carousel'>"); //create brand new carousel div element
        $("#videosGoHere").append(carousel); // place in videosGoHere div
        var queryTitle = $(this).attr("data-title"); //hook title of recipe

        //prepare request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            //change the hook here to whatever are ingredients
            q: queryTitle,
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2010-01-01T00:00:00Z"
        })
        //execute request
        request.execute(function(response) {
            setTimeout(function() { //wait short delay before execute request so jQuery finds newly created carousel element
                var results = response.result;
                $.each(results.items, function(index, item) {
                    var videoId = item.id.videoId;
                    var htmlVideo = "<a class='carousel-item' href='#one!'><div class='video-container'><iframe src='https://www.youtube.com/embed/" + videoId + "' width='560' height='315' frameborder='0' allowfullscreen></iframe></div></a>";
                    $(".carousel").append(htmlVideo);
                })
            }, 50)


            //initialize carousel and give parameters
            $(document).ready(function() {
                setTimeout(function() {
                    carouselInit();
                    location.hash = "#pageBottom";

                }, 1000) //wait 3 seconds before running carouselinit
            });
        })
    })
})
// function to initialize our carousel
function carouselInit() {
    $('.carousel').carousel({});
}


function init() {
    gapi.client.setApiKey("AIzaSyCrDLUDgfk0UO5izg05bh7tU1dIjbBmBA8");
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready
    })
}
