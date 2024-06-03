import { useEffect } from 'react';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
// import ProductCard from '../../components/ui/product-card/product-card';
import {
  IProductCard,
  IPrice,
} from '../../components/ui/product-card/product-card-interface';
// import getProductById from '../../api/getProductById';
import PriceInput from '../../components/price-input/price-input';
import getAllProducts from '../../api/getAllProduct';
// import styles from './catalog-pafe.module.css';

function CatalogPage() {
  // const [productCards, setProductCards] = useState<IProductCard[]>([]);
  // const [queryArgs, setQueryArgs] = useState<object>({});
  // const minPrice1 = 1;
  // const maxPrice1 = 2;
  // const queryArgs = {
  //   where: [
  //     `masterVariant(prices(value(centAmount >= ${minPrice1 * 100} and centAmount <= ${maxPrice1 * 100})))`,
  //   ],
  // };

  // const [productCard, setProductCard] = useState<IProductCard>({
  //   id: '',
  //   imageUrl: '',
  //   name: '',
  //   key: '',
  //   description: '',
  //   price: 0,
  //   discount: 0,
  // });

  useEffect(() => {
    getAllProducts().then((res) => {
      console.log('prod', res.productProjectionArr);
    });

    getAllProducts()
      .then((res) => {
        const newProductCards: IProductCard[] = res.productProjectionArr
          ?.map((product) => {
            if (product) {
              const { images } = product.masterVariant;
              let imageUrl = '';
              if (images && images.length > 0) imageUrl = images[0].url;

              const name = product.name['en-US'];
              const key = product.key || '';
              let description = '';
              if (product.description)
                description = product.description['en-US'];

              let price = 0;
              let discount = 0;
              if (product.masterVariant.prices) {
                const usPrice = product.masterVariant.prices.find(
                  (priceArr: IPrice) => priceArr.country === 'US',
                );
                if (usPrice) {
                  price = usPrice.value.centAmount / 100;
                  discount = usPrice.discounted?.value.centAmount ?? 0;
                  if (typeof discount === 'number') {
                    discount /= 100;
                  }
                }
              }

              return {
                id: product.id,
                imageUrl,
                name,
                key,
                description,
                price,
                discount,
              };
            }
            return null;
          })
          .filter((card) => card !== null) as IProductCard[];

        setProductCards(newProductCards);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });
  }, []);

  // const { imageUrl, name } = productCard;

  // if (!imageUrl || !name) {
  //   return <div>Loading...</div>;
  // }
  //     })

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    console.log(
      `Минимальная цена: ${minPrice}, Максимальная цена: ${maxPrice}`,
    );

    // const newQueryArgs = {
    //   where: [
    //     `masterVariant(prices(value(centAmount >= ${minPrice * 100} and centAmount <= ${maxPrice * 100})))`,
    //   ],
    // };
    // // setQueryArgs(newQueryArgs);
  };

  return (
    <>
      <HeaderMainPage />

      <div>
        <PriceInput onPriceChange={handlePriceChange} />
      </div>
    </>
  );
}

export default CatalogPage;
