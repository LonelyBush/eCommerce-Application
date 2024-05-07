import getProject from '../../api/api-client';

getProject().then(console.log).catch(console.error);

function LoginPage() {
  return <div>login page</div>;
}

export default LoginPage;
