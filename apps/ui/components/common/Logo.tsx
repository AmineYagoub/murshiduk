import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={`/img/logo.svg`}
        alt="مرشدك الى تركيا"
        width={150}
        height={60}
        style={{ padding: 5 }}
      />
    </Link>
  );
};

export default Logo;
