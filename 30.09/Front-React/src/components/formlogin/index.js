import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from "react-loading-indicators";
import UserContext  from '../../contexts/UserContext'
import { Client, setToken}  from '../../api/client';
import { setPermissions } from '../../service/PermissionService'
import { setDataUser } from '../../service/UserService'
import { 
    Container, 
    BoxIcon,
    BoxItem,
    Icon,
    Title, 
    SubTitle,
    Label,
    InputPassword,
    InputEmail,
    MsgBox,
    SendBox,
    Submit,
    LinkForgot,
} from "./style"

import Banco_logo from '../../images/Banks_logo.png';

export default function FormLogin() {
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [load, setLoad] = useState(false)
    const [view, setView] = useState(false)
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    function Authenticate() {

        const user = { email: email , senha: senha }

        setView(false)
        setLoad(true) 
        setTimeout(() => {
             Client.post('auth/login', user).then(res => {
                const load = res.data
                console.log(load)
                // Context
                setUser(load.user)
                // Local Storage
                setDataUser(load.user)
                setToken(load.token.value)
                setPermissions(load.permissions)
                navigate('/clientes')
            })
            .catch(function(error) {
                setView(true)
                console.log(error)
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    return (
        
        <Container>
            <BoxIcon>
                <div></div>
                <BoxItem>
                    <Icon src={Banco_logo}/>
                </BoxItem>
                <div></div>
            </BoxIcon>
            <Title>Autenticação</Title>
            <SubTitle>Informe suas credenciais</SubTitle>
            {
                load 
                ?
                    <Container className="d-flex justify-content-center mt-5">
                        <OrbitProgress variant="spokes" color="rgba(255, 138, 226, 1)" size="medium" text="" textColor="" />
                    </Container>
                :
                    <>
                        <Label>E-mail</Label>
                        <InputEmail 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    
                        <Label>Senha</Label>
                        <InputPassword 
                            id="senha" 
                            name="senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        
                        {
                            view
                            ?
                                <MsgBox>
                                    <p>Usuário e Senha inválidos!</p>
                                </MsgBox>
                            :
                                ''
                        }
                        
                        <SendBox>
                            <Submit value="Autenticar" onClick={() => Authenticate() }/>
                            <LinkForgot onClick={() => navigate('/login')}> Esqueceu sua senha?</LinkForgot>
                        </SendBox>
                    </>
            }
        </Container>
    )
} 