import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateContaCorrente() {
    const [numeroConta, setNumeroConta] = useState('');
    const [numeroAgencia, setNumeroAgencia] = useState('0001');
    const [saldo, setSaldo] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [clientes, setClientes] = useState([]);
    const [load, setLoad] = useState(true);
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

    function gerarNumeroConta() {
        const timestamp = Date.now().toString();
        const numero = timestamp.slice(-5); 
        setNumeroConta(`1${numero.padStart(4, '0')}`);
    }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createContaCorrente === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
        gerarNumeroConta(); 
    }, []);

    function sendData() {
        const contaCorrente = {
            numeroConta,
            numeroAgencia,
            saldo: saldo ? parseFloat(saldo) : 0,
            clienteId
    };

        Client.post('contasCorrentes', contaCorrente)
            .then(() => navigate('/contasCorrentes'))
            .catch(console.error);
    }

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
                            <div className="d-flex gap-2">
                                <Input
                                    type="text"
                                    value={numeroConta}
                                    onChange={e => setNumeroConta(e.target.value)}
                                    placeholder="Número gerado automaticamente"
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary"
                                    onClick={gerarNumeroConta}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Gerar
                                </button>
                            </div>
                            <small className="text-muted">Número gerado automaticamente</small>
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
                            <Label>Saldo Inicial</Label>
                            <Input
                                type="number"
                                value={saldo}
                                onChange={e => setSaldo(e.target.value)}
                                placeholder="Digite o saldo inicial"
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
                        <Submit value="Cadastrar" onClick={sendData} />
                    </div>
                </Container>
            }
        </>
    );
}