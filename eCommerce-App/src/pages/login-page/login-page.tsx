import LoginForm from '../../components/login-form/login-form';
import LogoHeader from '../../components/ui/logo/logo';
import Tags from '../../components/ui/tags/tags';

function LoginPage() {
  return (
    <>
      <LogoHeader />
      <Tags.Container>
        <LoginForm />
      </Tags.Container>
    </>
  );
}

export default LoginPage;
