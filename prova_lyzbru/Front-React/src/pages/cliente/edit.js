import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function EditCliente() {
    const location = useLocation();
    const cliente = location.state?.item;

    const [nomeCompleto, setNomeCompleto] = useState(cliente.nomeCompleto || '');
    const [email, setEmail] = useState(cliente.email || '');
    const [senha, setSenha] = useState(''); 
    const [cpf, setCpf] = useState(cliente.cpf || '');
    const [cidade, setCidade] = useState(cliente.cidade || '');
    const [estado, setEstado] = useState(cliente.estado || '');
    const [rua, setRua] = useState(cliente.rua || '');
    const [numeroCasa, setNumeroCasa] = useState(cliente.numeroCasa || '');
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    const [estados] = useState([
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ]);

    function updateCliente() {
        const upCliente = { 
            nome_completo: nomeCompleto,
            email,
            cpf,
            cidade,
            estado,
            rua,
            numero_casa: numeroCasa
        };

        // Só inclui a senha se foi alterada
        if (senha) {
            upCliente.senha = senha;
        }

        Client.put(`clientes/${cliente.id}`, upCliente)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => { setShow(false); navigate('/clientes'); }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.editCliente === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        // Simula carregamento
        setTimeout(() => setLoad(false), 500);
    }, []);

    return (
        <>
            <NavigationBar />
            {load 
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Nome Completo</Label>
                            <Input 
                                type="text" 
                                value={nomeCompleto} 
                                onChange={e => setNomeCompleto(e.target.value)} 
                                placeholder="Digite o nome completo"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label>Email</Label>
                            <Input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Digite o email"
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Label>Senha</Label>
                            <Input 
                                type="password" 
                                value={senha} 
                                onChange={e => setSenha(e.target.value)} 
                                placeholder="Deixe em branco para manter a senha atual"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label>CPF</Label>
                            <Input 
                                type="text" 
                                value={cpf} 
                                onChange={e => setCpf(e.target.value)} 
                                placeholder="Digite o CPF"
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Label>Cidade</Label>
                            <Input 
                                type="text" 
                                value={cidade} 
                                onChange={e => setCidade(e.target.value)} 
                                placeholder="Digite a cidade"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label>Estado</Label>
                            <Select value={estado} onChange={e => setEstado(e.target.value)}>
                                <option value="">Selecione o estado</option>
                                {estados.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <Label>Rua</Label>
                            <Input 
                                type="text" 
                                value={rua} 
                                onChange={e => setRua(e.target.value)} 
                                placeholder="Digite a rua"
                            />
                        </div>
                        <div className="col-md-4">
                            <Label>Número</Label>
                            <Input 
                                type="text" 
                                value={numeroCasa} 
                                onChange={e => setNumeroCasa(e.target.value)} 
                                placeholder="Nº"
                            />
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/clientes')} />
                        <Submit value="Alterar" onClick={updateCliente} />
                    </div>
                  </Container>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação Efetuada com Sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}