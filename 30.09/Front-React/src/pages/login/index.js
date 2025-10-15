import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Background } from './style';
import FormLogin from '../../components/formlogin';
import ImageLogin from '../../components/imagelogin';
import Logo from '../../components/logo';
import { Client } from '../../api/client'
import { OrbitProgress } from "react-loading-indicators";

export default function Login() {

    const navigate = useNavigate();
    const [load, setLoad] = useState(true)

    function fetchData() {

        setLoad(true) 
        setTimeout(() => {
            Client.get('/auth/me').then(res => {
                navigate('/cursos')
            })
            .catch(function(error) {
                console.log(error)
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        load 
        ?
            <Container className="d-flex justify-content-center mt-5">
                <OrbitProgress variant="spokes" color="#f700adff" size="medium" text="" textColor="" />
            </Container>
        :
            <Container>
                <Background>
                    <Logo size="large" />
                </Background>

                <FormLogin />
            </Container>
    )
}