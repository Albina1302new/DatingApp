// fetch/fetchUsers.js
export async function fetchUsers() {
  try {
    const response = await fetch("data/users.json");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Der er opstået en fejl", error);
    return [];
  }
}
