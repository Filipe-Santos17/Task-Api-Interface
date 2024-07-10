import { FormEvent, useEffect } from "react"
import useForm from "../../hooks/useForm"
import InputBox from "../../components/InputBox"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { loginUser } from "../../helpers/Api"
import ErroMsg from "../../components/ErroMsg"
import LinkStyled from "../../components/LinkStyled"

export default function LoginUser() {
  const emailForm = useForm('email')
  const passwordForm = useForm('password') //Teste123@
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    window.document.title = 'Login Tasks'
  },[])

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (emailForm.validate() && passwordForm.validate()) {
      const { url, options } = loginUser({
        email: emailForm.value,
        password: passwordForm.value,
      })

      const { json, response } = await request(url, options)

      if ((await response).status == 201) {
        if (json.access_token) {
          document.cookie= `acess_token_api=${json.access_token}; expires=${json.lifetime}`
          navigate('/')
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex justify-start gap-2 flex-col mb-8">
        <h1 className="font-normal text-2xl leading-7 text-white tracking-tight">
          Fazer Login
        </h1>
        <p className="font-normal text-base leading-6 text-white tracking-tight">
          Seja bem-vindo(a)!  Insira seu e-mail e senha para entrar em sua conta.
        </p>
      </div>
      <div className="flex justify-start gap-6 flex-col">
        <InputBox labelName="Usuário" id="email" type="text" placeholder="Insira seu email" {...emailForm} autoFocus={true}/>
        <InputBox labelName="Senha" id="password" type="password" placeholder="Insira sua senha " {...passwordForm} />
        {erro && <ErroMsg erro={erro} />}
        <div className="flex justify-start gap-2 flex-col mb-4">
          <LinkStyled rota="/forget" text="Esqueceu a senha ?"/>
          <LinkStyled rota="/create-user" text="Não possuo cadastro"/>
        </div>
      </div>
      {load ? <Button text="Carregando..." disabled={true} /> : <Button text="Entrar" typeBtn="submit" />}
    </form>
  )
}