function searchBrandedFoods(food, maxEntries) {
    var url = 'http://api.nal.usda.gov/ndb/search/?format=json&q=' + food + '&sort=n&max=' + maxEntries + '&api_key=UbHM2FjplenJqUs7PS5TMHT56QTnQWxIdhHWbRMO';
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (result) {
            console.log(result);
        },
        error: function () {
            alert('Error');
            console.log(url);
        }
    });
}

//api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY

function searchMealsByName(name) {
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + name,
        success: function (result) {
            console.log(result);
        },
        error: function () {
            alert('Error');
        }
    });
}

// function getMealDetails(id) {
//     $.ajax({
//         url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id,
//         success: function (result) {
//             console.log(result);
//         },
//         error: function () {
//             alert('Error');
//         }
//     });
// }

//https://www.themealdb.com/api.php