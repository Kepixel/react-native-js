import React, { createContext, ReactNode } from 'react';
import KepixelTracker from './KepixelTracker.js';

export type KepixelContextValue = KepixelTracker;

export const KepixelContext = createContext<KepixelContextValue | null>(null);

export interface KepixelProviderProps {
  instance: KepixelTracker;
  children: ReactNode;
}

const KepixelProvider: React.FC<KepixelProviderProps> = ({ instance, children }) => (
  <KepixelContext.Provider value={instance}>{children}</KepixelContext.Provider>
);

export default KepixelProvider;
