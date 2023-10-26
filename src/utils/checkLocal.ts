export const getIsLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return Boolean(localStorage.getItem('isLoggedIn')) || false;
  }
  return false;
};

export const saveDataToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadDataFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
  const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};