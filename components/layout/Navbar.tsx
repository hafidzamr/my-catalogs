import Link from 'next/link';
import style from './Navbar.module.scss';

const Navbar = (): JSX.Element => {
  return (
    <nav className={style['nav-container']}>
      <div className={style['nav-wrapper']}>
        <Link href={'/'} passHref>
          <a className={style['nav-logo']}>My-Catalogs</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
