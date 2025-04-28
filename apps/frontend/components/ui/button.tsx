
"use client";

import { Children, PropsWithChildren, ReactNode } from "react";

interface ButtonProps extends PropsWithChildren{
  onClick:()=>void,
  size:"sm"|"md"|"lg",
  type:"primary"|"secondary"|"tertiary"
  activated:Boolean
}
export default function Button({children,onClick,size,type,activated}:ButtonProps){
  const sizeStyle=size==="sm"?"px-8 py-4":size==="md"?"px-16 py-8":"px-20 py-10"
  const typeStyle=type==="primary"?"":type==="secondary"?"":""
  return <div className="opacity-80 ">
    <button 
    className={` ${sizeStyle} rounded-2xl border border-black ${activated?"bg-blue-300":""}`}
    onClick={onClick}>{children}</button>

  </div>
}