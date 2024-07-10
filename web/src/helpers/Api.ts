import { loginObj, userCreate } from "../@types/types"

const url = 'http://localhost:3001/'

/*Rotas de Login */
export function loginUser(data: loginObj) {
  return {
    url: `${url}auth`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function createUser(data: userCreate) {
  return {
    url: `${url}users`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function changePass(data: object) {
  return {
    url: `${url}user/forget-password`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function validUser(data: string) {
  return {
    url: `${url}user/valid-token`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": `${data}`
      },
    },
  }
}