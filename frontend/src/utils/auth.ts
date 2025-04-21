import { TOKEN } from "./constants";

export const logout = (navigate: (path: string) => void) => {
    localStorage.removeItem(TOKEN);
    navigate("/signin");
};

export const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    const popEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popEvent);
  };
  