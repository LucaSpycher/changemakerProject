var PAGES = [["Homepage","index"],["Plan a Meal","mealplan"],["Environmental Impact","impact"],["Get Recipes","recipes"]];
var day = '';

function setupNav(n){
    $("body").prepend("<nav><a id='logo' href='index.html'><img src='public/images/globe-with-leaf.png'></a></nav>");
    for(var i=0; i<4; i++){
        $("nav").append("<a href='"+PAGES[i][1]+".html'>"+PAGES[i][0]+"</a>");
        if(n==i){
            $("nav a:last-child").addClass("current");
        }
    }
    $("nav").append("<img src='public/images/user.png' id='user'>").append("<div id='login'></div>");
    $("#login").hide();
    $("#user").click(function(){
        $("#login").fadeToggle(200);
    })
}

function setupMealPlanTable() {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var imgs = ['public/images/empty-plate.jpg']; //for now
    var html = '';
    for(var i = 0; i < 7; i++) {
        html += '<td><div class="mealDay"><img class="mealImg" src="'+ imgs[0] +'"><h4>'+ days[i] +'</h4>' +
            '<button data-day="'+ i +'" class="addMealBtn">Add Meal</button></div></td>';
    }
    $('#mealPlanTable').append(html);

    $('.addMealBtn').on('click', function () {
        $('#addMealPopUp').fadeIn();
        $('#mealsSearched').html('');
        $('#searchBox>input').val('');
        $('#mealsSelectedDiv').html('');
        $("nav, table, body>a, body>span").css("filter","blur(6px)");
        day = $(this).data('day');
    });
}

$(document).ready(function () {
    $('#addMealPopUp').hide();
    $('.closePopUp').on('click', function () {
        $("nav, table, body>a, body>span").css("filter","blur(0px)");
        $('#addMealPopUp').fadeOut();
    });
    $('#cancelMealsIcon').on('click', function () {
        $("nav, table, body>a, body>span").css("filter","blur(0px)");
        $('#addMealPopUp').fadeOut();
    });

    $('#searchBox>input').keypress(function (event) {
        if(event.which == 13) {
            if($(this).is('input:first-child')) {
                $.ajax({
                    url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + $(this).val(),
                    success: function (result) {
                        // console.log(result);
                        displayMeals(result, 0);
                    },
                    error: function () {
                        alert('Error');
                    }
                });
            } else if($(this).is('input:nth-child(4)')){
                var url = 'http://api.nal.usda.gov/ndb/search/?format=json&q=' + $(this).val() + '&sort=n&max=' + 50 + '&api_key=UbHM2FjplenJqUs7PS5TMHT56QTnQWxIdhHWbRMO';
                $.ajax({
                    url: url,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: function (result) {
                        console.log(result);
                        displayMeals(result, 1);
                    },
                    error: function () {
                        alert('Error');
                        console.log(url);
                    }
                });
            } else {
                //search for single ingredients in cameron's thing
            }
        }
    });

    $('#mealsSearched').on('click', function () {
        var html = '<ol>';
        var arr = [];
        //console.log(document.getElementsByClassName('selected')[0].innerHTML);
        for(var i = 0; i < document.getElementsByClassName('selected').length; i++) {
            html += '<li>'+ document.getElementsByClassName('selected')[i].innerHTML +'</li>';
            arr.push(document.getElementsByClassName('selected')[i].innerHTML);
        }
        html+= '</ol>';
        $('#mealsSelectedDiv').html(html);
        selected = arr;
    });

    $('#addMealsIcon').on('click', function () {
        $("nav, table, body>a, body>span").css("filter","blur(0px)");
        var arr = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
        for(var i = 0; i < document.getElementsByClassName('selected').length; i++) {
            var selector = '.selected:eq('+ i +')';
            console.log($(selector).data('meal'));
            arr[day].meals.push({api: $(selector).data('meal').split(';')[0], id: $(selector).data('meal').split(';')[1], name: document.getElementsByClassName('selected')[i].innerHTML});
        }
        displayMealsInDays();
        $('#addMealPopUp').fadeOut();
        $('.addMealBtn').on('click', function () {
            $('#addMealPopUp').fadeIn();
            $('#mealsSearched').html('');
            $('#searchBox>input').val('');
            $('#mealsSelectedDiv').html('');
            $("nav, table, body>a, body>span").css("filter","blur(6px)");
            day = $(this).data('day');
        });
    });
});

function displayMeals(obj, num) {
    var html = "";
    if (num ==1) {var meal = obj.list.item;}
    else {var meal = obj.meals;}

    if(meal == null) {
        html += 'No Results';
    } else {
        for (var i = 0; i < meal.length; i++) {
            var currentMeal = meal[i];
            var addMeal = [];
            if(num == 1) {
                addMeal = ['','<div data-meal="usda;'+ currentMeal.nbdno +'" class="mealSearchOutput unselected">' + currentMeal.name.split(', UPC')[0].split(', GTIN')[0] +'</div>'];
            } else {
                addMeal = ['<div data-meal="mealDb;'+ currentMeal.idMeal +'" class="mealSearchOutput unselected">' + currentMeal.strMeal +'</div>', ''];
            }
            html += addMeal[num];
        }
    }
    $('#mealsSearched').html(html);

    $('.mealSearchOutput').on('click', function () {
        $(this).toggleClass('selected');
        $(this).toggleClass('unselected');
    });
    // $('.unselected').on('click', function () {
    //     //add to selected array
    //     //update selected
    // });
    // $('.selected').on('click', function () {
    //     //remove from selected array
    //     //update selected
    // });
}

function displayMealsInDays() {

    var arr = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    for(var i = 0; i < arr.length; i++) {
        var html = '';
        for(var l = 0; l < arr[i].meals.length; l++) {
            var currentMeal = arr[i].meals[l];
            html += '<div>' + currentMeal.name + '</div>'
        }
        document.getElementsByClassName('mealDay')[i].innerHTML += html;
    }
}

var selected = [];

function Day() {
    this.meals = [];
    this.carbonFootprint = {};
    this.remove = function (name) {
        for(var i = 0; i < this.meals.length; i++) {
            if(name == this.meals[i].name) {
                this.meals.splice(i, 1);
            }
        }
    }
}

var monday = new Day();
var tuesday = new Day();
var wednesday = new Day();
var thursday = new Day();
var friday = new Day();
var saturday = new Day();
var sunday = new Day();