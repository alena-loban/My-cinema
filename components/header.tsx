import { getServerSession } from 'next-auth';
import Navigation from '../utils/navigation';
import { authConfig } from '@/configs/auth';
import { signOut } from 'next-auth/react';

const Header = async () => {
  const session = await getServerSession(authConfig);

  const navLinks = [
    {
      href: '/',
      label: 'Home',
      enabled: true,
    },
    {
      href: '/affiche',
      label: 'Афиша',
      enabled: true,
    },
    {
      href: '/admin',
      label: 'Админ',
      enabled: session?.user?.role === 'ADMIN', //изменить
    },
    {
      href: '/profile',
      label: 'Профиль',
      enabled: session?.user?.email,
    },
    {
      href: '/api/auth/signin',
      label: 'Войти',
      enabled: !!!session?.user?.email,
    },
    {
      href: '#',
      label: 'Выйти',
      enabled: !!session?.user?.email,
      // onClick: () => signOut({ callbackUrl: '/' }),
    },
  ];
  return (
    <header
      style={{
        padding: '20px',
        backgroundColor: 'gray',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}
    >
      <Navigation links={navLinks} />
    </header>
  );
};
export default Header;
