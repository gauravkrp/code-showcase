declare module 'next/dist/next-server/lib/utils' {
  export interface NextPageContext {
    store: Store<RootState>;
  }
}

declare module 'next/dist/next/lib/utils' {
  export interface NextPageContext {
    store: Store<RootState>;
  }
}
