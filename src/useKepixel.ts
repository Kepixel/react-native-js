import { useContext } from 'react';
import { KepixelContext, KepixelContextValue } from './KepixelProvider.js';

const useKepixel = (): KepixelContextValue => {
    const instance = useContext(KepixelContext);
    if (!instance) {
        throw new Error('useKepixel must be used within a KepixelProvider');
    }
    return instance;
};

export default useKepixel;
