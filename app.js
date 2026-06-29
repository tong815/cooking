// These are the ingredients the player can collect from the farm.
const ingredients = [
  { name: "Tomato", icon: "T" },
  { name: "Potato", icon: "P" },
  { name: "Carrot", icon: "C" },
  { name: "Egg", icon: "E" },
  { name: "Mushroom", icon: "M" },
  { name: "Fish", icon: "F" }
];

// Each recipe uses a sorted key, so ingredient order does not matter.
const recipes = [
  {
    key: "Egg+Tomato",
    dish: "Tomato Egg Dish",
    ingredients: ["Tomato", "Egg"]
  },
  {
    key: "Carrot+Potato",
    dish: "Vegetable Stew",
    ingredients: ["Potato", "Carrot"]
  },
  {
    key: "Fish+Mushroom",
    dish: "Mushroom Fish Soup",
    ingredients: ["Mushroom", "Fish"]
  },
  {
    key: "Carrot+Potato+Tomato",
    dish: "Farm Soup",
    ingredients: ["Tomato", "Potato", "Carrot"]
  }
];

const ingredientGrid = document.querySelector("#ingredientGrid");
const potList = document.querySelector("#potList");
const emptyPotMessage = document.querySelector("#emptyPotMessage");
const cookButton = document.querySelector("#cookButton");
const clearButton = document.querySelector("#clearButton");
const dishName = document.querySelector("#dishName");
const dishExplanation = document.querySelector("#dishExplanation");
const recipeBookList = document.querySelector("#recipeBookList");

let potIngredients = [];
let discoveredRecipes = [];

function makeRecipeKey(items) {
  return [...items].sort().join("+");
}

function findRecipe(items) {
  const recipeKey = makeRecipeKey(items);
  return recipes.find(recipe => recipe.key === recipeKey);
}

function showFarmIngredients() {
  ingredients.forEach(ingredient => {
    const button = document.createElement("button");
    button.className = "ingredient-card";
    button.type = "button";
    button.innerHTML = `
      <span class="ingredient-icon">${ingredient.icon}</span>
      <span>${ingredient.name}</span>
    `;

    button.addEventListener("click", () => {
      addIngredientToPot(ingredient.name);
    });

    ingredientGrid.appendChild(button);
  });
}

function addIngredientToPot(ingredientName) {
  potIngredients.push(ingredientName);
  updatePot();
}

function updatePot() {
  potList.innerHTML = "";
  emptyPotMessage.hidden = potIngredients.length > 0;

  potIngredients.forEach(ingredientName => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredientName;
    potList.appendChild(listItem);
  });
}

function cookDish() {
  if (potIngredients.length === 0) {
    dishName.textContent = "No dish yet";
    dishExplanation.textContent = "Add ingredients to the pot before cooking.";
    return;
  }

  const recipe = findRecipe(potIngredients);

  if (recipe) {
    dishName.textContent = recipe.dish;
    dishExplanation.textContent = `${recipe.ingredients.join(" + ")} made ${recipe.dish}.`;
    addDiscoveredRecipe(recipe);
  } else {
    dishName.textContent = "Mystery Food";
    dishExplanation.textContent = `${potIngredients.join(" + ")} made Mystery Food.`;
  }
}

function addDiscoveredRecipe(recipe) {
  const alreadyDiscovered = discoveredRecipes.includes(recipe.dish);

  if (!alreadyDiscovered) {
    discoveredRecipes.push(recipe.dish);
    updateRecipeBook();
  }
}

function updateRecipeBook() {
  recipeBookList.innerHTML = "";

  discoveredRecipes.forEach(dish => {
    const recipe = recipes.find(item => item.dish === dish);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${recipe.dish}
      <span>${recipe.ingredients.join(" + ")}</span>
    `;
    recipeBookList.appendChild(listItem);
  });
}

function clearPot() {
  potIngredients = [];
  updatePot();
  dishName.textContent = "No dish yet";
  dishExplanation.textContent = "Add ingredients, then press Cook.";
}

cookButton.addEventListener("click", cookDish);
clearButton.addEventListener("click", clearPot);

showFarmIngredients();
updatePot();
