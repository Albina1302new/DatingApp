import { renderHeader } from "./components/nav.js";
import { hero } from "./components/hero.js";
import { renderFavorites } from "./components/favorites/renderFavorites.js";
import { renderFakeMessages } from "./components/dialog/renderMessanges.js";
import { renderJulia } from "./components/renderJulia.js";

renderHeader();

if (document.querySelector(".hero")) {
  hero();
}
if (document.querySelector(".profile-page")) {
  renderJulia();
}
const favContainer = document.querySelector(".fav__container");

if (favContainer) {
  renderFavorites();
}
/* if (document.querySelector(".fav__container")) {
  renderFavorites();
} */
if (window.location.pathname.includes("dialog.html")) {
  renderFakeMessages();
}
