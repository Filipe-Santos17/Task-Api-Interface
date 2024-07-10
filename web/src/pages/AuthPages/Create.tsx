import { FormEvent } from "react"
import useForm from "../../hooks/useForm"
import InputBox from "../../components/InputBox"
import useFetch from "../../hooks/useFetch"
import Button from "../../components/Button"
import { createUser } from "../../helpers/Api"
import { useNavigate } from "react-router-dom"
import ErroMsg from "../../components/ErroMsg"
import LinkStyled from "../../components/LinkStyled"

export default function CreateUser() {

  const nameForm = useForm("")
  const emailForm = useForm('email')
  const passwordForm = useForm('password')
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (emailForm.validate() && passwordForm.validate() && nameForm.validate()) {
      const { url, options } = createUser({
        username: nameForm.value,
        email: emailForm.value,
        password: passwordForm.value,
      });

      const { json, response } = await request(url, options)

      if ((await response).status == 201) {
        if (json.message === "User created successfully") {
          navigate('/login')
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex justify-start gap-2 flex-col mb-4">
        <h1 className="font-normal text-2xl leading-7 text-white tracking-tight">
            Crie seu usuário
        </h1>
        <p className="font-normal text-base leading-6 text-white tracking-tight">
            Seja bem-vindo(a)!  Insira seu nome, e-mail e senha para criar sua conta.
        </p>
      </div>
      <div className="flex justify-start gap-6 flex-col mb-2">
        <InputBox labelName="Nome" id="user" type="text" placeholder="Insira seu nome" autoFocus={true} {...nameForm}/>
        <InputBox labelName="Email" id="email" type="text" placeholder="Insira seu email" {...emailForm}/>
        <InputBox labelName="Senha" id="password" type="password" placeholder="Insira sua senha " {...passwordForm}/>
        {erro && <ErroMsg erro={erro}/>}
        <div className="flex justify-start gap-2 flex-col mb-4">
          <LinkStyled rota="/login" text="Voltar ao login"/>
        </div>
      </div>
      {load ? <Button text="Carregando..." disabled/> : <Button text="Enviar" typeBtn="submit"/> }
    </form>
  )
}
