export function saveIdToLocalStorage(id: string) {
  localStorage.setItem('product-id', id);
}

export function getIdFromLocalStorage() {
  const id = localStorage.getItem('product-id');
  return id ?? '';
}
