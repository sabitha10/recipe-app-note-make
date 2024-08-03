document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipeName = document.getElementById('recipeName');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const recipeInstructions = document.getElementById('recipeInstructions');
    const recipeRating = document.getElementById('recipeRating');
    const recipesDiv = document.getElementById('recipes');
    const searchInput = document.getElementById('searchInput');

    recipeForm.addEventListener('submit', addRecipe);
    recipesDiv.addEventListener('click', deleteRecipe);
    searchInput.addEventListener('input', filterRecipes);

    function addRecipe(e) {
        e.preventDefault();

        const name = recipeName.value;
        const ingredients = recipeIngredients.value;
        const instructions = recipeInstructions.value;
        const rating = recipeRating.value;

        const recipe = {
            name,
            ingredients,
            instructions,
            rating
        };

        let recipes = getRecipesFromLocalStorage();
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        displayRecipes();

        recipeForm.reset();
    }

    function deleteRecipe(e) {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            let recipes = getRecipesFromLocalStorage();
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            displayRecipes();
        }
    }

    function displayRecipes() {
        let recipes = getRecipesFromLocalStorage();
        recipesDiv.innerHTML = '';

        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            const recipeTitle = document.createElement('h2');
            recipeTitle.textContent = recipe.name;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.textContent = `Ingredients: ${recipe.ingredients}`;

            const recipeInstructions = document.createElement('p');
            recipeInstructions.textContent = `Instructions: ${recipe.instructions}`;

            const recipeRating = document.createElement('p');
            recipeRating.innerHTML = `Rating: ${'⭐'.repeat(recipe.rating)}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('data-index', index);

            recipeDiv.appendChild(recipeTitle);
            recipeDiv.appendChild(recipeIngredients);
            recipeDiv.appendChild(recipeInstructions);
            recipeDiv.appendChild(recipeRating);
            recipeDiv.appendChild(deleteButton);

            recipesDiv.appendChild(recipeDiv);
        });
    }

    function filterRecipes() {
        const searchValue = searchInput.value.toLowerCase();
        const recipes = document.querySelectorAll('.recipe');
        recipes.forEach(recipe => {
            const title = recipe.querySelector('h2').textContent.toLowerCase();
            if (title.includes(searchValue)) {
                recipe.style.display = 'block';
            } else {
                recipe.style.display = 'none';
            }
        });
    }

    function getRecipesFromLocalStorage() {
        let recipes;
        if (localStorage.getItem('recipes') === null) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }
        return recipes;
    }

    displayRecipes();
});
