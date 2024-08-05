import { apiClient } from "./services";

export default {
  // Create a new favorite
  add_favorite(favorite) {
    return apiClient.post("resume_favorites", favorite);
  },

  // Retrieve all favorites
  get_all_favorites() {
    return apiClient.get("resume_favorites");
  },

  // Retrieve a single favorite by ID
  get_favorite_by_id(favorite_id) {
    return apiClient.get(`resume_favorites/${favorite_id}`);
  },

  // Update a favorite by ID
  update_favorite(favorite) {
    return apiClient.put(`resume_favorites/${favorite.id}`, favorite);
  },

  // Delete a favorite by ID
  delete_favorite(favorite_id) {
    return apiClient.delete(`resume_favorites/${favorite_id}`);
  },

  // Delete all favorites
  delete_all_favorites() {
    return apiClient.delete("resume_favorites");
  },

  // Delete all favorites for a specific user
  delete_favorites_by_user_id(user_id) {
    return apiClient.delete(`resume_favorites/user/${user_id}`);
  },
  // Store favorites on logout
  storeFavoritesOnLogout(data) {
    return apiClient.post("resume_favorites/storeFavoritesOnLogout", data);
  },

  // Retrieve favorites on login
  getFavoritesOnLogin(user_id) {
    return apiClient.get(`resume_favorites/getFavoritesOnLogin/${user_id}`);
  },
};
