import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Image } from "./style";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DropTitle from "../droptitle";
import Banks_logo from '../../images/Banks_logo.png';

import UserContext from '../../contexts/UserContext';
import { Client, removeToken } from '../../api/client';
import { removePermissions } from '../../service/PermissionService';
import { getDataUser, removeDataUser } from '../../service/UserService';
import './NavigationBar.css'; 

function NavigationBar() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const dataUser = getDataUser();

    function logout() {
        setTimeout(() => {
            Client.post('auth/logout')
                .then(res => {
                    removeToken();
                    removePermissions();
                    removeDataUser();
                    navigate('/login');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000);
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#fadcf0ff' }}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <Image src={Banks_logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 d-flex align-items-center"
                        style={{ maxHeight: '100px', gap: '32px' }}
                        navbarScroll
                    >
                        <Nav.Link 
                            onClick={() => navigate('/clientes')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Clientes
                            </span>
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => navigate('/contasCorrentes')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff"><path d="M640-520q17 0 28.5-11.5T680-560q0-17-11.5-28.5T640-600q-17 0-28.5 11.5T600-560q0 17 11.5 28.5T640-520Zm-320-80h200v-80H320v80ZM180-120q-34-114-67-227.5T80-580q0-92 64-156t156-64h200q29-38 70.5-59t89.5-21q25 0 42.5 17.5T720-820q0 6-1.5 12t-3.5 11q-4 11-7.5 22.5T702-751l91 91h87v279l-113 37-67 224H480v-80h-80v80H180Zm60-80h80v-80h240v80h80l62-206 98-33v-141h-40L620-720q0-20 2.5-38.5T630-796q-29 8-51 27.5T547-720H300q-58 0-99 41t-41 99q0 98 27 191.5T240-200Zm240-298Z"/></svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Contas Correntes
                            </span>
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => navigate('/aplicacoesFinanceiras')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff"><path d="M80-120v-80h800v80H80Zm40-120v-280h120v280H120Zm200 0v-480h120v480H320Zm200 0v-360h120v360H520Zm200 0v-600h120v600H720Z"/></svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Aplicações Financeiras
                            </span>
                        </Nav.Link>
                    </Nav>

                   <NavDropdown
                    title={<DropTitle text={dataUser ? dataUser.fullName : ' '} />}
                    id="navbarScrollingDropdown"
                    className="me-5"
                >
                    <NavDropdown.Item href="#" className="me-5">
                        {dataUser ? dataUser.email : ''}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logout()} className="me-5">
                        Sair
                    </NavDropdown.Item>
                </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
