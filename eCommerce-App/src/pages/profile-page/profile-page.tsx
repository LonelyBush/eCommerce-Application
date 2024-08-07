import HeaderMainPage from '../../components/header-main-page/header-main-page';
import PersonalInfoView from '../../components/profile-content/profile-content';
import Footer from '../../components/footer/footer';
import useCountCart from '../../components/header-main-page/useCountCart-hook';

function ProfilePage() {
  const { countCart } = useCountCart();
  return (
    <>
      <HeaderMainPage countCart={countCart.count} />
      <PersonalInfoView />
      <Footer />
    </>
  );
}

export default ProfilePage;
