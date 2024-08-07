import HeaderMainPage from '../../components/header-main-page/header-main-page';
import ProductInfo from '../../components/product-info/product-info';
import Footer from '../../components/footer/footer';
import useCountCart from '../../components/header-main-page/useCountCart-hook';

function ProductsPage() {
  const { countCart, setCountCart } = useCountCart();
  return (
    <>
      {' '}
      <HeaderMainPage countCart={countCart.count} />
      <ProductInfo setCountCart={setCountCart} />
      <Footer />
    </>
  );
}

export default ProductsPage;
