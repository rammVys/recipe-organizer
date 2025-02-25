
// document.addEventListener('DOMContentLoaded', () => {
//     // Element references
//     const homeSection = document.getElementById('home-section');
//     const formSection = document.getElementById('form-section');
//     const favoritesSection = document.getElementById('favorites-section');
//     const addRecipeBtn = document.getElementById('add-recipe-btn');
//     const backBtn = document.getElementById('back-btn');
//     const backFavBtn = document.getElementById('back-fav-btn');
//     const recipeForm = document.getElementById('recipe-form');
    
//     // Navigation links
//     const homeLink = document.getElementById('home-link');
//     const favoritesLink = document.getElementById('favorites-link');
//     const settingsLink = document.getElementById('settings-link');
    
//     // Data storage for recipes and current edit tracker
//     let recipes = [];
//     let currentEditId = null;
    
//     // Function to show a specific section and hide others
//     function showSection(section) {
//       homeSection.classList.add('hidden');
//       formSection.classList.add('hidden');
//       favoritesSection.classList.add('hidden');
//       section.classList.remove('hidden');
//     }
    
//     // Navigation event listeners
//     addRecipeBtn.addEventListener('click', () => {
//       recipeForm.reset();
//       currentEditId = null;
//       showSection(formSection);
//     });
    
//     backBtn.addEventListener('click', () => {
//       showSection(homeSection);
//     });
    
//     backFavBtn.addEventListener('click', () => {
//       showSection(homeSection);
//     });
    
//     homeLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       showSection(homeSection);
//     });
    
//     favoritesLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       showSection(favoritesSection);
//     });
    
//     // Handle form submission for adding/editing a recipe
//     recipeForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const title = document.getElementById('recipe-title').value.trim();
//       const ingredients = document.getElementById('recipe-ingredients').value.trim();
//       const type = document.getElementById('recipe-type').value;
//       const isFavorite = document.getElementById('favorite-check').checked;
      
//       if (!title || !ingredients || !type) {
//         alert('Please fill in all required fields.');
//         return;
//       }
      
//       if (currentEditId) {
//         // Update existing recipe
//         recipes = recipes.map(recipe => {
//           if (recipe.id === currentEditId) {
//             return { ...recipe, title, ingredients, type, isFavorite };
//           }
//           return recipe;
//         });
//         currentEditId = null;
//       } else {
//         // Add new recipe
//         const newRecipe = {
//           id: Date.now().toString(),
//           title,
//           ingredients,
//           type,
//           isFavorite,
//         };
//         recipes.push(newRecipe);
//       }
      
//       // Save recipes to localStorage (simulate persistence)
//       localStorage.setItem('recipes', JSON.stringify(recipes));
      
//       recipeForm.reset();
//       showSection(homeSection);
//       renderRecipes();
//       renderFavorites();
//     });
    
//     // Start editing a recipe by populating the form with its data
//     function startEditRecipe(id) {
//       const recipe = recipes.find(r => r.id === id);
//       if (recipe) {
//         document.getElementById('recipe-title').value = recipe.title;
//         document.getElementById('recipe-ingredients').value = recipe.ingredients;
//         document.getElementById('recipe-type').value = recipe.type;
//         document.getElementById('favorite-check').checked = recipe.isFavorite;
//         currentEditId = recipe.id;
//         showSection(formSection);
//       }
//     }
    
//     // Delete a recipe and update the view
//     function deleteRecipe(id) {
//       if (confirm('Are you sure you want to delete this recipe?')) {
//         recipes = recipes.filter(recipe => recipe.id !== id);
//         localStorage.setItem('recipes', JSON.stringify(recipes));
//         renderRecipes();
//         renderFavorites();
//       }
//     }
    
//     // Render recipes in the Home section
//     function renderRecipes() {
//       const recipeListDiv = document.getElementById('recipe-list');
//       recipeListDiv.innerHTML = '';
//       if (recipes.length === 0) {
//         recipeListDiv.innerHTML = '<p>No recipes found. Please add one!</p>';
//       } else {
//         recipes.forEach(recipe => {
//           const card = document.createElement('div');
//           card.classList.add('recipe-card');
//           card.innerHTML = `
//             <h2>${recipe.title}</h2>
//             <p><strong>Meal Type:</strong> ${recipe.type}</p>
//             <p>${recipe.ingredients.substring(0, 50)}...</p>
//             <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//             <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//           `;
//           if (recipe.isFavorite) {
//             const favIndicator = document.createElement('span');
//             favIndicator.textContent = '❤️ ';
//             card.insertBefore(favIndicator, card.firstChild);
//           }
//           recipeListDiv.appendChild(card);
//         });
        
//         // Attach event listeners for edit and delete buttons
//         document.querySelectorAll('.edit-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             startEditRecipe(id);
//           });
//         });
//         document.querySelectorAll('.delete-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             deleteRecipe(id);
//           });
//         });
//       }
//     }
    
//     // Render favorite recipes in the Favorites section
//     function renderFavorites() {
//       const favoriteListDiv = document.getElementById('favorite-list');
//       favoriteListDiv.innerHTML = '';
//       const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
//       if (favoriteRecipes.length === 0) {
//         favoriteListDiv.innerHTML = '<p>No favorite recipes yet.</p>';
//       } else {
//         favoriteRecipes.forEach(recipe => {
//           const card = document.createElement('div');
//           card.classList.add('recipe-card');
//           card.innerHTML = `
//             <h2>${recipe.title}</h2>
//             <p><strong>Meal Type:</strong> ${recipe.type}</p>
//             <p>${recipe.ingredients.substring(0, 50)}...</p>
//             <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//             <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//           `;
//           // Add favorite indicator at the beginning
//           card.insertAdjacentHTML('afterbegin', '<span>❤️ </span>');
//           favoriteListDiv.appendChild(card);
//         });
//         // Attach event listeners for edit and delete in favorites
//         favoriteListDiv.querySelectorAll('.edit-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             startEditRecipe(id);
//           });
//         });
//         favoriteListDiv.querySelectorAll('.delete-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             deleteRecipe(id);
//           });
//         });
//       }
//     }
    
//     // Initialize recipes from localStorage on page load
//     function initializeRecipes() {
//       const storedRecipes = localStorage.getItem('recipes');
//       if (storedRecipes) {
//         recipes = JSON.parse(storedRecipes);
//       }
//       renderRecipes();
//       renderFavorites();
//     }
    
//     initializeRecipes();
//   });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', () => {
//     // Element references
//     const homeSection = document.getElementById('home-section');
//     const formSection = document.getElementById('form-section');
//     const favoritesSection = document.getElementById('favorites-section');
//     const addRecipeBtn = document.getElementById('add-recipe-btn');
//     const backBtn = document.getElementById('back-btn');
//     const backFavBtn = document.getElementById('back-fav-btn');
//     const recipeForm = document.getElementById('recipe-form');
//     const searchInput = document.getElementById('search-input');
//     const filterSelect = document.getElementById('filter-select');
    
//     // Navigation links
//     const homeLink = document.getElementById('home-link');
//     const favoritesLink = document.getElementById('favorites-link');
//     const settingsLink = document.getElementById('settings-link');
    
//     // Data storage for recipes and current edit tracker
//     let recipes = [];
//     let currentEditId = null;
    
//     // Function to show a specific section and hide others
//     function showSection(section) {
//       homeSection.classList.add('hidden');
//       formSection.classList.add('hidden');
//       favoritesSection.classList.add('hidden');
//       section.classList.remove('hidden');
//     }
    
//     // Navigation event listeners
//     addRecipeBtn.addEventListener('click', () => {
//       recipeForm.reset();
//       currentEditId = null;
//       showSection(formSection);
//     });
    
//     backBtn.addEventListener('click', () => {
//       showSection(homeSection);
//     });
    
//     backFavBtn.addEventListener('click', () => {
//       showSection(homeSection);
//     });
    
//     homeLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       showSection(homeSection);
//     });
    
//     favoritesLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       showSection(favoritesSection);
//     });
    
//     // Handle form submission for adding/editing a recipe
//     recipeForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const title = document.getElementById('recipe-title').value.trim();
//       const ingredients = document.getElementById('recipe-ingredients').value.trim();
//       const type = document.getElementById('recipe-type').value;
//       const isFavorite = document.getElementById('favorite-check').checked;
      
//       if (!title || !ingredients || !type) {
//         alert('Please fill in all required fields.');
//         return;
//       }
      
//       if (currentEditId) {
//         // Update existing recipe
//         recipes = recipes.map(recipe => {
//           if (recipe.id === currentEditId) {
//             return { ...recipe, title, ingredients, type, isFavorite };
//           }
//           return recipe;
//         });
//         currentEditId = null;
//       } else {
//         // Add new recipe
//         const newRecipe = {
//           id: Date.now().toString(),
//           title,
//           ingredients,
//           type,
//           isFavorite,
//         };
//         recipes.push(newRecipe);
//       }
      
//       // Save recipes to localStorage (simulate persistence)
//       localStorage.setItem('recipes', JSON.stringify(recipes));
      
//       recipeForm.reset();
//       showSection(homeSection);
//       renderRecipes();
//       renderFavorites();
//     });
    
//     // Function to start editing a recipe
//     function startEditRecipe(id) {
//       const recipe = recipes.find(r => r.id === id);
//       if (recipe) {
//         document.getElementById('recipe-title').value = recipe.title;
//         document.getElementById('recipe-ingredients').value = recipe.ingredients;
//         document.getElementById('recipe-type').value = recipe.type;
//         document.getElementById('favorite-check').checked = recipe.isFavorite;
//         currentEditId = recipe.id;
//         showSection(formSection);
//       }
//     }
    
//     // Delete a recipe and update the view
//     function deleteRecipe(id) {
//       if (confirm('Are you sure you want to delete this recipe?')) {
//         recipes = recipes.filter(recipe => recipe.id !== id);
//         localStorage.setItem('recipes', JSON.stringify(recipes));
//         renderRecipes();
//         renderFavorites();
//       }
//     }
    
//     // Función para filtrar recetas según búsqueda y filtro de categoría
//     function getFilteredRecipes() {
//       const searchQuery = searchInput.value.toLowerCase().trim();
//       const filterValue = filterSelect.value;
//       return recipes.filter(recipe => {
//         const titleMatch = recipe.title.toLowerCase().includes(searchQuery);
//         const ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchQuery);
//         const searchMatch = titleMatch || ingredientsMatch;
//         const filterMatch = filterValue === '' || recipe.type === filterValue;
//         return searchMatch && filterMatch;
//       });
//     }
    
//     // Render recipes in the Home section using filtered results
//     function renderRecipes() {
//       const recipeListDiv = document.getElementById('recipe-list');
//       recipeListDiv.innerHTML = '';
      
//       const filteredRecipes = getFilteredRecipes();
      
//       if (filteredRecipes.length === 0) {
//         recipeListDiv.innerHTML = '<p>No recipes found. Please add one!</p>';
//       } else {
//         filteredRecipes.forEach(recipe => {
//           const card = document.createElement('div');
//           card.classList.add('recipe-card');
//           card.innerHTML = `
//             <h2>${recipe.title}</h2>
//             <p><strong>Meal Type:</strong> ${recipe.type}</p>
//             <p>${recipe.ingredients.substring(0, 50)}...</p>
//             <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//             <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//           `;
//           if (recipe.isFavorite) {
//             const favIndicator = document.createElement('span');
//             favIndicator.textContent = '❤️ ';
//             card.insertBefore(favIndicator, card.firstChild);
//           }
//           recipeListDiv.appendChild(card);
//         });
        
//         // Attach event listeners for edit and delete buttons
//         document.querySelectorAll('.edit-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             startEditRecipe(id);
//           });
//         });
//         document.querySelectorAll('.delete-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             deleteRecipe(id);
//           });
//         });
//       }
//     }
    
//     // Render favorite recipes in the Favorites section
//     function renderFavorites() {
//       const favoriteListDiv = document.getElementById('favorite-list');
//       favoriteListDiv.innerHTML = '';
//       const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
//       if (favoriteRecipes.length === 0) {
//         favoriteListDiv.innerHTML = '<p>No favorite recipes yet.</p>';
//       } else {
//         favoriteRecipes.forEach(recipe => {
//           const card = document.createElement('div');
//           card.classList.add('recipe-card');
//           card.innerHTML = `
//             <h2>${recipe.title}</h2>
//             <p><strong>Meal Type:</strong> ${recipe.type}</p>
//             <p>${recipe.ingredients.substring(0, 50)}...</p>
//             <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//             <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//           `;
//           // Add favorite indicator at the beginning
//           card.insertAdjacentHTML('afterbegin', '<span>❤️ </span>');
//           favoriteListDiv.appendChild(card);
//         });
//         // Attach event listeners for edit and delete in favorites
//         favoriteListDiv.querySelectorAll('.edit-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             startEditRecipe(id);
//           });
//         });
//         favoriteListDiv.querySelectorAll('.delete-btn').forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             deleteRecipe(id);
//           });
//         });
//       }
//     }
    
//     // Initialize recipes from localStorage on page load
//     function initializeRecipes() {
//       const storedRecipes = localStorage.getItem('recipes');
//       if (storedRecipes) {
//         recipes = JSON.parse(storedRecipes);
//       }
//       renderRecipes();
//       renderFavorites();
//     }
    
//     // Event listeners for search and filter
//     searchInput.addEventListener('input', renderRecipes);
//     filterSelect.addEventListener('change', renderRecipes);
    
//     initializeRecipes();
//   });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Importa los módulos de Firebase
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
// import { 
//   getFirestore, 
//   collection, 
//   addDoc, 
//   doc, 
//   updateDoc, 
//   deleteDoc, 
//   onSnapshot 
// } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// // Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCeuEsIEIcfjsDFKMP4EfUzz2MLyCgG4i4",
//   authDomain: "recipe-organizer-83106.firebaseapp.com",
//   projectId: "recipe-organizer-83106",
//   storageBucket: "recipe-organizer-83106.firebasestorage.app",
//   messagingSenderId: "44532543906",
//   appId: "1:44532543906:web:b011ffefb696b7c716c2fb",
//   measurementId: "G-ZRKXGJX9Y8"
// };

// // Inicializa Firebase y Firestore
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// // Referencias a elementos del DOM
// const homeSection = document.getElementById('home-section');
// const formSection = document.getElementById('form-section');
// const favoritesSection = document.getElementById('favorites-section');
// const addRecipeBtn = document.getElementById('add-recipe-btn');
// const backBtn = document.getElementById('back-btn');
// const backFavBtn = document.getElementById('back-fav-btn');
// const recipeForm = document.getElementById('recipe-form');
// const searchInput = document.getElementById('search-input');
// const filterSelect = document.getElementById('filter-select');

// // Navigation links
// const homeLink = document.getElementById('home-link');
// const favoritesLink = document.getElementById('favorites-link');
// const settingsLink = document.getElementById('settings-link');

// // Array para almacenar las recetas (se actualizará en tiempo real)
// let recipes = [];
// let currentEditId = null;

// // Función para mostrar una sección y ocultar las demás
// function showSection(section) {
//   homeSection.classList.add('hidden');
//   formSection.classList.add('hidden');
//   favoritesSection.classList.add('hidden');
//   section.classList.remove('hidden');
// }

// // Navegación
// addRecipeBtn.addEventListener('click', () => {
//   recipeForm.reset();
//   currentEditId = null;
//   showSection(formSection);
// });

// backBtn.addEventListener('click', () => {
//   showSection(homeSection);
// });

// backFavBtn.addEventListener('click', () => {
//   showSection(homeSection);
// });

// homeLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   showSection(homeSection);
// });

// favoritesLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   showSection(favoritesSection);
// });

// // Manejo del formulario para agregar/editar receta
// recipeForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const title = document.getElementById('recipe-title').value.trim();
//   const ingredients = document.getElementById('recipe-ingredients').value.trim();
//   const type = document.getElementById('recipe-type').value;
//   const isFavorite = document.getElementById('favorite-check').checked;
  
//   if (!title || !ingredients || !type) {
//     alert('Please fill in all required fields.');
//     return;
//   }
  
//   try {
//     if (currentEditId) {
//       // Actualizar receta existente
//       const recipeRef = doc(db, "recipes", currentEditId);
//       await updateDoc(recipeRef, { title, ingredients, type, isFavorite });
//       currentEditId = null;
//     } else {
//       // Agregar nueva receta
//       await addDoc(collection(db, "recipes"), { title, ingredients, type, isFavorite });
//     }
//     recipeForm.reset();
//     showSection(homeSection);
//   } catch (error) {
//     console.error("Error saving recipe: ", error);
//   }
// });

// // Iniciar la edición de una receta (llenar formulario con sus datos)
// function startEditRecipe(id) {
//   const recipe = recipes.find(r => r.id === id);
//   if (recipe) {
//     document.getElementById('recipe-title').value = recipe.title;
//     document.getElementById('recipe-ingredients').value = recipe.ingredients;
//     document.getElementById('recipe-type').value = recipe.type;
//     document.getElementById('favorite-check').checked = recipe.isFavorite;
//     currentEditId = recipe.id;
//     showSection(formSection);
//   }
// }

// // Eliminar una receta
// async function deleteRecipe(id) {
//   if (confirm('Are you sure you want to delete this recipe?')) {
//     try {
//       await deleteDoc(doc(db, "recipes", id));
//     } catch (error) {
//       console.error("Error deleting recipe: ", error);
//     }
//   }
// }

// // Función para filtrar recetas según búsqueda y filtro de categoría
// function getFilteredRecipes() {
//   const searchQuery = searchInput.value.toLowerCase().trim();
//   const filterValue = filterSelect.value;
//   return recipes.filter(recipe => {
//     const titleMatch = recipe.title.toLowerCase().includes(searchQuery);
//     const ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchQuery);
//     const searchMatch = titleMatch || ingredientsMatch;
//     const filterMatch = filterValue === '' || recipe.type === filterValue;
//     return searchMatch && filterMatch;
//   });
// }

// // Renderizar recetas en la sección Home
// function renderRecipes() {
//   const recipeListDiv = document.getElementById('recipe-list');
//   recipeListDiv.innerHTML = '';
  
//   const filteredRecipes = getFilteredRecipes();
  
//   if (filteredRecipes.length === 0) {
//     recipeListDiv.innerHTML = '<p>No recipes found. Please add one!</p>';
//   } else {
//     filteredRecipes.forEach(recipe => {
//       const card = document.createElement('div');
//       card.classList.add('recipe-card');
//       card.innerHTML = `
//         <h2>${recipe.title}</h2>
//         <p><strong>Meal Type:</strong> ${recipe.type}</p>
//         <p>${recipe.ingredients.substring(0, 50)}...</p>
//         <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//         <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//       `;
//       if (recipe.isFavorite) {
//         const favIndicator = document.createElement('span');
//         favIndicator.textContent = '❤️ ';
//         card.insertBefore(favIndicator, card.firstChild);
//       }
//       recipeListDiv.appendChild(card);
//     });
    
//     // Agregar listeners para los botones de editar y eliminar
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         startEditRecipe(id);
//       });
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         deleteRecipe(id);
//       });
//     });
//   }
// }

// // Renderizar recetas favoritas en la sección de Favorites
// function renderFavorites() {
//   const favoriteListDiv = document.getElementById('favorite-list');
//   favoriteListDiv.innerHTML = '';
//   const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
//   if (favoriteRecipes.length === 0) {
//     favoriteListDiv.innerHTML = '<p>No favorite recipes yet.</p>';
//   } else {
//     favoriteRecipes.forEach(recipe => {
//       const card = document.createElement('div');
//       card.classList.add('recipe-card');
//       card.innerHTML = `
//         <h2>${recipe.title}</h2>
//         <p><strong>Meal Type:</strong> ${recipe.type}</p>
//         <p>${recipe.ingredients.substring(0, 50)}...</p>
//         <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//         <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//       `;
//       // Indicador de favorito
//       card.insertAdjacentHTML('afterbegin', '<span>❤️ </span>');
//       favoriteListDiv.appendChild(card);
//     });
//     favoriteListDiv.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         startEditRecipe(id);
//       });
//     });
//     favoriteListDiv.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         deleteRecipe(id);
//       });
//     });
//   }
// }

// // Escuchar en tiempo real los cambios en la colección "recipes"
// // Esto actualiza el array 'recipes' y re-renderiza la UI automáticamente
// onSnapshot(collection(db, "recipes"), (snapshot) => {
//   recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   renderRecipes();
//   renderFavorites();
// });

// // Event listeners para búsqueda y filtro
// searchInput.addEventListener('input', renderRecipes);
// filterSelect.addEventListener('change', renderRecipes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Importa los módulos de Firebase
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
// import { 
//   getFirestore, 
//   collection, 
//   addDoc, 
//   doc, 
//   updateDoc, 
//   deleteDoc, 
//   onSnapshot, 
//   query, 
//   where 
// } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut, 
//   onAuthStateChanged 
// } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// // Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCeuEsIEIcfjsDFKMP4EfUzz2MLyCgG4i4",
//   authDomain: "recipe-organizer-83106.firebaseapp.com",
//   projectId: "recipe-organizer-83106",
//   storageBucket: "recipe-organizer-83106.firebasestorage.app",
//   messagingSenderId: "44532543906",
//   appId: "1:44532543906:web:b011ffefb696b7c716c2fb",
//   measurementId: "G-ZRKXGJX9Y8"
// };

// // Inicializa Firebase, Firestore y Auth
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const auth = getAuth(app);

// // Referencias a elementos del DOM (Login/Registro)
// const loginSection = document.getElementById('login-section');
// const registerSection = document.getElementById('register-section');
// const loginForm = document.getElementById('login-form');
// const registerForm = document.getElementById('register-form');
// const showRegisterLink = document.getElementById('show-register');
// const showLoginLink = document.getElementById('show-login');
// const appContainer = document.getElementById('app-container');
// const logoutBtn = document.getElementById('logout-btn');

// // Referencias a elementos de la app
// const homeSection = document.getElementById('home-section');
// const formSection = document.getElementById('form-section');
// const favoritesSection = document.getElementById('favorites-section');
// const addRecipeBtn = document.getElementById('add-recipe-btn');
// const backBtn = document.getElementById('back-btn');
// const backFavBtn = document.getElementById('back-fav-btn');
// const recipeForm = document.getElementById('recipe-form');
// const searchInput = document.getElementById('search-input');
// const filterSelect = document.getElementById('filter-select');
// const homeLink = document.getElementById('home-link');
// const favoritesLink = document.getElementById('favorites-link');
// const settingsLink = document.getElementById('settings-link');

// // Variables globales
// let recipes = [];
// let currentEditId = null;
// let currentUser = null;

// // Referencias a las nuevas vistas
// const welcomeSection = document.getElementById('welcome-section');
// const getStartedBtn = document.getElementById('get-started-btn');

// // Funciones para mostrar las diferentes vistas
// function showWelcome() {
//   welcomeSection.classList.remove('hidden');
//   loginSection.classList.add('hidden');
//   registerSection.classList.add('hidden');
//   appContainer.classList.add('hidden');
// }



// function showApp() {
//   appContainer.classList.remove('hidden');
//   loginSection.classList.add('hidden');
//   registerSection.classList.add('hidden');
//   welcomeSection.classList.add('hidden');
// }

// // function showLogin() {
// //     welcomeSection.classList.add('hidden');
// //     appContainer.classList.add('hidden');
// //     loginSection.classList.remove('hidden');
// //     registerSection.classList.add('hidden');
// //   }
  
// // Listener para el botón "Get Started"
// getStartedBtn.addEventListener('click', () => {
//   showLogin();
// });

// // // Observador del estado de autenticación
// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     currentUser = user;
// //     console.log("User is signed in:", user);
// //     showApp();
// //     loadUserRecipes();
// //   } else {
// //     currentUser = null;
// //     console.log("No user signed in");
// //     showWelcome();
// //   }
// // });




// // Cambiar de Login a Registro y viceversa
// showRegisterLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   loginSection.classList.add('hidden');
//   registerSection.classList.remove('hidden');
// });

// showLoginLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   registerSection.classList.add('hidden');
//   loginSection.classList.remove('hidden');
// });

// // Manejo del formulario de Login
// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("User logged in:", userCredential.user);
//     loginForm.reset();
//   } catch (error) {
//     console.error("Error in login:", error);
//     alert("Login failed: " + error.message);
//   }
// });

// // Manejo del formulario de Registro
// registerForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = document.getElementById('register-email').value;
//   const password = document.getElementById('register-password').value;
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log("User registered:", userCredential.user);
//     registerForm.reset();
//   } catch (error) {
//     console.error("Error in registration:", error);
//     alert("Registration failed: " + error.message);
//   }
// });

// // Manejo de Logout
// logoutBtn.addEventListener('click', async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out");
//   } catch (error) {
//     console.error("Error logging out:", error);
//   }
// });

// // Observador del estado de autenticación
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     currentUser = user;
//     console.log("User is signed in:", user);
//     showApp();
//     // Cargar recetas del usuario autenticado
//     loadUserRecipes();
//   } else {
//     currentUser = null;
//     console.log("No user signed in");
//     showLogin();
//   }
// });

// // Función para cargar recetas del usuario actual (filtradas por owner)
// function loadUserRecipes() {
//   const recipesQuery = query(collection(db, "recipes"), where("owner", "==", currentUser.uid));
//   onSnapshot(recipesQuery, (snapshot) => {
//     recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     renderRecipes();
//     renderFavorites();
//   });
// }

// // Navegación de la app
// addRecipeBtn.addEventListener('click', () => {
//   recipeForm.reset();
//   currentEditId = null;
//   showSection(formSection);
// });

// backBtn.addEventListener('click', () => {
//   showSection(homeSection);
// });

// backFavBtn.addEventListener('click', () => {
//   showSection(homeSection);
// });

// homeLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   showSection(homeSection);
// });

// favoritesLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   showSection(favoritesSection);
// });

// // Manejo del formulario de recetas (agregar/editar)
// recipeForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const title = document.getElementById('recipe-title').value.trim();
//   const ingredients = document.getElementById('recipe-ingredients').value.trim();
//   const type = document.getElementById('recipe-type').value;
//   const isFavorite = document.getElementById('favorite-check').checked;
  
//   if (!title || !ingredients || !type) {
//     alert('Please fill in all required fields.');
//     return;
//   }
  
//   try {
//     if (currentEditId) {
//       // Actualizar receta existente
//       const recipeRef = doc(db, "recipes", currentEditId);
//       await updateDoc(recipeRef, { title, ingredients, type, isFavorite });
//       currentEditId = null;
//     } else {
//       // Agregar nueva receta con el campo "owner" del usuario actual
//       await addDoc(collection(db, "recipes"), { title, ingredients, type, isFavorite, owner: currentUser.uid });
//     }
//     recipeForm.reset();
//     showSection(homeSection);
//   } catch (error) {
//     console.error("Error saving recipe:", error);
//   }
// });

// // Función para iniciar la edición de una receta
// function startEditRecipe(id) {
//   const recipe = recipes.find(r => r.id === id);
//   if (recipe) {
//     document.getElementById('recipe-title').value = recipe.title;
//     document.getElementById('recipe-ingredients').value = recipe.ingredients;
//     document.getElementById('recipe-type').value = recipe.type;
//     document.getElementById('favorite-check').checked = recipe.isFavorite;
//     currentEditId = recipe.id;
//     showSection(formSection);
//   }
// }

// // Función para eliminar una receta
// async function deleteRecipe(id) {
//   if (confirm('Are you sure you want to delete this recipe?')) {
//     try {
//       await deleteDoc(doc(db, "recipes", id));
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//     }
//   }
// }

// // Función para filtrar recetas según búsqueda y filtro de categoría
// function getFilteredRecipes() {
//   const searchQuery = searchInput.value.toLowerCase().trim();
//   const filterValue = filterSelect.value;
//   return recipes.filter(recipe => {
//     const titleMatch = recipe.title.toLowerCase().includes(searchQuery);
//     const ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchQuery);
//     const searchMatch = titleMatch || ingredientsMatch;
//     const filterMatch = filterValue === '' || recipe.type === filterValue;
//     return searchMatch && filterMatch;
//   });
// }

// // Renderizar recetas en la sección Home
// function renderRecipes() {
//   const recipeListDiv = document.getElementById('recipe-list');
//   recipeListDiv.innerHTML = '';
  
//   const filteredRecipes = getFilteredRecipes();
  
//   if (filteredRecipes.length === 0) {
//     recipeListDiv.innerHTML = '<p>No recipes found. Please add one!</p>';
//   } else {
//     filteredRecipes.forEach(recipe => {
//       const card = document.createElement('div');
//       card.classList.add('recipe-card');
//       card.innerHTML = `
//         <h2>${recipe.title}</h2>
//         <p><strong>Meal Type:</strong> ${recipe.type}</p>
//         <p>${recipe.ingredients.substring(0, 50)}...</p>
//         <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//         <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//       `;
//       if (recipe.isFavorite) {
//         const favIndicator = document.createElement('span');
//         favIndicator.textContent = '❤️ ';
//         card.insertBefore(favIndicator, card.firstChild);
//       }
//       recipeListDiv.appendChild(card);
//     });
    
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         startEditRecipe(id);
//       });
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         deleteRecipe(id);
//       });
//     });
//   }
// }

// // Renderizar recetas favoritas en la sección Favorites
// function renderFavorites() {
//   const favoriteListDiv = document.getElementById('favorite-list');
//   favoriteListDiv.innerHTML = '';
//   const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
//   if (favoriteRecipes.length === 0) {
//     favoriteListDiv.innerHTML = '<p>No favorite recipes yet.</p>';
//   } else {
//     favoriteRecipes.forEach(recipe => {
//       const card = document.createElement('div');
//       card.classList.add('recipe-card');
//       card.innerHTML = `
//         <h2>${recipe.title}</h2>
//         <p><strong>Meal Type:</strong> ${recipe.type}</p>
//         <p>${recipe.ingredients.substring(0, 50)}...</p>
//         <button class="edit-btn" data-id="${recipe.id}">Edit</button>
//         <button class="delete-btn" data-id="${recipe.id}">Delete</button>
//       `;
//       card.insertAdjacentHTML('afterbegin', '<span>❤️ </span>');
//       favoriteListDiv.appendChild(card);
//     });
    
//     favoriteListDiv.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         startEditRecipe(id);
//       });
//     });
//     favoriteListDiv.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const id = e.target.getAttribute('data-id');
//         deleteRecipe(id);
//       });
//     });
//   }
// }

// // Event listeners para búsqueda y filtro
// searchInput.addEventListener('input', renderRecipes);
// filterSelect.addEventListener('change', renderRecipes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeuEsIEIcfjsDFKMP4EfUzz2MLyCgG4i4",
  authDomain: "recipe-organizer-83106.firebaseapp.com",
  projectId: "recipe-organizer-83106",
  storageBucket: "recipe-organizer-83106.firebasestorage.app",
  messagingSenderId: "44532543906",
  appId: "1:44532543906:web:b011ffefb696b7c716c2fb",
  measurementId: "G-ZRKXGJX9Y8"
};

// Inicializa Firebase, Firestore y Auth
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Referencias a vistas y formularios de autenticación y bienvenida
const welcomeSection = document.getElementById('welcome-section');
const getStartedBtn = document.getElementById('get-started-btn');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Contenedor principal de la app (solo se muestra si el usuario está autenticado)
const appContainer = document.getElementById('app-container');
const logoutBtn = document.getElementById('logout-btn');

// Referencias a vistas internas de la app
const homeSection = document.getElementById('home-section');
const formSection = document.getElementById('form-section');
const favoritesSection = document.getElementById('favorites-section');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const backBtn = document.getElementById('back-btn');
const backFavBtn = document.getElementById('back-fav-btn');
const recipeForm = document.getElementById('recipe-form');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const homeLink = document.getElementById('home-link');
const favoritesLink = document.getElementById('favorites-link');
const settingsLink = document.getElementById('settings-link');

// Variables globales
let recipes = [];
let currentEditId = null;
let currentUser = null;

/* Funciones para mostrar/ocultar vistas */

// Muestra la vista de bienvenida
function showWelcome() {
  welcomeSection.classList.remove('hidden');
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
  appContainer.classList.add('hidden');
}

// Muestra la vista de Login (ocultando bienvenida)
function showLogin() {
  welcomeSection.classList.add('hidden');
  appContainer.classList.add('hidden');
  loginSection.classList.remove('hidden');
  registerSection.classList.add('hidden');
}

// Muestra la app (contenido principal) y oculta autenticación y bienvenida
function showApp() {
  appContainer.classList.remove('hidden');
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
  welcomeSection.classList.add('hidden');
}

// Muestra una sección interna (dentro de la app) y oculta las demás
function showSection(section) {
  homeSection.classList.add('hidden');
  formSection.classList.add('hidden');
  favoritesSection.classList.add('hidden');
  section.classList.remove('hidden');
}

/* Event Listeners para cambiar entre vistas de autenticación */

// Al hacer clic en "Get Started" se muestra la pantalla de Login
getStartedBtn.addEventListener('click', () => {
  showLogin();
});

// Cambiar entre Login y Registro
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.classList.add('hidden');
  registerSection.classList.remove('hidden');
});
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
});

/* Manejo de formularios de Login y Registro */

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    loginForm.reset();
  } catch (error) {
    console.error("Error in login:", error);
    alert("Login failed: " + error.message);
  }
});

// Registro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    registerForm.reset();
  } catch (error) {
    console.error("Error in registration:", error);
    alert("Registration failed: " + error.message);
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
});

/* Observador del estado de autenticación */

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("User is signed in:", user);
    showApp();
    loadUserRecipes();
  } else {
    currentUser = null;
    console.log("No user signed in");
    showWelcome();
  }
});

/* Función para cargar recetas del usuario actual */

function loadUserRecipes() {
  const recipesQuery = query(collection(db, "recipes"), where("owner", "==", currentUser.uid));
  onSnapshot(recipesQuery, (snapshot) => {
    recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderRecipes();
    renderFavorites();
  });
}

/* Navegación interna de la app */

addRecipeBtn.addEventListener('click', () => {
  recipeForm.reset();
  currentEditId = null;
  showSection(formSection);
});

backBtn.addEventListener('click', () => {
  showSection(homeSection);
});

backFavBtn.addEventListener('click', () => {
  showSection(homeSection);
});

homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(homeSection);
});

favoritesLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(favoritesSection);
});

/* Manejo del formulario de recetas (Agregar/Editar) */

recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('recipe-title').value.trim();
  const ingredients = document.getElementById('recipe-ingredients').value.trim();
  const type = document.getElementById('recipe-type').value;
  const isFavorite = document.getElementById('favorite-check').checked;
  
  if (!title || !ingredients || !type) {
    alert('Please fill in all required fields.');
    return;
  }
  
  try {
    if (currentEditId) {
      // Actualizar receta existente
      const recipeRef = doc(db, "recipes", currentEditId);
      await updateDoc(recipeRef, { title, ingredients, type, isFavorite });
      currentEditId = null;
    } else {
      // Agregar nueva receta, asociándola al usuario actual
      await addDoc(collection(db, "recipes"), { title, ingredients, type, isFavorite, owner: currentUser.uid });
    }
    recipeForm.reset();
    // Luego de guardar, redirige a la pantalla principal (Home)
    showSection(homeSection);
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
});

/* Funciones para editar y eliminar recetas */

// Inicia la edición: llena el formulario con los datos de la receta seleccionada
function startEditRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    document.getElementById('recipe-title').value = recipe.title;
    document.getElementById('recipe-ingredients').value = recipe.ingredients;
    document.getElementById('recipe-type').value = recipe.type;
    document.getElementById('favorite-check').checked = recipe.isFavorite;
    currentEditId = recipe.id;
    showSection(formSection);
  }
}

// Elimina una receta
async function deleteRecipe(id) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    try {
      await deleteDoc(doc(db, "recipes", id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }
}

/* Función para filtrar recetas según búsqueda y filtro de categoría */

function getFilteredRecipes() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const filterValue = filterSelect.value;
  return recipes.filter(recipe => {
    const titleMatch = recipe.title.toLowerCase().includes(searchQuery);
    const ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchQuery);
    const searchMatch = titleMatch || ingredientsMatch;
    const filterMatch = filterValue === '' || recipe.type === filterValue;
    return searchMatch && filterMatch;
  });
}

/* Renderizar recetas en la sección Home */

function renderRecipes() {
  const recipeListDiv = document.getElementById('recipe-list');
  recipeListDiv.innerHTML = '';
  
  const filteredRecipes = getFilteredRecipes();
  
  if (filteredRecipes.length === 0) {
    recipeListDiv.innerHTML = '<p>No recipes found. Please add one!</p>';
  } else {
    filteredRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <p><strong>Meal Type:</strong> ${recipe.type}</p>
        <p>${recipe.ingredients.substring(0, 50)}...</p>
        <button class="edit-btn" data-id="${recipe.id}">Edit</button>
        <button class="delete-btn" data-id="${recipe.id}">Delete</button>
      `;
      if (recipe.isFavorite) {
        const favIndicator = document.createElement('span');
        favIndicator.textContent = '❤️ ';
        card.insertBefore(favIndicator, card.firstChild);
      }
      recipeListDiv.appendChild(card);
    });
    
    // Asigna eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        startEditRecipe(id);
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        deleteRecipe(id);
      });
    });
  }
}

/* Renderizar recetas favoritas en la sección Favorites */

function renderFavorites() {
  const favoriteListDiv = document.getElementById('favorite-list');
  favoriteListDiv.innerHTML = '';
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
  if (favoriteRecipes.length === 0) {
    favoriteListDiv.innerHTML = '<p>No favorite recipes yet.</p>';
  } else {
    favoriteRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <p><strong>Meal Type:</strong> ${recipe.type}</p>
        <p>${recipe.ingredients.substring(0, 50)}...</p>
        <button class="edit-btn" data-id="${recipe.id}">Edit</button>
        <button class="delete-btn" data-id="${recipe.id}">Delete</button>
      `;
      card.insertAdjacentHTML('afterbegin', '<span>❤️ </span>');
      favoriteListDiv.appendChild(card);
    });
    favoriteListDiv.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        startEditRecipe(id);
      });
    });
    favoriteListDiv.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        deleteRecipe(id);
      });
    });
  }
}

// Event listeners para búsqueda y filtro
searchInput.addEventListener('input', renderRecipes);
filterSelect.addEventListener('change', renderRecipes);
