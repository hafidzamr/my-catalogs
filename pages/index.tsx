import { useState, useEffect, useRef, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';

import { fetcher } from '@/utils';
import { ProductProps } from '@/types';
import Layout from '@/components/layout';

import { ProductCard as Card } from '@/components/ui';
import style from '@/styles/Product.module.scss';

// because dont'have meta data from mock api,so i assume max page is 10
const MAX_PAGE = 10;

type Props = {
  productList: ProductProps[];
};

const fetchGetProducts = async (endpoint: string) => {
  const response = await fetcher.get(endpoint);
  return response.data;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetchGetProducts('/products?_page=1&_limit=20');
  const productList: ProductProps[] = response;
  return { props: { productList } };
};

const Home = ({ productList }: Props) => {
  const [products, setProducts] = useState<ProductProps[]>(productList);
  const [page, setPage] = useState<number>(1);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery<ProductProps[]>(['products', page], () => fetchGetProducts(`/products?_page=${page}&_limit=20`), {
    enabled: page !== 1,
    refetchOnWindowFocus: false,
  });

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevState) => prevState + 1);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setProducts((prevState) => [...prevState, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (triggerRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      });
      observer.observe(triggerRef.current);
    }
  }, [handleObserver]);

  return (
    <Layout>
      <div className={style['product__banner']}>
        <Image
          src='https://res.cloudinary.com/du4c8fvmo/image/upload/v1656236142/banner-_u1eifs.png'
          width={300}
          height={100}
          alt='banner'
          objectFit='cover'
          layout='responsive'
          className={style['product__banner-image']}
        />
      </div>

      <section className={style['product__list']}>
        {products.map((product) => (
          <div key={product.id} className={style['product__list-item']}>
            <NextLink href={`/detail/${product.id}`} passHref key={product.id} target='_self'>
              <a>
                <Card image={product.images[0]} title={product.product_name} price={product.price} />
              </a>
            </NextLink>
          </div>
        ))}

        {/* Trigger for fecthing next page */}
        {page < MAX_PAGE && <div ref={triggerRef} className='mt-200' />}
      </section>
    </Layout>
  );
};

export default Home;
