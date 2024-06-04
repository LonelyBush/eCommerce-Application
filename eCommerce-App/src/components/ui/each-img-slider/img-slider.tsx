import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import SliderButton from '../slider-button/slider-button';
import { IProductCardProps } from '../product-card/product-card-interface';
import PopUpImg from '../popup/popup-img';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './img-slider.module.css';

function ImgSlider({ productCard }: IProductCardProps) {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [currentImgUrl, setCurrentImgUrl] = useState<string>('');

  const handleImageClick = (imgUrl: string) => {
    setCurrentImgUrl(imgUrl);
    setIsPopUp(true);
  };

  const handleClosePopUp = () => {
    setIsPopUp(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    imgUrl: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleImageClick(imgUrl);
    }
  };

  return (
    <>
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
            <SwiperSlide key={imgUrl}>
              <div
                className={styles.productPageImgBlock}
                onClick={() => handleImageClick(imgUrl)}
                onKeyDown={(event) => handleKeyDown(event, imgUrl)}
                tabIndex={0}
                role="button"
              >
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
      {isPopUp && (
        <PopUpImg imageUrl={currentImgUrl} onClose={handleClosePopUp} />
      )}
    </>
  );
}

export default ImgSlider;
