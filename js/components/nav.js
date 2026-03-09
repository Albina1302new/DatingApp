const headerContainer = document.querySelector("#site-header");

export const renderHeader = () => {
  if (!headerContainer) return;

  const currentPath = window.location.pathname.split("./nav.js").pop(); // наприклад "profil.html"

  const headerTemplate = `
    <nav class="main-nav">
      <a href="index.html" class="nav-logo">DatingApp</a>
      <ul class="nav-list">
       
        <li>
          <a href="profil.html" class="nav-link ${currentPath === "profil.html" ? "nav-link--active" : ""}"><img src="images/inactive.svg" class="nav-icon"></a>
        </li>
        <li>
          <a href="dialog.html" class="nav-link ${currentPath === "dialog.html" ? "nav-link--active" : ""}"><img src="images/chat.svg" class="nav-icon"></a>
        </li>
        <li>
          <a href="favoriter.html" class="nav-link ${currentPath === "favoriter.html" ? "nav-link--active" : ""}"><img src="images/indicator.svg" class="nav-icon"></a>
        </li>
      </ul>
    </nav>
  `;

  headerContainer.innerHTML = headerTemplate;
};
