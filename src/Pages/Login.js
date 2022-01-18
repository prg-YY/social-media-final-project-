import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const Container = styled.div`
  background-image: url("https://cdn.pixabay.com/photo/2015/11/22/19/04/crowd-1056764_960_720.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.div`
  width: 400px;
  border: 1px solid whitesmoke;
  border-radius: 8px;
  height: 250px;
`
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`

const InputContainer = styled.div`
  border: 1px solid whitesmoke;
  border-radius: 8px;
  width: 80%;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: whitesmoke;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  background-color: whitesmoke;
`
const ButtonContainer = styled.div`
  width: 150px;
  height: auto;
  border: 1px solid whitesmoke;
  border-radius: 8px;
  padding: 0.2rem;
  background-color: blue;
`

const Button = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: transparent;
  border: none;
  text-align: center;
  color: white;
  padding: 7px;
`

/** Set up localstorage */

const getLocalInfo = () => {
  let data = localStorage.getItem("userInfo")
  if (data) {
    return JSON.parse(localStorage.getItem("userInfo"))
  } else {
    return []
  }
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [loginUser, setLoginUser] = useState(null)

  const [users, setUsers] = useState(getLocalInfo())

  const [loginSuccess, setLoginSuccess] = useState(false)

  // console.log(users);

  const loginMe = (email, pass) => {
    users.map((user) => {
      console.log(user)
      if (email === user.email && pass === user.pass) {
        setLoginSuccess(true)

        return setLoginUser(user)
      }
      return user
    })
  }

  const submitHanlder = (e) => {
    e.preventDefault()
    loginMe(email, pass)
    setEmail("")
    setPass("")
  }

  useEffect(() => {
    if (loginUser && loginUser.name) {
      window.alert("Wolcomne")
      navigate("/")
    }
  }, [loginUser, navigate, loginSuccess])

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={submitHanlder}>
          <InputContainer>
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="password"
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value)
              }}
            ></Input>
          </InputContainer>
          <ButtonContainer>
            <Button>Login</Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
      {/* {loginUser && loginUser.name} */}
    </Container>
  )
}
