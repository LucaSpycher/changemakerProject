$(document).ready(function(){
    $("input").keyup(function(){
        if(event.code == "Enter" && this.value!=""){
            $(".result").remove();
            var searchterm = this.value.toLowerCase().replace(" ","+");;
            $.ajax({
                url: 'https://www.themealdb.com/api/json/v1/1/search.php?s='+searchterm,
                success: function(result){
                    console.log(result);
                    for(var i=0; i<result.meals.length; i++){
                        console.log(result[i]);
                        $("body").append("<div class='result'><img src='"+result.meals[i].strMealThumb+"'>"+result.meals[i].strMeal.toUpperCase()+"</div>");
                    }
                },
                error: function () {
                    $("body").append("<div class='result error'>Error in searching</div>");
                }
            });
        }
    });
});