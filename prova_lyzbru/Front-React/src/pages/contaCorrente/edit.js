import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { RosaButton } from './style';


export default function EditContaCorrente() {
    const location = useLocation();
    const conta = location.state?.item;

    const [numeroConta, setNumeroConta] = useState(conta.numeroConta || '');
    const [numeroAgencia, setNumeroAgencia] = useState(conta.numeroAgencia || '');
    const [saldo, setSaldo] = useState(conta.saldo || '');
    const [clienteId, setClienteId] = useState(conta.clienteId || '');
    const [clientes, setClientes] = useState([]);
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('clientes')
                .then(res => setClientes(res.data.data))
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function updateContaCorrente() {
        const upConta = {
            numero_conta: numeroConta,
            numero_agencia: numeroAgencia,
            saldo: parseFloat(saldo),
            cliente_id: clienteId
        };

        Client.put(`contasCorrentes/${conta.id}`, upConta)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => { setShow(false); navigate('/contasCorrentes'); }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.editContaCorrente === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);

    return (
        <>
            <NavigationBar />
            {load 
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#f700adff" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Número da Conta</Label>
                            <Input 
                                type="text" 
                                value={numeroConta} 
                                onChange={e => setNumeroConta(e.target.value)} 
                                placeholder="Número da conta"
                                readOnly 
                            />
                            <small className="text-muted">Não pode ser alterado</small>
                        </div>
                        <div className="col-md-6">
                            <Label>Número da Agência</Label>
                            <Input 
                                type="text" 
                                value={numeroAgencia} 
                                onChange={e => setNumeroAgencia(e.target.value)} 
                                placeholder="Digite o número da agência"
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Label>Saldo</Label>
                            <Input 
                                type="number" 
                                value={saldo} 
                                onChange={e => setSaldo(e.target.value)} 
                                placeholder="Digite o saldo"
                                step="0.01"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label>Cliente</Label>
                            <Select value={clienteId} onChange={e => setClienteId(e.target.value)}>
                                <option value="">Selecione o cliente</option>
                                {clientes.map(c => (
                                    <option key={c.id} value={c.id}>{c.nomeCompleto} - {c.cpf}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/contasCorrentes')} />
                        <Submit value="Alterar" onClick={updateContaCorrente} />
                    </div>
                  </Container>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#ffe4f6' }}>
                               <Modal.Title style={{ color: '#f700adff' }}>Aplicação Atualizado</Modal.Title>
                               </Modal.Header>
               
                               <Modal.Body style={{ backgroundColor: '#ffe4f6', color: '#f700adff' }}>
                               Atualização realizada com Sucesso!
                               </Modal.Body>
               
                               <Modal.Footer closeButton style={{ backgroundColor: '#ffe4f6' }}>
                                   <RosaButton onClick={handleClose}>OK</RosaButton>
                               </Modal.Footer>
            </Modal>
        </>
    )
}