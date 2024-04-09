import React from 'react';
import Loader from 'react-loader-spinner';

export const AppLoading = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gray-900">
    <Loader type="Puff" color="#fff" height={40} width={40} />
  </div>
);
