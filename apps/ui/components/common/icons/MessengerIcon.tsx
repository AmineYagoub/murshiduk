import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const SVG = () => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 40 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 .914C17.995.914.937 17.033.937 38.804c0 11.389 4.668 21.23 12.268 28.026a3.12 3.12 0 011.05 2.227l.212 6.95c.068 2.215 2.358 3.658 4.386 2.763l7.753-3.423a3.115 3.115 0 012.087-.153A42.602 42.602 0 0040 76.695c22.005 0 39.063-16.118 39.063-37.89C79.063 17.033 62.005.915 40 .915z"
        fill="url(#paint0_radial)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.543 49.886L28.018 31.68a5.86 5.86 0 018.472-1.563l9.127 6.844c.837.628 1.989.625 2.823-.008L60.765 27.6c1.645-1.248 3.793.72 2.692 2.467L51.982 48.272a5.86 5.86 0 01-8.472 1.563l-9.127-6.845A2.344 2.344 0 0031.56 43l-12.325 9.354c-1.646 1.248-3.793-.72-2.692-2.467z"
        fill="#fff"
      />
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-57.092 80.25 24.628) scale(85.1246)"
        >
          <stop stopColor="#09F" />
          <stop offset=".61" stopColor="#A033FF" />
          <stop offset=".935" stopColor="#FF5280" />
          <stop offset="1" stopColor="#FF7061" />
        </radialGradient>
      </defs>
    </svg>
  );
};
const MessengerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SVG} {...props} />
);
export default MessengerIcon;
