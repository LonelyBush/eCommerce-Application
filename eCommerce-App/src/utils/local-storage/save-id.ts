function saveIdToLocalStorage(id: string) {
  localStorage.setItem('product-id', id);
}

function getIdFromLocalStorage() {
  const id = localStorage.getItem('product-id');
  return id ?? '';
}

export { saveIdToLocalStorage, getIdFromLocalStorage };
