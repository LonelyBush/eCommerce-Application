export function saveToLocalStorage(key: string, id: string) {
  localStorage.setItem(key, id);
}

export function getFromLocalStorage(key: string) {
  const id = localStorage.getItem(key);
  return id ?? '';
}
