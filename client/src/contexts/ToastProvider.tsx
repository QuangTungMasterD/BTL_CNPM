'use client'

import React, { createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";


export const ToastContext = createContext('');

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    toast
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </ToastContext.Provider>
  )

}
