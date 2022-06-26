import { GetServerSideProps } from 'next';

import Layout from '@/components/layout';
import { ProductImageSlider as ImageSlider } from '@/components/ui';
import { fetcher, currencyFormatter } from '@/utils';
import { ProductProps } from '@/types';

import style from '@/styles/Product.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetcher.get<ProductProps>(`/products/${id}`);
  const product = response.data;

  return {
    props: { ...product },
  };
};

const DetailPrudct = (product: ProductProps) => {
  return (
    <Layout>
      <div className={style['product__detail']}>
        <div className={style['pdp-image']}>
          <ImageSlider images={product.images} />
        </div>
        <div className={style['pdp-content']}>
          <h3 className={style['title']}>{product.product_name}</h3>

          <span className={style['price']}>{currencyFormatter(product.price)}</span>
          <p className={style['description']}>{product.description}</p>
        </div>
      </div>
    </Layout>
  );
};
export default DetailPrudct;
