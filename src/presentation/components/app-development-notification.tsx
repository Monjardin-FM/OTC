import React, { useEffect } from 'react';
import * as Icon from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { useToggle } from 'react-use';

export const AppDevelopmentNotification = () => {
  const [on, toggle] = useToggle(true);

  useEffect(() => {
    toggle(process.env.REACT_APP_DEV_MODE === 'true');
  }, []);
  useEffect(() => {
    setTimeout(() => {
      toggle(false);
    }, 3000);
  }, []);

  return (
    <AnimatePresence>
      {on && (
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, top: -40 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -40 }}
            className="fixed shadow-sm py-6 z-50 w-2/3 filter backdrop-filter backdrop-blur-md  justify-self-center border border-warn-700 rounded-xl bg-warn-200 bg-opacity-90 border-opacity-20"
          >
            <div className="container mx-auto px-4 flex items-center space-x-4">
              <div className="flex-grow flex items-center space-x-4">
                <div className="text-warn-700">
                  <Icon.Info />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    ¡Advertencia! Actualmente se encuentra en un entorno de
                    pruebas. La información generada a partir de esta versión
                    podria no guardarse correctamente
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    toggle(false);
                  }}
                  className="text-gray-700 p-2 transition duration-500 opacity-60 hover:opacity-100 appearance-none focus:outline-none"
                >
                  <Icon.X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
