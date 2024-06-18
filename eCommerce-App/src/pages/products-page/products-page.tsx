import HeaderMainPage from '../../components/header-main-page/header-main-page';
import ProductInfo from '../../components/product-info/product-info';
import Footer from '../../components/footer/footer';
import useCountCart from '../../components/header-main-page/useCountCart-hook';

function ProductsPage() {
  const { countCart } = useCountCart();
  return (
    <>
      {' '}
      <HeaderMainPage countCart={countCart.count} />
      <ProductInfo />
      <Footer />
    </>
  );
}

export default ProductsPage;
