import { useState, useEffect, useCallback, createContext, ReactElement } from 'react'
import { validUser } from "../helpers/Api";

export const UserContext = createContext({});

export function UserStorage({ children }: { children: ReactElement }) {
  const [dados, setDados] = useState<object>({});
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [error, setError] = useState<boolean | string>(false);
  const [reload, setReload] = useState<number>(0)

  const userLogout = useCallback(() => {
    setDados({});
    setError(false);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("token");
  }, []);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }

  async function testLogin() {
    const tokenLogin = getCookie('token')

    if (tokenLogin === null) {
      return setLogin(false)
    }

    try {
      setError(false)
      setLoading(true)

      const { url, options } = validUser(tokenLogin)
      const resp = await fetch(url, options)

      if (resp.status === 200) {
        const data = await resp.json()

        if (data.status === "ok") {
          setDados(data.user)
          console.log(data.user)
          setLogin(true)
        }
      } else {
        setDados({})
      }
    } catch (e) {
      userLogout()
      throw new Error("Token Invalido, error: " + e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testLogin()
  }, [userLogout])

  if (loading) {
    return (
      <div>carregando...</div>
    )
  }

  if (error) {
    return (
      <div>erro...</div>
    )
  }

  if (login === null) {
    return null; // Espera o login estar pronto
  }

  return (
    <UserContext.Provider value={{ dados, login, userLogout, reload, setReload }}>{children}</UserContext.Provider>
  )
}
