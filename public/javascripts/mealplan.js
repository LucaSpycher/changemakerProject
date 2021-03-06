var day = '';
var monday = new Day();
var tuesday = new Day();
var wednesday = new Day();
var thursday = new Day();
var friday = new Day();
var saturday = new Day();
var sunday = new Day();
var selected = [];

function setupMealPlanTable() {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var imgs = ['public/images/empty-plate.jpg']; //in case you want different images for each day
    var html = '';
    for(var i = 0; i < 7; i++) {
        html += '<td><div class="mealDay"><img class="mealImg" src="'+ imgs[0] +'"><h4>'+ days[i] +'</h4>' +
            '<div></div><button data-day="'+ i +'" class="addMealBtn">Add Meal</button></div></td>';
    }
    $('#mealPlanTable').append(html);

    $('.addMealBtn').on('click', function () {
        $('#addMealPopUp').fadeIn();
        $('#mealsSearched').html('');
        $('#searchBox>input').val('');
        $('#mealsSelectedDiv').html('');
        $("nav, table, body>a, body>span, body>button").css("filter","blur(6px)");
        day = $(this).data('day');
    });
}

function mealplanReady() {
    $('#addMealPopUp').hide();
    $('.closePopUp').on('click', function () {
        $("nav, table, body>a, body>span, body>button").css("filter","blur(0px)");
        $('#addMealPopUp').fadeOut();
    });
    $('#cancelMealsIcon').on('click', function () {
        $("nav, table, body>a, body>span, body>button").css("filter","blur(0px)");
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
                var url = 'http://api.nal.usda.gov/ndb/search/?format=json&q=' + $(this).val() + '&sort=n&max=50&api_key=UbHM2FjplenJqUs7PS5TMHT56QTnQWxIdhHWbRMO';
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
            $(this).val('');
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
        $("nav, table, body>a, body>span, body>button").css("filter","blur(0px)");
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
            $("nav, table, body>a, body>span, body>button").css("filter","blur(6px)");
            day = $(this).data('day');
        });
    });


    $('#removeMealBtn').on('click', function () {
        var arr = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
        for(var i = 0; i < document.getElementsByClassName('selectedRemove').length; i++) {
            var selector = '.selectedRemove:eq(' + i +')';
            arr[$(selector).parent('div').parent('div').find('button').data('day')].remove($(selector).html());
        }
        displayMealsInDays();
    });
}

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
                addMeal = ['','<div data-meal="usda;'+ currentMeal.ndbno +'" class="mealSearchOutput unselected">' + currentMeal.name.split(', UPC')[0].split(', GTIN')[0] +'</div>'];
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


var imgArray = [];

function displayMealsInDays() {
    var arr = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    for(var i = 0; i < arr.length; i++) {
        var html = '';
        var img = false;
        var day = i;
        for(var l = 0; l < arr[i].meals.length; l++) {
            var currentMeal = arr[i].meals[l];
            html += '<div class="mealName">' + currentMeal.name + '</div>'
        }
        if(arr[i].meals.length != 0) {
            var selector = '.mealDay:eq(' + i +')>img';
            $(selector).attr('src', 'public/images/fullplate.jpg')
        } else {
            var selector = '.mealDay:eq(' + i +')>img';
            $(selector).attr('src', 'public/images/empty-plate.jpg');
        }
        var selector = '.mealDay:eq(' + i + ')>div';
        $(selector).html(html);
    }
    $('.mealName').on('click', function () {
        $(this).toggleClass('selectedRemove');
    });
    saveMeal();
}
