
values = [
    {
        "Name": "lamb",
        "kilo": 25
    },
    {
        "Name": "beef",
        "kilo": 17.8
    },
    {
        "Name": "cheese",
        "kilo": 9.8
    },
    {
        "Name": "pork",
        "kilo": 5.6
    },
    {
        "Name": "turkey",
        "kilo": 4.6
    },
    {
        "Name": "chicken",
        "kilo": 4
    },
    {
        "Name": "tuna",
        "kilo": 3.7
    },
    {
        "Name": "eggs",
        "kilo": 2
    },
    {
        "Name": "potatoes",
        "kilo": 0.53
    },
    {
        "Name": "rice",
        "kilo": 2.4
    },
    {
        "Name": "nuts",
        "kilo": 1.7
    },
    {
        "Name": "beans",
        "kilo": 1
    },
    {
        "Name": "vegetables",
        "kilo": 2
    },
    {
        "Name": "milk",
        "kilo": 1.9
    },
    {
        "Name": "fruit",
        "kilo": 1.1
    },
    {
        "Name": "lentils",
        "kilo": 0.9
    },
    {
        "Name": "olive oil",
        "kilo": 9.6
    },
    {
        "Name": "pasta",
        "kilo": 2.8
    },
    {
        "Name": "butter",
        "kilo": 16.8
    },
    {
        "Name": "bread",
        "kilo": 1.7
    },
    {
        "Name": "sugar",
        "kilo": 4.15
    },
    {
        "Name": "flour",
        "kilo": 0.85
    },
    {
        "Name": "chocolate",
        "kilo": 0.43
    },
    {
        "Name": "vegetable oil",
        "kilo": 1.9
    },
    {
        "Name": "onion",
        "kilo": 0.5
    },
    {
        "Name": "almond",
        "kilo": 2.1
    },
    {
        "Name": "pecans",
        "kilo": 1.8
    },
    {
        "Name": "pistachios",
        "kilo": 1.3
    },
    {
        "Name": "walnuts",
        "kilo": 0.95
    },
    {
        "Name": "artichoke",
        "kilo": 0.46
    },
    {
        "Name": "green beans",
        "kilo": 0.66
    },
    {
        "Name": "broccolli",
        "kilo": 0.56
    },
    {
        "Name": "brussel sprouts",
        "kilo": 0.56
    },
    {
        "Name": "cabbage",
        "kilo": 0.32
    },
    {
        "Name": "cucumber",
        "kilo": 0.34
    },
    {
        "Name": "eggplants",
        "kilo": 0.71
    },
    {
        "Name": "garlic",
        "kilo": 1.15
    },
    {
        "Name": "lettuce",
        "kilo": 0.4
    },
    {
        "Name": "beer",
        "kilo": 0.58
    },
    {
        "Name": "yogurt",
        "kilo": 1.1
    },
    {
        "Name": "cauliflower",
        "kilo": 0.56
    },
    {
        "Name": "tofu",
        "kilo": 1
    }
];

function object(name) {
    var food= '';
    for(var i = 0; i < values.length; i++){
        if(name = values[i].Name){
            food.append(values[i].kilo);
            return food;
        }
    }
}
function ingredients(result,day) {
    var ingredient = [];
    for(var i = 0; i < 20; i++){
        if(result.strIngredient + i === ""){
            break
        } else {
            ingredient.push(result.strIngredient + i)
        }
    }quantity(ingredient,day)
}
function quantity(ingredients,day) {
    var quantity = [];
    for(var z = 0; z < ingredients.length; z++){
        quantity.push(result.strMeasure + z)
    }
    quantity_convert(quantity, ingredients,day);
}
function quantity_convert(quantity, ingredients,day){
    for(var i = 0; i < quantity.length; i++){
       if(quantity[i].strMeasure[-1] === "g" ){
           quantity[i].strMeasure[-1] = "";
       }
    }total(ingredients,quantity,day)
}
//here
function total(ingredients, quantity, day) {
    var values = [];
    var total = 0;
    for(var i = 0; i < ingredients.length; i++) {
        values.push(object(ingredients[i]));
        values[i] = values[i] * (quantity[i] * .001);
        total = values[i] + total;
    }
    day.carbonFootprint += total
}
//salt and pepper none
