// ./js/components/hero.js
import { fetchUsers } from "../fetch/fetchUsers.js";
import { renderProfiles } from "./renderProfiles.js";

// ГЛОБАЛЬНІ ЗМІННІ ФІЛЬТРІВ
let activeFilters = {
  genders: [],
  hobbies: [],
  children: [],
  pets: [],
  maxAge: 50,
};

// ФУНКЦІЇ ФІЛЬТРІВ (БУДУТЬ ВИКЛИКАНІ З hero)
const addFilter = (value) => {
  if (value === "girls") activeFilters.genders.push("female");
  if (value === "boys") activeFilters.genders.push("male");
  if (value === "sport") activeFilters.hobbies.push("sport");
  if (value === "rejser") activeFilters.hobbies.push("rejser");
  if (value === "boeger") activeFilters.hobbies.push("læser bøger");
  if (value === "har-dyr") activeFilters.pets.push("har");
  if (value === "har-born") activeFilters.children.push("har");
  if (value === "ingen-born") activeFilters.children.push("ingen");
};

const removeFilter = (value) => {
  if (value === "girls")
    activeFilters.genders = activeFilters.genders.filter((g) => g !== "female");
  if (value === "boys")
    activeFilters.genders = activeFilters.genders.filter((g) => g !== "male");
  if (value === "sport")
    activeFilters.hobbies = activeFilters.hobbies.filter((h) => h !== "sport");
  if (value === "rejser")
    activeFilters.hobbies = activeFilters.hobbies.filter((h) => h !== "rejser");
  if (value === "boeger")
    activeFilters.hobbies = activeFilters.hobbies.filter(
      (h) => h !== "læser bøger",
    );
  if (value === "har-dyr")
    activeFilters.pets = activeFilters.pets.filter((p) => p !== "har");
  if (value === "har-born")
    activeFilters.children = activeFilters.children.filter((c) => c !== "har");
  if (value === "ingen-born")
    activeFilters.children = activeFilters.children.filter(
      (c) => c !== "ingen",
    );
};

const filterUsers = (list, filters) => {
  return list.filter((user) => {
    if (filters.genders.length > 0 && !filters.genders.includes(user.gender))
      return false;
    if (user.age > filters.maxAge) return false;
    if (filters.hobbies.length > 0 && !filters.hobbies.includes(user.hobby))
      return false;
    if (
      filters.children.length > 0 &&
      !filters.children.includes(user.children)
    )
      return false;
    if (filters.pets.length > 0 && !filters.pets.includes(user.pets))
      return false;
    return true;
  });
};

const setupFilterLogic = (users) => {
  const filterToggle = document.getElementById("filterToggle");
  const filterPanel = document.getElementById("filterPanel");
  const backBtn = document.querySelector(".back-btn");
  const chips = document.querySelectorAll(".filter-chip");
  const ageRange = document.querySelector(".age-range");
  const ageDisplay = document.querySelector(".range-display");
  const doneBtn = document.querySelector(".filter-done");

  filterToggle?.addEventListener("click", () => {
    filterPanel.classList.add("filter-panel--open");
  });

  backBtn?.addEventListener("click", () => {
    filterPanel.classList.remove("filter-panel--open");
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.filter;
      const isActive = chip.classList.contains("filter-chip--active");

      if (isActive) {
        chip.classList.remove("filter-chip--active");
        removeFilter(value);
      } else {
        chip.classList.add("filter-chip--active");
        addFilter(value);
      }
    });
  });

  ageRange?.addEventListener("input", () => {
    activeFilters.maxAge = Number(ageRange.value);
    ageDisplay.textContent = `18-${ageRange.value}`;
  });

  doneBtn?.addEventListener("click", () => {
    const filtered = filterUsers(users, activeFilters);
    renderProfiles(filtered);
    filterPanel.classList.remove("filter-panel--open");
  });
};

// ✅ ОСНОВНА ФУНКЦІЯ (ЕКСПОРТИМО ЇЇ)
const heroContainer = document.querySelector(".hero");

export const hero = async () => {
  if (!heroContainer) return;

  const heroTemplate = () => {
    return `
      <div class="hero-background"></div>
      
      <div class="hero-header">
        <div class="profile-row">
          <div class="profile-avatar">
            <img src="images/profile.jpg" alt="Julia">
          </div>
          <div class="profile-text">
            <h3 class="profile-name">Julia K, 25</h3>
          </div>
        </div>
        
        <div class="filter-trigger" id="filterToggle">
          <img src="images/header.svg" alt="Filters" class="filter-icon">
        </div>
      </div>
      
      <div class="filter-panel" id="filterPanel">
        <div class="filter-header">
          <button class="back-btn">&larr;</button>
          <h2>Filters</h2>
        </div>
        
        <div class="filter-grid">
          <button class="filter-chip filter-chip--active" data-filter="girls">Girls</button>
          <button class="filter-chip" data-filter="boys">Boys</button>
          <button class="filter-chip" data-filter="sport">Sport</button>
          <button class="filter-chip" data-filter="rejser">Rejser</button>
          <button class="filter-chip" data-filter="boeger">Bøger</button>
          <button class="filter-chip" data-filter="har-dyr">Har Dyr</button>
          <button class="filter-chip" data-filter="har-born">Har Børn</button>
          <button class="filter-chip" data-filter="ingen-born">Ingen Børn</button>
        </div>
        
        <div class="filter-age">
          <label>Alder</label>
          <div class="range-wrapper">
            <span class="range-display">18-50</span>
            <input type="range" class="age-range" min="18" max="50" value="50">
          </div>
        </div>
        
        <button class="filter-done">Continue</button>
      </div>
    `;
  };

  heroContainer.innerHTML = heroTemplate();

  // Завантажуємо профілі
  const users = await fetchUsers();
  renderProfiles(users);
  setupFilterLogic(users);
};
