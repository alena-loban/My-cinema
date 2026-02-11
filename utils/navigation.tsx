'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';

type Props = {
  links: {
    label: string;
    href: string;
    enabled: boolean;
  }[];
};

const Navigation = ({ links }: Props) => {
  const pathName = usePathname();
  const session = useSession();
  console.log(session);

  const filteredLinks = useMemo(() => {
    return links.filter(({ enabled }) => enabled);
  }, [links]);

  return (
    <>
      {filteredLinks.map(({ label, href }) => {
        const isActive = pathName === href;
        return (
          <Link
            key={label}
            href={href}
            style={{ color: isActive ? 'white' : 'inherit' }}
          >
            {label}
          </Link>
        );
      })}
      {session?.user?.role === 'ADMIN' && <Link href={'/admin'}>Admin</Link>}
      {/* {session?.data ? ( 
     <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
         SignOut
        </Link>
      ) : (
       <Link href={'/api/auth/signin'}>SignIn</Link>
       )} */}
    </>
  );
};
export default Navigation;
