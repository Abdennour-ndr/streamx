declare module 'next/link' {
  import { ReactNode } from 'react';
  
  interface LinkProps {
    href: string;
    className?: string;
    children?: ReactNode;
  }
  
  const Link: (props: LinkProps) => JSX.Element;
  export default Link;
} 