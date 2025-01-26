export function getCookie(name) {
  try {
    const value = localStorage.getItem(name);
    return value || null;
  } catch (error) {
    console.error('Error getting item from localStorage:', error);
    return null;
  }
}

// Optional: You might want to add a setCookie function as well
export function setCookie(name, value) {
  try {
    localStorage.setItem(name, value);
    return true;
  } catch (error) {
    console.error('Error setting item in localStorage:', error);
    return false;
  }
}

// Optional: And a removeCookie function
export function removeCookie(name) {
  try {
    localStorage.removeItem(name);
    return true;
  } catch (error) {
    console.error('Error removing item from localStorage:', error);
    return false;
  }
}
