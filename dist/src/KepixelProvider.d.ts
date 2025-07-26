import React, { ReactNode } from 'react';
import KepixelTracker from './KepixelTracker.js';
export type KepixelContextValue = KepixelTracker;
export declare const KepixelContext: any;
export interface KepixelProviderProps {
    instance: KepixelTracker;
    children: ReactNode;
}
declare const KepixelProvider: React.FC<KepixelProviderProps>;
export default KepixelProvider;
