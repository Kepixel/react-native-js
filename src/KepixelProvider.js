import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const KepixelContext = createContext({});

const KepixelProvider = ({ instance, children }) => (
  <KepixelContext.Provider value={instance}>{children}</KepixelContext.Provider>
);

KepixelProvider.propTypes = {
  instance: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default KepixelProvider;
