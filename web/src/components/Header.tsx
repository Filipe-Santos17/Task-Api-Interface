import BtnAdd from "../assets/btn-plus.png"
import Button from "./Button"

export default function Header() {
  return (
    <div className="flex w-full items-center gap-1 mx-auto my-8">
      <input type="text" placeholder="Pesquise pela Task"
        className="flex-1 h-max p-4 rounded-md text-[#F2F2F2] placeholder:text-[#808080] bg-[#262626] outline-none"
      />
      <Button text="Pesquisar" img={BtnAdd}/>
      <Button text="Criar" />      
    </div>
  )
}