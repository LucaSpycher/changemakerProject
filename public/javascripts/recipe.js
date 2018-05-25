$(document).ready(function(){
    $("input").keyup(function(){
        if(event.code == "Enter" && this.value!=""){
            var searchterm = this.value.toLowerCase().replace(" ","+");;
            $.ajax({
                url: 'https://www.themealdb.com/api/json/v1/1/search.php?s='+searchterm,
                success: function(result){
                    $("#res").empty();
                    for(var i=0; i<result.meals.length; i++){
                        $("#res").append("<div class='result'><img src='"
                            +result.meals[i].strMealThumb
                            +"'><span><em>"
                            +result.meals[i].strMeal.toUpperCase()
                            +"</em><i>"
                            +result.meals[i].strArea
                            +"</i> Ingredients: "
                            +result.meals[i].strIngredient1+", "
                            +result.meals[i].strIngredient2+", "
                            +result.meals[i].strIngredient3
                            +"...</span></div>");
                        $("#res div:last-of-type").css("opacity",".05");
                    }
                    for(var i=0; i<result.meals.length; i++){
                        $("#res div.result:nth-child("+(i+1)+")").delay(100*i).animate({"opacity":1},200);
                    }
                    $("#res img").click(function(){
                        if(!$(this).is(".focus")){
                            $("#res img").removeClass("focus");
                            $(this).toggleClass('focus');
                            $(this).css({"top":($(window).height()-$(this).height())/2+"px",
                                "left":($(window).width()-$(this).width())/2+"px"});
                            $("body").append("<div class='shade'></div>");
                            $("nav, input[type=text], #res span, #res img:not(img.focus)").css("filter","blur(6px)");
                        }else{
                            $("#res img").removeClass("focus");
                            $(".shade").remove();
                            $("*").css("filter","none");
                            $("nav img").css("filter","brightness(100)");
                        }

                    });
                },
                error: function () {
                    $("#res").append("<div class='result error'>Error in searching</div>");
                }
            });
        }
    });
});