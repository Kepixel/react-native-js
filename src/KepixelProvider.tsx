import React, { createContext, ReactNode } from 'react';

export const KepixelContext = createContext<any>({});

export interface KepixelProviderProps {
  instance: any;
  children: ReactNode;
}

const KepixelProvider: React.FC<KepixelProviderProps> = ({ instance, children }) => (
  <KepixelContext.Provider value={instance}>{children}</KepixelContext.Provider>
);

export default KepixelProvider;
