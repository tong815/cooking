// All ingredient cards come from this list.
// Flavor ingredients are special because they change a dish after it is found.
const ingredients = [
  { name: "Tomato", icon: "T", type: "food" },
  { name: "Potato", icon: "P", type: "food" },
  { name: "Carrot", icon: "C", type: "food" },
  { name: "Onion", icon: "O", type: "food" },
  { name: "Egg", icon: "E", type: "food" },
  { name: "Mushroom", icon: "M", type: "food" },
  { name: "Fish", icon: "F", type: "food" },
  { name: "Beef", icon: "B", type: "food" },
  { name: "Chicken", icon: "Ck", type: "food" },
  { name: "Milk", icon: "Mi", type: "food" },
  { name: "Apple", icon: "A", type: "food" },
  { name: "Banana", icon: "Ba", type: "food" },
  { name: "Chocolate", icon: "Ch", type: "food" },
  { name: "Salt", icon: "Sa", type: "flavor", prefix: "Salty" },
  { name: "Sugar", icon: "Su", type: "flavor", prefix: "Sweet" },
  { name: "Herbs", icon: "H", type: "flavor", prefix: "Fresh" }
];

// Recipes are data. To add a recipe, add one object to this array.
// The player can click ingredients in any order because the code sorts them.
const recipes = [
  { dish: "Tomato Salad", ingredients: ["Tomato"], image: "TS", category: "Vegetables" },
  { dish: "Chips", ingredients: ["Potato"], image: "CH", category: "Vegetables" },
  { dish: "Apple Slices", ingredients: ["Apple"], image: "AS", category: "Vegetables" },
  { dish: "Banana Snack", ingredients: ["Banana"], image: "BS", category: "Vegetables" },
  { dish: "Roasted Mushroom", ingredients: ["Mushroom"], image: "RM", category: "Vegetables" },
  { dish: "Roasted Carrots", ingredients: ["Carrot"], image: "RC", category: "Vegetables" },
  { dish: "Onion Rings", ingredients: ["Onion"], image: "OR", category: "Vegetables" },
  { dish: "Vegetable Salad", ingredients: ["Tomato", "Carrot"], image: "VS", category: "Vegetables" },
  { dish: "Fries", ingredients: ["Tomato", "Potato"], image: "FR", category: "Vegetables" },
  { dish: "Vegetable Stew", ingredients: ["Potato", "Carrot"], image: "VS", category: "Vegetables" },
  { dish: "Garden Soup", ingredients: ["Carrot", "Onion"], image: "GS", category: "Vegetables" },
  { dish: "Farm Soup", ingredients: ["Tomato", "Potato", "Carrot"], image: "FS", category: "Vegetables" },
  { dish: "Rainbow Stew", ingredients: ["Tomato", "Carrot", "Onion"], image: "RS", category: "Vegetables" },

  { dish: "Fried Egg", ingredients: ["Egg"], image: "FE", category: "Eggs" },
  { dish: "Omelette", ingredients: ["Egg", "Milk"], image: "OM", category: "Eggs" },
  { dish: "Tomato Eggs", ingredients: ["Tomato", "Egg"], image: "TE", category: "Eggs" },
  { dish: "Mushroom Omelette", ingredients: ["Mushroom", "Egg"], image: "MO", category: "Eggs" },
  { dish: "Breakfast Plate", ingredients: ["Egg", "Potato"], image: "BP", category: "Eggs" },
  { dish: "Farm Omelette", ingredients: ["Egg", "Milk", "Onion"], image: "FO", category: "Eggs" },

  { dish: "Grilled Fish", ingredients: ["Fish"], image: "GF", category: "Meat" },
  { dish: "Grilled Beef", ingredients: ["Beef"], image: "GB", category: "Meat" },
  { dish: "Roast Chicken", ingredients: ["Chicken"], image: "RC", category: "Meat" },
  { dish: "Beef Stew", ingredients: ["Beef", "Potato"], image: "BS", category: "Meat" },
  { dish: "Chicken Stew", ingredients: ["Chicken", "Potato"], image: "CS", category: "Meat" },
  { dish: "Chicken Mushroom Soup", ingredients: ["Chicken", "Mushroom"], image: "CMS", category: "Meat" },
  { dish: "Mushroom Fish Soup", ingredients: ["Fish", "Mushroom"], image: "MFS", category: "Meat" },
  { dish: "Herb Fish", ingredients: ["Fish", "Herbs"], image: "HF", category: "Meat", useFlavorAsFood: true },
  { dish: "Beef Skillet", ingredients: ["Beef", "Onion"], image: "BK", category: "Meat" },
  { dish: "Chicken Dinner", ingredients: ["Chicken", "Carrot"], image: "CD", category: "Meat" },

  { dish: "Glass of Milk", ingredients: ["Milk"], image: "GM", category: "Desserts" },
  { dish: "Chocolate Bite", ingredients: ["Chocolate"], image: "CB", category: "Desserts" },
  { dish: "Banana Smoothie", ingredients: ["Milk", "Banana"], image: "SM", category: "Desserts" },
  { dish: "Apple Smoothie", ingredients: ["Milk", "Apple"], image: "AS", category: "Desserts" },
  { dish: "Chocolate Milk", ingredients: ["Milk", "Chocolate"], image: "CM", category: "Desserts" },
  { dish: "Hot Chocolate", ingredients: ["Chocolate", "Milk", "Sugar"], image: "HC", category: "Desserts", useFlavorAsFood: true },
  { dish: "Candy Apple", ingredients: ["Apple", "Sugar"], image: "CA", category: "Desserts", useFlavorAsFood: true },
  { dish: "Chocolate Banana", ingredients: ["Banana", "Chocolate"], image: "CB", category: "Desserts" },
  { dish: "Fruit Salad", ingredients: ["Banana", "Apple"], image: "FS", category: "Desserts" },
  { dish: "Fruit Smoothie", ingredients: ["Banana", "Apple", "Milk"], image: "FM", category: "Desserts" }
];

// Prefixes are added to the front of the dish name.
// This order makes Salt + Herbs become "Fresh Salty ...".
const flavorOrder = ["Salt", "Sugar", "Herbs"];
const flavorNames = ingredients
  .filter(ingredient => ingredient.type === "flavor")
  .map(ingredient => ingredient.name);

const recipesByKey = new Map();
recipes.forEach(recipe => {
  recipe.key = makeRecipeKey(recipe.ingredients);
  recipesByKey.set(recipe.key, recipe);
});

const ingredientGrid = document.querySelector("#ingredientGrid");
const potList = document.querySelector("#potList");
const emptyPotMessage = document.querySelector("#emptyPotMessage");
const cookButton = document.querySelector("#cookButton");
const clearButton = document.querySelector("#clearButton");
const dishImage = document.querySelector("#dishImage");
const dishName = document.querySelector("#dishName");
const dishExplanation = document.querySelector("#dishExplanation");
const recipeCount = document.querySelector("#recipeCount");
const recipeBookList = document.querySelector("#recipeBookList");

let potIngredients = [];
let discoveredRecipeKeys = [];

function makeRecipeKey(items) {
  return [...items].sort().join("+");
}

function isFlavorIngredient(ingredientName) {
  return flavorNames.includes(ingredientName);
}

function splitPotIngredients(items) {
  return {
    baseIngredients: items.filter(item => !isFlavorIngredient(item)),
    flavorIngredients: items.filter(item => isFlavorIngredient(item))
  };
}

function findRecipe(items) {
  return recipesByKey.get(makeRecipeKey(items));
}

function applyFlavorPrefixes(dish, flavors) {
  let flavoredDish = dish;

  flavorOrder.forEach(flavorName => {
    if (flavors.includes(flavorName)) {
      const ingredient = ingredients.find(item => item.name === flavorName);
      flavoredDish = `${ingredient.prefix} ${flavoredDish}`;
    }
  });

  return flavoredDish;
}

function showFarmIngredients() {
  ingredients.forEach(ingredient => {
    const button = document.createElement("button");
    button.className = `ingredient-card ${ingredient.type === "flavor" ? "flavor-card" : ""}`;
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

    if (isFlavorIngredient(ingredientName)) {
      listItem.className = "flavor-chip";
    }

    potList.appendChild(listItem);
  });
}

function cookDish() {
  if (potIngredients.length === 0) {
    showResult("?", "No dish yet", "Add ingredients to the pot before cooking.");
    return;
  }

  const potParts = splitPotIngredients(potIngredients);
  const specialRecipe = findSpecialRecipe(potIngredients);
  const recipe = specialRecipe || findRecipe(potParts.baseIngredients);

  if (!recipe) {
    showMysteryFood(potParts);
    return;
  }

  const flavorsToApply = specialRecipe ? [] : potParts.flavorIngredients;
  const finalDishName = applyFlavorPrefixes(recipe.dish, flavorsToApply);
  const baseText = recipe.ingredients.join(" + ");
  const flavorText = flavorsToApply.length > 0
    ? ` with ${flavorsToApply.join(" + ")}`
    : "";

  showResult(recipe.image, finalDishName, `${baseText}${flavorText} made ${finalDishName}.`);
  unlockRecipe(recipe);
}

function showMysteryFood(potParts) {
  const onlyFlavors = potParts.baseIngredients.length === 0 && potParts.flavorIngredients.length > 0;

  if (onlyFlavors) {
    showResult("?", "Mystery Food", "Flavor ingredients need a food recipe to change.");
    return;
  }

  showResult("?", "Mystery Food", `${potIngredients.join(" + ")} made Mystery Food.`);
}

function findSpecialRecipe(items) {
  const recipeKey = makeRecipeKey(items);
  return recipes.find(recipe => recipe.useFlavorAsFood && recipe.key === recipeKey);
}

function showResult(imageText, name, explanation) {
  dishImage.textContent = imageText;
  dishName.textContent = name;
  dishExplanation.textContent = explanation;
}

function unlockRecipe(recipe) {
  if (!discoveredRecipeKeys.includes(recipe.key)) {
    discoveredRecipeKeys.push(recipe.key);
    updateRecipeBook();
  }
}

function updateRecipeBook() {
  recipeBookList.innerHTML = "";
  recipeCount.textContent = `Discovered ${discoveredRecipeKeys.length} / ${recipes.length} Recipes`;

  discoveredRecipeKeys.forEach(recipeKey => {
    const recipe = recipesByKey.get(recipeKey);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${recipe.dish}
      <span>${recipe.category}: ${recipe.ingredients.join(" + ")}</span>
    `;
    recipeBookList.appendChild(listItem);
  });
}

function clearPot() {
  potIngredients = [];
  updatePot();
  showResult("?", "No dish yet", "Add ingredients, then press Cook.");
}

cookButton.addEventListener("click", cookDish);
clearButton.addEventListener("click", clearPot);

showFarmIngredients();
updatePot();
updateRecipeBook();
