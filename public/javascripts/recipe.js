$(document).ready(function(){
    $("input").keyup(function(){
        if(event.code == "Enter" && this.value!=""){
            var searchterm = this.value.toLowerCase().replace(" ","+");;
            $.ajax({
                url: 'https://www.themealdb.com/api/json/v1/1/search.php?s='+searchterm,
                success: function(result){
                    $("#res").empty().append("<img src='public/images/Rolling.gif'>");
                    console.log(result);
                    for(var i=0; i<result.meals.length; i++){
                        console.log(result[i]);
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
                        $("#res div:last-of-type").toggle();
                    }
                    for(var i=0; i<result.meals.length; i++){
                        $("#res div.result:nth-child("+(i+1)+")").delay(100*i).fadeToggle(200);
                    }
                    $("#res > img").slideToggle(200);
                },
                error: function () {
                    $("#res").append("<div class='result error'>Error in searching</div>");
                }
            });
        }
    });
});