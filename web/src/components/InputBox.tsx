import React from "react"
import ErroMsg from "./ErroMsg"

interface InputBoxType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>  {
  labelName: string,
  error?: string,
  validate?: () => void,
  setValue?: React.Dispatch<React.SetStateAction<string>>
}

export default function InputBox({ labelName, id, error = "", ...inputProps }: InputBoxType) {
  return (
    <div className="w-full flex justify-starts gap-2 flex-col">
      <label className="text-xs font-bold text-white" htmlFor={id}>{labelName}</label>
      <input className="bg-white border border-gray40 rounded h-10 w-full p-3 outline-none 
      placeholder-opacity-25 mix-blend-normal hover:border-gray30 font-medium text-sm text-black" 
        id={id} name={id} {...inputProps}
        />
      {error && <ErroMsg erro={error}/>}
    </div>
  )
}