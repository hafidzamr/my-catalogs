import { forwardRef } from 'react';
import Image from 'next/image';
import { currencyFormatter } from '@/utils';
import style from './Card.module.scss';

interface CardProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string;
  price: number;
  image: string;
}

const Card = forwardRef<HTMLAnchorElement, CardProps>(({ title, price, image, ...rest }, ref): JSX.Element => {
  return (
    <a className={style['card']} ref={ref} {...rest}>
      <Image src={image} alt={title} layout='responsive' width={150} height={130} className={style['card__image']} objectFit='cover' />
      <div className={style['card__content']}>
        <h3 className={style['card__content-title']}>{title}</h3>
        <p className={style['card__content-price']}>{currencyFormatter(price)}</p>
      </div>
    </a>
  );
});

Card.displayName = 'Card';

export default Card;
