import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="https://s3.enjoystickk.com/carousel/logo.svg"
        alt="logo"
        width={150}
        height={60}
      />
    </Link>
  );
};

export default Logo;
