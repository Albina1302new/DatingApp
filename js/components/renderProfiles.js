import { addToFav } from "./favorites/storeFavorites.js";

export const renderProfiles = (list) => {
  const container = document.querySelector(".profiles__container");

  if (!container) return;

  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>Ingen profiler fundet…</p>";
    return;
  }

  list.forEach((user) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="profile-item">

        <article class="profile-card">

          <img src="${user.imageSrc}" alt="${user.name}" class="profile-img">

          <div class="profile-info">
            <h3 class="profile-h">${user.name}, ${user.age}</h3>
            <p class="profile-p">${user.about}</p>
          </div>

        </article>

        <div class="profile-actions">

          <button class="action-btn dislike">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="5" y1="5" x2="19" y2="19"/>
              <line x1="19" y1="5" x2="5" y2="19"/>
            </svg>
          </button>

          <button class="action-btn like" data-id="${user.id}">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              C2 6 4 4 6.5 4 
              C8.04 4 9.54 4.81 10.35 6.09 
              C11.16 4.81 12.66 4 14.2 4 
              C16.7 4 18.7 6 18.7 8.5 
              C18.7 12.28 15.3 15.36 10.15 20.04L12 21.35Z"/>
            </svg>
          </button>

          <button class="action-btn message" data-id="${user.id}">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
</svg>
</button>

        </div>

      </div>
      `,
    );
  });

  container.addEventListener("click", (e) => {
    const dislikeBtn = e.target.closest(".dislike");
    const messageBtn = e.target.closest(".message");

    if (dislikeBtn) {
      const card = dislikeBtn.closest(".profile-item");
      if (card) card.remove();
    }

    if (messageBtn) {
      window.location.href = "dialog.html";
    }
  });
};
