declare module 'react' {
  export type ChangeEvent<T = Element> = {
    target: T & { value: string };
    preventDefault(): void;
  };
  
  export type FormEvent<T = Element> = {
    preventDefault(): void;
  };
  
  export type ReactElement = any;
  
  export type FC<P = {}> = (props: P) => ReactElement;
  
  export function useState<T>(initialState: T): [T, (newState: T) => void];
  
  export const Fragment: any;
}

declare module 'next/link' {
  import { ReactElement } from 'react';
  
  interface LinkProps {
    href: string;
    className?: string;
    children: ReactElement | string;
  }
  
  export default function Link(props: LinkProps): ReactElement;
} 