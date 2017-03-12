      // Variable for data
      var seaCreature = ["Jellyfish", "Corals", "Starfish", "Sea Urchins", "Stingrays", "Marine Worms", "Shrimp", "Squid", "Lobster", "Anemone"];
      
      function displayCreature() {

        // On click button 
        $("#newButtons").on("click",".seaCreature", function() {
          console.log('click');
  
          var creatureName = $(this).data("name");
            console.log("Sea creature "+ creatureName);

          // Variable for api URL & key
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          creatureName + "&api_key=dc6zaTOxFJmzC&limit=10";
          
          // Method to retrieve data
          $.ajax({
            url: queryURL,
            method: "GET"
          })
          // Callback function 
          .done(function(response) {

            //  Creating a div to hold the sea creature
            for (var i = 0; i < seaCreature.length; i++) {
              //  Creating an element to hold the gif
              var image = $("<p>")
                .append($("<img>")
                .attr("src", response.data[i].images.fixed_height_still.url)
                .attr("data-still", response.data[i].images.fixed_height_still.url)
                .attr("data-animate", response.data[i].images.fixed_height.url)
                .attr("data-state", "still")
                );

              // Display image
              $("#creatures-view").prepend(image);

              // Variable for rating
              var rating = (response.data[i].rating);

              //Display rating
              $("#creatures-view").prepend("Rating: ", rating);

            }

            // Still and animate gif
            $(document).unbind('click').on("click", "img[src$='.gif']", function() {
              console.log("gif click");

              // Pause and unpause
              var state = $(this).attr("data-state");
              console.log(this);
              
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              if (state === "still") {
                console.log("state is animate");
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              
                // Else set src to the data-still value
              } else {
                  console.log("state is still");
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            });
          
          })

        });

      }




      // Function for displaying Sea Creatures data
      function renderButtons() {
        // Looping through the array of sea creatures
        for (var i = 0; i < seaCreature.length; i++) {
          var a = $("<button>");
          a.addClass("seaCreature");
          a.attr("data-name", seaCreature[i]);
          a.text(seaCreature[i]);
          $("#newButtons").append(a);
        }

        // Adding new creatures on click
        $("#add-creatures").on("click", function(event) {
          console.log('click to add creature');
          event.preventDefault();

          var newCreature = $("#creatures-input").val().trim();
          console.log(newCreature);

          seaCreature.push(newCreature);
          console.log(seaCreature);

          $("<button>")
            .addClass("seaCreature")
            .attr("data-name", newCreature)
            .text(newCreature)
            .appendTo("#newButtons")

            
        })

displayCreature();

      }
  
renderButtons();

