export const useAuth = () => {
  const signIn = () => {
    localStorage.setItem("isAuthenticated", "true");
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const isLogged = () => localStorage.getItem("sb-sfxhowhcuxkrbzvmttct-auth-token");

  return { signIn, signOut, isLogged };
};
