/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { SwiperOptions } from 'swiper/types';

interface ImageSliderProps extends SwiperOptions {
  images: string[];
}
const ImageSlider = ({ images, loop = true, ...rest }: ImageSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        loop={loop}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Thumbs]}
        className='image__slider'
        {...rest}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='image__slider-wrapper'>
              <Image src={image} alt='product' width={390} height={390} layout='responsive' objectFit='contain' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={5} modules={[Thumbs, Navigation]} className='image__thumbs'>
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='image__thumbs-wrapper'>
              <Image src={image} alt='product' width={60} height={60} objectFit='contain' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
