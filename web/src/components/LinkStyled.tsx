import {Link} from 'react-router-dom'

export default function LinkStyled({rota, text}: {rota: string, text: string}) {
  return (
    <Link to={rota} className="font-normal text-xs tracking-widest w-full outline-none text-gray45 hover:text-white focus:text-white hover:underline focus:underline">
        {text}
    </Link>
  )
}
