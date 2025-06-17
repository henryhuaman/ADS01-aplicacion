/// <reference types="vite/client" />
declare module '*.css';
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.png" {
  const value: string;
  export default value;
}

// src/react-unicons.d.ts
declare module '@iconscout/react-unicons' {
  import { ComponentType } from 'react';

  export const UilSignOutAlt: ComponentType<any>;
  export const UilBars: ComponentType<any>;
  export const UilClipboardAlt: ComponentType<any>;
  export const UilUsdSquare: ComponentType<any>;
  export const UilMoneyWithdrawal: ComponentType<any>;
  // ...añade más íconos que uses si es necesario
}