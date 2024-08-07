export default function logOutClient() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('personal-id');
  localStorage.removeItem('version');
}
