import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="https://s3.enjoystickk.com/carousel/logo.svg"
      alt="logo"
      width={150}
      height={60}
    />
  );
};

export default Logo;
