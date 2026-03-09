const STORAGE_KEY = "favorites";

export const getAllFavorites = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const addToFav = (user) => {
  const favorites = getAllFavorites();

  const exist = favorites.find((fav) => fav.id === user.id);

  if (!exist) {
    favorites.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFav = (id) => {
  let favorites = getAllFavorites();

  favorites = favorites.filter((user) => user.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};
