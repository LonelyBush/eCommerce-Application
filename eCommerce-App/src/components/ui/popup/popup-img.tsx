import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderButton from '../slider-button/slider-button';
import { IProductCard } from '../product-card/product-card-interface';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from '../button/button';
import styles from './popup-img.module.css';

interface PopUpProps {
  productCard: IProductCard;
  initialImageUrl: string;
  onClose: () => void;
}

function PopUpImg({ productCard, initialImageUrl, onClose }: PopUpProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <div className={styles.popupContentImg}>
          <Swiper
            style={{ marginLeft: 'unset', marginRight: 'unset' }}
            className={styles.swiper}
            modules={[Navigation]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            spaceBetween={25}
            slidesPerView={1}
            initialSlide={productCard.imageUrlArray.indexOf(initialImageUrl)}
          >
            {productCard.imageUrlArray.map((imgUrl) => (
              <SwiperSlide key={imgUrl}>
                <div className={styles.popupImageBlock}>
                  <img
                    src={imgUrl}
                    alt={imgUrl}
                    className={styles.popupImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.sliderBtns}>
            <SliderButton classNames="prev" />
            <SliderButton classNames="next" />
          </div>
          <Button btnType="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUpImg;
