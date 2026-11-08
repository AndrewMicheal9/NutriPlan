/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import { Area, Meal, Product } from "./ui/components.js";



const allRecipes = document.getElementById("allRecipe");
const categoriesGrid = document.getElementById("categories-grid");
const recipesGrid = document.getElementById("recipes-grid");
const mealDetails = document.getElementById("meal-details");
const productsSection = document.getElementById("products-section");
const foodlogSection = document.getElementById("foodlog-section");
const mealsRecipesLink = document.getElementById("meals-recipes-link");
const productScannerLink = document.getElementById("product-scanner-link");
const foodLogLink = document.getElementById("food-log-link");
const mealAndRecipeLink = document.getElementById("mealAndRecipe");
const productCategories = document.getElementById("product-categories");
const barcodeInput = document.getElementById("barcode-input");
const searchProductBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const firstMealLink = document.getElementById("meals-recipes-link");
const foodlogDate = document.getElementById("foodlog-date");

let today = new Date()
foodlogDate.innerHTML = today.toLocaleDateString("en-US" , {
    weekday : "long" ,
    month: "short" ,
    day : "numeric"
});

mealDetails.classList.add("hidden");
productsSection.classList.add("hidden");
foodlogSection.classList.add("hidden");

mealsRecipesLink.addEventListener("click", function () {
    mealDetails.classList.add("hidden");
    productsSection.classList.add("hidden");
    foodlogSection.classList.add("hidden");
    mealAndRecipeLink.classList.remove("hidden");
    productScannerLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    foodLogLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    firstMealLink.firstElementChild.classList.add("bg-emerald-50" ,"text-emerald-700")

   
})

productScannerLink.addEventListener("click", function () {
    mealDetails.classList.add("hidden");
    mealAndRecipeLink.classList.add("hidden");
    foodlogSection.classList.add("hidden");
    mealAndRecipeLink.classList.add("hidden");
    firstMealLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    foodLogLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    productScannerLink.firstElementChild.classList.add("bg-emerald-50" ,"text-emerald-700")
    productsSection.classList.remove("hidden");
})

foodLogLink.addEventListener("click" , function() {
      mealDetails.classList.add("hidden");
    mealAndRecipeLink.classList.add("hidden");
    mealAndRecipeLink.classList.add("hidden");
    firstMealLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    productScannerLink.firstElementChild.classList.remove("bg-emerald-50" ,"text-emerald-700")
    productsSection.classList.add("hidden");
    foodlogSection.classList.remove("hidden");
    foodLogLink.firstElementChild.classList.add("bg-emerald-50" ,"text-emerald-700")
})


let areas = new Area();
areas.getAllAreas(allRecipes);

let meals = new Meal();
meals.displayAllMealsType(categoriesGrid);
meals.getAllMeals(recipesGrid);

let productCategoriesInstance = new Product();
productCategoriesInstance.setCategory("Snacks");
productCategoriesInstance.getAllProductsCategories(productCategories);

productCategoriesInstance.getProductCategory(productCategoriesInstance.getCategory().toLowerCase());

barcodeInput.oninput = function () {
    if (this.value == "") {
        productCategoriesInstance.getProductCategory();
        return;
    }
    productCategoriesInstance.setBarcode(this.value);
    productCategoriesInstance.getProductByBarcode();
}

searchProductBtn.addEventListener("click" , function() {
    productCategoriesInstance.getProductBySearch(productSearchInput.value);
})