'use client'

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";

function Popup({
  children,
  state = false,
  setState,
}: {
  children: React.ReactNode;
  state?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState?: any
}) {

  const handleClosePopup = () => {
    setState(false);
  }

  return (
    <div
      className={clsx(
        !state && 'hidden',
        state && 'flex',
        "fixed justify-center top-0 left-0 w-[100vw] h-[100vh] overflow-y-auto bg-[rgba(100,100,100,0.3)] z-101 pb-20",
      )}
    >
      <div className="pb-10">
        <div className="bg-white py-4 px-6 rounded-xl mt-10">
          <div className="flex justify-end mb-1">
            <button onClick={handleClosePopup} className="p-2 w-[38px] h-[38px] flex items-center justify-center hover:bg-gray-200 rounded-[50%] cursor-pointer text-gray-600 hover:text-black">
              <FontAwesomeIcon icon={faXmark} className="w-[16px] h-[16px]" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
