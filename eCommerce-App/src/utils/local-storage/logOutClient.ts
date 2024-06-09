export default function logOutClient() {
  localStorage.removeItem('authToken');
}
