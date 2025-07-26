import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext } from 'react';
export const KepixelContext = createContext(null);
const KepixelProvider = ({ instance, children }) => (_jsx(KepixelContext.Provider, { value: instance, children: children }));
export default KepixelProvider;
