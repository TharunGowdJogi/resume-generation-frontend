import { apiClient } from "./services";

export default {
  get_user(id) {
    return apiClient.get("users/"+id)
  },
  add_user(user) {
    return apiClient.post("users", user);
  },
  update_user(user) {
    return apiClient.put("users/" + user.id, user);
  },
  login_user(user) {
    console.log(user);
    return apiClient.post("login", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.email + ":" + user.password),
      },
    });
  },
  logout_user() {
    return apiClient.post("logout");
  },
  get_all_users() {
    return apiClient.get("users")
  },
  delete_user(id) {
    return apiClient.delete(`users/${id}`)
  },
};
