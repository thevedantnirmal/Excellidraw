
"use client";

import { Children, PropsWithChildren, ReactNode } from "react";

interface ButtonProps extends PropsWithChildren{
  onClick:()=>void,
  size:"sm"|"md"|"lg",
  type:"primary"|"secondary"|"tertiary"
}
export default function Button({children,onClick,size,type}:ButtonProps){
  const sizeStyle=size==="sm"?"px-5 py- 10":size==="md"?"px-8 py-16":"px-[10rem] py-24"
  const typeStyle=type==="primary"?"":type==="secondary"?"":""
  return <div>
    <button 
    style={{backgroundColor: "red"}}
    //className={` ${sizeStyle} bg-red-500 `}
    onClick={onClick}>{children}</button>

  </div>
}