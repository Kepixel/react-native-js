import { useContext } from 'react';
import { KepixelContext } from './KepixelProvider.js';
const useKepixel = () => {
    const instance = useContext(KepixelContext);
    if (!instance) {
        throw new Error('useKepixel must be used within a KepixelProvider');
    }
    return instance;
};
export default useKepixel;
