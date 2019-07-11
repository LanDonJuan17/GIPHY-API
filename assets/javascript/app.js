$(document).ready(function () {

    var topic = ["It's Always Sunny in Philadelphia", "Game of Thrones", "Last Week Tonight", "Rick and Morty", "Bob's Burgers", "The Office", "Parks & Recreation", "Letterkenny"];



    function createShowBtns() {
        $("#gifBtns").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("show");
            gifBtn.addClass("btn btn-primary")
            gifBtn.attr("data-name", topic[i]);
            gifBtn.text(topic[i]);
            $("#gifBtns").append(gifBtn);
        }
    }



    function addNewBtn() {
        $("#addGif").on("click", function () {
            var show = $("#textInput").val().trim();
            if (show == "") {
                return false;
            }
            topic.push(show);

            createShowBtns();
            return false;
        });
    }


    function removeLastBtn() {
        $("removeGif").on("click", function () {
            topic.pop(show);

            createShowBtns();
            return false;
        });
    }





    function displayGifs() {
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=lbz4p2rvwHS0IhiaxWWEbVSfOfSINOb0" + "&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                $("#gifsView").empty();

                var results = response.data;
                if (results == "") {
                    alert("Try searching for a different show!");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div1>");

                    var gifRating = $("<p>").text("Rating " + results[i].rating);
                    gifDiv.append(gifRating);


                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                    gifImage.addClass("image");
                    gifImage.attr("data-state", "still");

                    gifDiv.append(gifImage);

                    $("#gifsView").prepend(gifDiv);
                }
            });
    }



    createShowBtns();
    addNewBtn();
    removeLastBtn();





    $(document).on("click", ".show", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});

