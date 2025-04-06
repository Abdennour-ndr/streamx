/// <reference types="react" />
/// <reference types="next" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

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
  
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  
  export const Fragment: any;
}

declare module 'next/link' {
  import { ReactElement } from 'react';
  
  interface LinkProps {
    href: string;
    className?: string;
    children?: ReactElement | string;
  }
  
  export default function Link(props: LinkProps): ReactElement;
} 