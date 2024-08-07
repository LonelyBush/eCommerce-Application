import { CartContent } from '../../components/cart-content/cart-content';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import Footer from '../../components/footer/footer';
import useCountCart from '../../components/header-main-page/useCountCart-hook';

function CartPage() {
  const { countCart, setCountCart } = useCountCart();
  return (
    <>
      <HeaderMainPage countCart={countCart.count} />
      <CartContent setCountCart={setCountCart} />
      <Footer />
    </>
  );
}

export default CartPage;
