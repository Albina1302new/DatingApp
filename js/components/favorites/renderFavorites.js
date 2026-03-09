import { getAllFavorites, removeFromFav } from "./storeFavorites.js";

export const renderFavorites = () => {
  const container = document.querySelector(".fav__container");

  if (!container) return;

  const favorites = getAllFavorites();

  container.innerHTML = "";

  if (!favorites.length) {
    container.innerHTML = "<p>Du har ingen favoritter endnu</p>";
    return;
  }

  favorites.forEach((user) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="profile-card">
        <img src="${user.imageSrc}" alt="${user.name}">
        <h3>${user.name}, ${user.age}</h3>
        <p>${user.about}</p>

        <button class="removeFav" data-id="${user.id}">
          Fjern fra favoritter
        </button>
      </article>
      `,
    );
  });

  const removeBtns = container.querySelectorAll(".removeFav");

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);

      removeFromFav(id);

      renderFavorites();
    });
  });
};
