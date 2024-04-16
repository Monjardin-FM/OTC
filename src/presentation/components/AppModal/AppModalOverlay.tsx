import React, { ReactNode } from 'react';

export interface AppModalOverlayProps {
  children?: ReactNode;
}

export const AppModalOverlay = ({ children }: AppModalOverlayProps) => (
  <div className="w-full min-h-screen bg-black bg-opacity-70">
    <div className="container mx-auto  pt-8 py-0">{children}</div>
  </div>
);
