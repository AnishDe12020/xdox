import { SVGProps } from "react";

const Heading2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4a3.75 3.75 0 012.978 6.03l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546a1.75 1.75 0 10-3.064-1.292l-.006.144h-2A3.75 3.75 0 0118.5 8z"
      fill="currentColor"
    />
  </svg>
);

export default Heading2;
