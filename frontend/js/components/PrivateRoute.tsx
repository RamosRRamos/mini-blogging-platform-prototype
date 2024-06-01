const isAuthenticated = () => !!localStorage.getItem("token");
export const userSlug = localStorage.getItem("user_slug") || '';
export const userName = localStorage.getItem("user_name") || '';
export const userEmail = localStorage.getItem("user_email") || '';

export default {
  isAuthenticated,

};
