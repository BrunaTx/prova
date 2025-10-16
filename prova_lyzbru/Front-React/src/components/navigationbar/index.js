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
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#e41b97ff" viewBox="0 -960 960 960">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                            </svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Clientes
                            </span>
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => navigate('/contasCorrentes')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff">
                                <path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
                            </svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Contas Correntes
                            </span>
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => navigate('/movimentacoes')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff">
                                <path d="M80-200v-560h800v560H80Zm120-200h120q17 0 28.5-11.5T360-440v-70q0-17-11.5-28.5T320-550h-60v-30h100v-60H200v150h100v30H200v60Zm240 80h320v-22q0-45-44-71.5T600-440q-72 0-116 26.5T440-342v22Zm160-160q33 0 56.5-23.5T680-560q0-33-23.5-56.5T600-640q-33 0-56.5 23.5T520-560q0 33 23.5 56.5T600-480ZM160-280h640v-400H160v400Zm0 0v-400 400Z" />
                            </svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Movimentações
                            </span>
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => navigate('/aplicacoesFinanceiras')}
                            className="d-flex align-items-center nav-link-custom"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e41b97ff">
                                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
                            </svg>
                            <span className="ms-2 fw-bolder text-custom">
                                Aplicações Financeiras
                            </span>
                        </Nav.Link>
                    </Nav>

                    <NavDropdown
                        title={<DropTitle text={dataUser ? dataUser.fullName : 'Visitante'} />}
                        id="navbarScrollingDropdown"
                        className="me-5"
                    >
                        <NavDropdown.Item href="#" className="me-5">
                            {dataUser ? dataUser.email : 'visitante@gmail.com'}
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
