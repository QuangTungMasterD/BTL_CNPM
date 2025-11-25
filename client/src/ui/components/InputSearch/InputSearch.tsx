"use client";

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function InputSearch({
  name,
  value,
  setValue,
  placeHolder,
}: {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeHolder: string;
}) {
  const refInput = useRef<HTMLInputElement>(null);
  const [showLoad, setShowLoad] = useState(false);

  useEffect(() => {
      setShowLoad(true);
      const delay = setTimeout(() => {
        setShowLoad(false);
      }, 1000);
  
      return () => clearTimeout(delay);
    }, [value]);

  const handleChangeValue = () => {
    const valueCur = refInput?.current?.value;
    if (refInput.current != null) {
      setValue(valueCur);
    }
  };

  return (
    <div className="relative">
      <input
        className="border border-gray-300 rounded-xl pl-5 pr-8 h-full"
        placeholder={placeHolder}
        ref={refInput}
        name={name}
        value={value}
        onChange={handleChangeValue}
      />
      {showLoad && <FontAwesomeIcon icon={faCircleNotch} className="absolute right-[8px] text-gray-500 top-[50%] translate-y-[-50%] animate-spin" />}
    </div>
  );
}

export default InputSearch;
