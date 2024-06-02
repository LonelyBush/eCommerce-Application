import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderButton from '../slider-button/slider-button';
import { IProductCardProps } from '../product-card/product-card-interface';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './img-slider.module.css';

function ImgSlider({ productCard }: IProductCardProps) {
  return (
    <div className={styles.sliderBlock}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        spaceBetween={25}
        slidesPerView={1}
      >
        {productCard.imageUrlArray.map((imgUrl) => (
          <SwiperSlide key={productCard.key}>
            <div className={styles.productPageImgBlock}>
              <img
                src={imgUrl}
                alt={imgUrl}
                className={styles.productPageImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.sliderBtns}>
        <SliderButton classNames="prev" />
        <SliderButton classNames="next" />
      </div>
    </div>
  );
}

export default ImgSlider;
