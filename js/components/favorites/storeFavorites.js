const STORAGE_KEY = "favorites";

let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const addToFav = (user) => {
  const exist = favorites.find((fav) => fav.id === user.id);

  if (!exist) {
    favorites.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFav = (id) => {
  favorites = favorites.filter((user) => user.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const getAllFavorites = () => {
  return favorites;
};
