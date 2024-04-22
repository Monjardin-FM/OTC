import React from 'react';
import Loader from 'react-loader-spinner';

export const AppLoading = () => (
  <div className="w-full h-screen flex flex-col gap-5 text-white items-center justify-center bg-primary-900">
    <Loader type="Puff" color="#fff" height={40} width={40} />
    <span>Loading</span>
  </div>
);
