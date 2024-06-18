import HeaderMainPage from '../../components/header-main-page/header-main-page';
import MainContent from '../../components/main-content/main-content';
import Footer from '../../components/footer/footer';
import useCountCart from '../../components/header-main-page/useCountCart-hook';

function MainPage() {
  const { countCart } = useCountCart();
  return (
    <>
      <HeaderMainPage countCart={countCart.count} />
      <MainContent />
      <Footer />
    </>
  );
}

export default MainPage;
