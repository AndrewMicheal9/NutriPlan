//  =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

import baseURL from "../baseurl.js";





//  =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/

class UI {
  constructor() {
    const mealDetails = document.getElementById("meal-details");
    mealDetails.classList.add("hidden");
  }
  showLoadingSpinner(element) {
    let spinner = `<div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>`
    element.innerHTML = spinner;
  }

  showEmptyState(element) {
    let emptyState = `<div class="flex flex-col items-center justify-center py-12 text-center">
                            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                            </div>
                            <p class="text-gray-500 text-lg">No recipes found</p>
                            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
                        </div>`
    element.innerHTML = emptyState;
  }

  hideLoadingSpinner(element) {
    let spinner = `<div class="hidden items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>`
    element.innerHTML = spinner;
  }
}

class Area extends UI {
  getAreaSelected;
  constructor() {
    super();
    this.getAreaSelected = "";
  }
  async getAllAreas(element) {
    let areas = await fetch(`${baseURL}/meals/areas`);
    this.showLoadingSpinner(element);
    let data = await areas.json();
    this.hideLoadingSpinner(element);
    this.displayAreas(data.results.slice(0, 11), element);
  }
  displayAreas(areas, element) {
    element.innerHTML = "";
    for (let i = 0; i < areas.length; i++) {
      const button = document.createElement("button");
      button.className = "areasbtn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all";
      button.textContent = areas[i].name;
      element.appendChild(button);
    }

    document.querySelectorAll('.areasbtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let area = e.target.innerText;
        this.filterByArea(area);
      })
    });

  }
  async filterByArea(area) {
    let meals = await fetch(`${baseURL}/meals/filter?area=${area}`);
    this.showLoadingSpinner(document.getElementById("recipes-grid"));
    let data = await meals.json();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.hideLoadingSpinner(document.getElementById("recipes-grid"));
    this.displayMeals(data.results, document.getElementById("recipes-grid"));
  }

  displayMeals(meals, element) {
    if (meals.length == 0) {
      this.showEmptyState(element);
      return;
    }
    let mealsList = ``;
    for (let i = 0; i < meals.length; i++) {
      mealsList += `  <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id=${meals[i].id}>
                                <div class="relative h-48 overflow-hidden">
                                    <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        src="${meals[i].thumbnail}"
                                        alt="${meals[i].name}"
                                        loading="lazy"  />
                                                   
                                <div class="absolute bottom-3 left-3 flex gap-2">
                                    <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                                        ${meals[i].category}
                                    </span>
                                    <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                                        ${meals[i].area}
                                    </span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                    ${meals[i].name}
                                </h3>
                                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                                    ${meals[i].instructions[0]}
                                </p>
                                <div class="flex items-center justify-between text-xs">
                                <span class="font-semibold text-gray-900">
                                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                                    ${meals[i].category}
                                </span>
                                <span class="font-semibold text-gray-500">
                                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                                    ${meals[i].area}
                                </span>
                                </div>
                            </div>
            </div>`;
    }
    element.innerHTML = mealsList;
  }
}


class Meal extends UI {

  async displayAllMealsType(element) {
    let meals = await fetch(`${baseURL}/meals/categories`);
    this.showLoadingSpinner(element);
    let data = await meals.json();
    this.hideLoadingSpinner(element);
    this.displayMealsTypes(data.results, element);
  }

  displayMealsTypes(meals, element) {
    let mealsList = ``;
    for (let i = 0; i < meals.length; i++) {
      mealsList += `<div class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group" data-category= "${meals[i].name}">
                                <div class="flex items-center gap-2.5">
                                    <div class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                        <i class="fa-solid fa-drumstick-bite"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-gray-900">${meals[i].name}</h3>
                                    </div>
                                </div>
                         </div>`;
    }
    element.innerHTML = mealsList;

      document.querySelectorAll('.category-card').forEach(item => {
      item.addEventListener('click', (e) => {
        let product = e.target.innerText;
        console.log(product);
        this.getCategoryMeals(product);
      })
    });
  }

  async getCategoryMeals(product) {
    let data = await fetch(`${baseURL}/meals/filter?category=${product}`);
    this.showLoadingSpinner(document.getElementById("recipes-grid"));
    let resp = await data.json();
    this.filterCategoryMeals(resp.results , document.getElementById("recipes-grid"))
  }

  filterCategoryMeals(meals , element) {
    element.innerHTML = "";

    for (let i = 0; i < meals.length; i++) {

      const card = document.createElement("div");

      card.className = "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";

      card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="${meals[i].thumbnail}"
                    alt="${meals[i].name}"
                    loading="lazy" />

                <div class="absolute bottom-3 left-3 flex gap-2">
                    <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                        ${meals[i].category}
                    </span>

                    <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                        ${meals[i].area}
                    </span>
                </div>
            </div>

            <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    ${meals[i].name}
                </h3>

                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                    ${meals[i].instructions[0]}
                </p>

                <div class="flex items-center justify-between text-xs">
                    <span class="font-semibold text-gray-900">
                        <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                        ${meals[i].category}
                    </span>

                    <span class="font-semibold text-gray-500">
                        <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                        ${meals[i].area}
                    </span>
                </div>
            </div>`;

      card.addEventListener("click", () => {
        this.showMealDetails(meals[i]);
      });

      element.appendChild(card);
    }
  }

  async getAllMeals(element) {
    let meals = await fetch(`${baseURL}/meals/random?count=25`);
    this.showLoadingSpinner(element);
    let data = await meals.json();
    this.hideLoadingSpinner(element);
    this.displayAllMeals(data.results, element);
  }

  displayAllMeals(meals, element) {
    element.innerHTML = "";

    for (let i = 0; i < meals.length; i++) {

      const card = document.createElement("div");

      card.className = "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";

      card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="${meals[i].thumbnail}"
                    alt="${meals[i].name}"
                    loading="lazy" />

                <div class="absolute bottom-3 left-3 flex gap-2">
                    <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                        ${meals[i].category}
                    </span>

                    <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                        ${meals[i].area}
                    </span>
                </div>
            </div>

            <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    ${meals[i].name}
                </h3>

                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                    ${meals[i].instructions[0]}
                </p>

                <div class="flex items-center justify-between text-xs">
                    <span class="font-semibold text-gray-900">
                        <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                        ${meals[i].category}
                    </span>

                    <span class="font-semibold text-gray-500">
                        <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                        ${meals[i].area}
                    </span>
                </div>
            </div>`;

      card.addEventListener("click", () => {
        this.showMealDetails(meals[i]);
      });

      element.appendChild(card);
    }
  }

  async showMealDetails(meal) {
    document.getElementById("mealAndRecipe").classList.add("hidden");
    document.getElementById("meal-details").classList.remove("hidden");
    window.location.hash = `meal/${meal.id}`;

    let mealDetails = await fetch(`${baseURL}/meals/${meal.id}`);
    this.showLoadingSpinner(document.getElementById("meal-details"));
    let data = await mealDetails.json();
    console.log(data);

    this.hideLoadingSpinner(document.getElementById("meal-details"));
    this.displayMealDetails(data.result, document.getElementById("meal-details"));
  }

  displayMealDetails(meal, element) {
    let mealDetailsHTML = ``;
    mealDetailsHTML += `
        <div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <button id="back-to-meals-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <!-- Hero Section -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="relative h-80 md:h-96">
            <img src="${meal.thumbnail}"
              alt="${meal.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
                <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${meal.tags}</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${meal.name}
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>${meal.time} min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">${meal.servings} servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">${meal.calories} cal/serving</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-8">
          <button id="log-meal-btn"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            data-meal-id="${meal.id}">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>
          </button>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Ingredients & Instructions -->
          <div class="lg:col-span-2 space-y-8">

           <!-- Ingredients -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">${meal.ingredients.length} items</span>
              </h2>
            `


    for (let i = 0; i < meal.ingredients.length; i++) {
      mealDetailsHTML += ` <div class="mb-3">
                <div class=" p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${meal.ingredients[i].measure} ${meal.ingredients[i].ingredient}</span> 
                   
                  </span>
                </div>
              </div>
                `
    }

    mealDetailsHTML += ` <div class="bg-white rounded-2xl shadow-lg p-6">
               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                 Instructions
               </h2>
               <div class="space-y-4">
                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                   <div
                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                     1
                   </div>
                   <p class="text-gray-700 leading-relaxed pt-2">
                     Preheat oven to 350° F. Spray a 9x13-inch baking pan with
                     non-stick spray.
                   </p>
                 </div>`


    for (let i = 0; i < meal.instructions.length; i++) {
      mealDetailsHTML += `
             <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                   <div
                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                     ${i + 1}
                   </div>
                   <p class="text-gray-700 leading-relaxed pt-2">
                     ${meal.instructions[i]}
                   </p>
                 </div>
            `
    }

    if (meal.youtube !== "") {
      console.log(meal.youtube.split("="));
      mealDetailsHTML += `
             <div class="bg-white rounded-2xl shadow-lg p-6">
               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <i class="fa-solid fa-video text-red-500"></i>
                 Video Tutorial
               </h2>
               <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                 <iframe src="https://www.youtube.com/embed/${meal.youtube.split("=")[1]}" class="absolute inset-0 w-full h-full"
                   frameborder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen>
                 </iframe>
               </div>
             </div>
           </div>
            `
    }



    element.innerHTML = mealDetailsHTML;
  }
}


class Product extends UI {

  category;
  score;
  barcode;

  getCategory() {
    return this.category;
  }
  setCategory(category) {
    this.category = category;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  setBarcode(barcode) {
    this.barcode = barcode;
  }

  getBarCode() {
    return this.barcode;
  }

  async getProductByBarcode() {
    let product = await fetch(`${baseURL}/products/barcode/${this.getBarCode()}`);
    this.showLoadingSpinner(document.getElementById("products-grid"));
    let data = await product.json();
    this.hideLoadingSpinner(document.getElementById("products-grid"));
    if (data.error) {
      this.showEmptyState(document.getElementById("products-grid"));
      return;
    }
    this.showProductDataByBarcode(data.result, document.getElementById("products-grid"));
  }

  showProductDataByBarcode(product, element) {
    let elementHTMl = "";
    elementHTMl += `<div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="7613034626844">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${product.image}"
                  alt="${product.name}" loading="lazy" />

                <!-- Nutri-Score Badge -->
                <div
                  class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${product.nutritionGrade}
                </div>

                <!-- NOVA Badge -->
                <div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="${product.novaGroup}">
                  ${product.novaGroup}
                </div>
              </div>

              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${product.brand}
                </p>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${product.name}
                </h3>

                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="fa-solid fa-weight-scale mr-1"></i>${product.nutrients.fat}g</span>
                  <span><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span>
                </div>

                <!-- Mini Nutrition -->
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>`;
    element.innerHTML = elementHTMl;
  }

  async getAllProductsCategories(element) {
    let productsCategories = await fetch(`${baseURL}/products/categories`);
    this.showLoadingSpinner(element);
    let data = await productsCategories.json();
    this.hideLoadingSpinner(element);
    this.displayProductsCategories(data.results, element);
  }
  displayProductsCategories(categories, element) {
    element.innerHTML = "";
    for (let i = 0; i < categories.length; i++) {
      const button = document.createElement("button");
      button.className = `product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all`;
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-cookie mr-1.5";
      button.appendChild(icon);
      button.appendChild(document.createTextNode(categories[i].name));
      element.appendChild(button);
    }

    document.querySelectorAll('.product-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let product = e.target.innerText;
        this.filterProductByCategory(product);
      })
    });
  }

  filterProductByCategory(item) {
    this.setCategory(item.toLowerCase());
    this.getProductCategory(this.getCategory())
  }

  async getProductCategory(category = "snacks") {
    let cats = await fetch(`${baseURL}/products/category/${category}`);
    this.showLoadingSpinner(document.getElementById("products-grid"));
    let data = await cats.json();
    this.hideLoadingSpinner(document.getElementById("products-grid"));
    this.displayProducts(data.results, document.getElementById("products-grid"));
  }



  displayProducts(products, element) {
    if (products.length == 0) {
      this.showEmptyState(element);
      return;
    } else {
      let productsList = ``;
      for (let i = 0; i < products.length; i++) {
        productsList += `<div data-index = ${i}
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="7613034626844">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${products[i].image}"
                  alt="${products[i].name}" loading="lazy" />

                <!-- Nutri-Score Badge -->
                <div
                  class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${products[i].nutritionGrade}
                </div>

                <!-- NOVA Badge -->
                <div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="${products[i].novaGroup}">
                  ${products[i].novaGroup}
                </div>
              </div>

              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${products[i].brand}
                </p>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${products[i].name}
                </h3>

                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="fa-solid fa-weight-scale mr-1"></i>${products[i].nutrients.fat}g</span>
                  <span><i class="fa-solid fa-fire mr-1"></i>${products[i].nutrients.calories} kcal/100g</span>
                </div>

                <!-- Mini Nutrition -->
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">${products[i].nutrients.protein}g</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${products[i].nutrients.carbs}g</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${products[i].nutrients.fat}g</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${products[i].nutrients.sugar}g</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>`;
      }
      element.innerHTML = productsList;

      element.onclick = (event) => {
        const card = event.target.closest(".product-card");
        this.showProductDetails(products[card.dataset.index]);
      }
    }
  }

  showProductDetails(productDetail) {
    console.log(productDetail);
    
    let elementHTMl = ``;
    elementHTMl += ` <!--  -->
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id = "modal">
          <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex flex-col sm:flex-row gap-6 mb-7">

                <!-- Product Image -->
                <div class="w-36 h-36 shrink-0 bg-gray-100 rounded-2xl overflow-hidden mx-auto sm:mx-0">
                  <img src="${productDetail.image}"
                    alt="Parmigiano Reggiano" class="w-full h-full object-cover" />
                </div>

                <!-- Product Information -->
                <div class="flex-1">

                  <p class="text-emerald-600 font-semibold text-sm mb-2">
                    Bio Hombre
                  </p>

                  <h2 id="product-name" class="text-2xl font-bold text-gray-900 mb-2">
                    ${productDetail.name}
                  </h2>

                  <p class="text-gray-500 text-base mb-4">
                    430 g
                  </p>

                  <!-- Product Scores -->
                  <div class="flex flex-wrap gap-3">

                    <!-- Nutri Score -->
                    <div class="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2">
                      <span
                        class="w-9 h-9 bg-orange-500 text-white font-bold text-xl flex items-center justify-center rounded">
                        ${productDetail.nutritionGrade}
                      </span>

                      <div>
                        <p class="text-amber-600 font-bold text-sm">
                          Nutri-Score
                        </p>
                        <p class="text-gray-500 text-xs">Poor</p>
                      </div>
                    </div>

                    <!-- NOVA Score -->
                    <div class="flex items-center gap-2 bg-red-50 rounded-xl px-3 py-2">
                      <span
                        class="w-9 h-9 bg-red-600 text-white font-bold text-lg flex items-center justify-center rounded-full">
                        3
                      </span>

                      <div>
                        <p class="text-red-600 font-bold text-sm">NOVA</p>
                        <p class="text-gray-500 text-xs">Ultra-processed</p>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Close Icon -->
                <button id="close-product-modal"
                  class="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-3xl transition"
                  aria-label="Close modal">
                  &times;
                </button>

              </div>

              <!-- Nutrition Facts -->
              <div class="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 md:p-6 mb-7">

                <!-- Nutrition Header -->
                <div class="flex items-center gap-2 mb-5">
                  <i class="fa-solid fa-chart-pie text-emerald-600 text-xl"></i>

                  <h3 class="font-bold text-lg text-gray-900">
                    Nutrition Facts
                  </h3>

                  <span class="text-gray-500 text-sm">(per 100g)</span>
                </div>

                <!-- Calories -->
                <div class="text-center mb-5">
                  <h2 class="text-4xl font-extrabold text-gray-900">
                    ${productDetail.nutrients.calories}
                  </h2>
                  <p class="text-gray-500">Calories</p>
                </div>

                <div class="border-t border-emerald-200 mb-5"></div>

                <!-- Macronutrients -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">

                  <!-- Protein -->
                  <div class="text-center">
                    <div class="h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
                      <div class="h-full w-1/3 bg-emerald-500 rounded-full"></div>
                    </div>
                    <p class="text-emerald-600 font-bold text-xl">${productDetail.nutrients.protein} g</p>
                    <p class="text-gray-500 text-sm">Protein</p>
                  </div>

                  <!-- Carbs -->
                  <div class="text-center">
                    <div class="h-2 bg-gray-200 rounded-full mb-3"></div>
                    <p class="text-blue-600 font-bold text-xl">${productDetail.nutrients.carbs} g</p>
                    <p class="text-gray-500 text-sm">Carbs</p>
                  </div>

                  <!-- Fat -->
                  <div class="text-center">
                    <div class="h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
                      <div class="h-full w-1/4 bg-purple-500 rounded-full"></div>
                    </div>
                    <p class="text-purple-600 font-bold text-xl">${productDetail.nutrients.fat} g</p>
                    <p class="text-gray-500 text-sm">Fat</p>
                  </div>

                  <!-- Sugar -->
                  <div class="text-center">
                    <div class="h-2 bg-gray-200 rounded-full mb-3"></div>
                    <p class="text-orange-600 font-bold text-xl">${productDetail.nutrients.sugar} g</p>
                    <p class="text-gray-500 text-sm">Sugar</p>
                  </div>

                </div>

                <div class="border-t border-emerald-200 mb-5"></div>

                <!-- Additional Nutrients -->
                <div class="grid grid-cols-3 gap-3 text-center">

                  <div>
                    <p class="font-semibold text-gray-900">${productDetail.nutrients.fat} g</p>
                    <p class="text-gray-500 text-sm">Saturated Fat</p>
                  </div>

                  <div>
                    <p class="font-semibold text-gray-900">${productDetail.nutrients.fiber} g</p>
                    <p class="text-gray-500 text-sm">Fiber</p>
                  </div>

                  <div>
                    <p class="font-semibold text-gray-900">${productDetail.nutrients.sugar} g</p>
                    <p class="text-gray-500 text-sm">Salt</p>
                  </div>

                </div>

              </div>

              <!-- Footer Actions -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button id="log-product-btn"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3">
                  <i class="fa-solid fa-plus text-lg"></i>
                  Log This Food
                </button>

                <button id="close-product-modal-footer"
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition">
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
      <!--  -->`

    document.getElementById("products-section").innerHTML += elementHTMl;
    
    document.getElementById("log-product-btn").addEventListener("click" , function() {
      let arr =  JSON.parse(localStorage.getItem("log-product-btn")) ?? [];
      arr.push(productDetail);
      localStorage.setItem("log-product-btn" , JSON.stringify(arr));
      document.getElementById("modal").remove();
      
    })

    document.getElementById("close-product-modal-footer").addEventListener("click", function () {
      const modal = document.getElementById("modal");

      if (modal) {
        modal.remove();
      }

    })
  }

  async getProductBySearch(item) {
    let products = await fetch(`${baseURL}/products/search?q=${item}&page=1&limit=24`);
    this.showLoadingSpinner(document.getElementById("products-grid"));
    let data = await products.json();
    this.hideLoadingSpinner(document.getElementById("products-grid"));
    console.log(data);

    this.displayProducts(data.results, document.getElementById("products-grid"));
  }

}

export {
  Area,
  Meal,
  Product
}