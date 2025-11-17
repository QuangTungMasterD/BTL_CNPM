'use client'

import React, { createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";


export const ToastContext = createContext('');

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = {
    toast
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ToastContext.Provider>
  )

}
