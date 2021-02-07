const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const recipeBtn = document.getElementById('recipe-btn');
const mealDetails = document.getElementById('meal-details');
const mealResult = document.getElementById('meal-result')

searchBtn.addEventListener('click',getMealList);


function getMealList() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+searchInput.value)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" id = "recipe-btn" onClick="getRecipe('${meal.strMeal}')">Get Recipe</a>
                        </div>

                    </div>
              `
            });
        }else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
    searchInput.value = "";
}

const getRecipe = mealName => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+mealName;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        mealResult.style.display = 'none';
        searchBtn.style.display = 'none';
        searchInput.style.display = 'none';
        // console.log(data);
        // console.log(data.meals[0].strIngredient1+" "+data.meals[0].strMeasure1);
        // console.log(data.meals[0].strIngredient2+" "+data.meals[0].strMeasure2);
        let html = "";
        html +=
        `<img src = "${data.meals[0].strMealThumb}" alt = "food">
        <h3>${data.meals[0].strMeal}</h3>
        <h4>Ingredients</h4>
        <ul>
            <li>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</li>
            <li>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</li>
            <li>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</li>
            <li>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</li>
            <li>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</li>
            <li>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</li>
            <li>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</li>
            <li>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</li>
            <li>${data.meals[0].strMeasure9} ${data.meals[0].strIngredient9}</li>
            <li>${data.meals[0].strMeasure10} ${data.meals[0].strIngredient10}</li>
        </ul>
        `
        mealDetails.innerHTML = html;
    });
}