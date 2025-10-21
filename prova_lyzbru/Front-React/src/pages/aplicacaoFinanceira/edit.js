import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { RosaButton } from './style';

export default function EditAplicacaoFinanceira() {
    const location = useLocation();
    const aplicacao = location.state?.item;

    const [tipo, setTipo] = useState(aplicacao.tipo || '');
    const [valor, setValor] = useState(aplicacao.valor || '');
    const [status, setStatus] = useState(aplicacao.status || 'ativa');
    const [contaEncontrada, setContaEncontrada] = useState(aplicacao.conta_corrente || null);
    const [contas, setContas] = useState([]);
    const [erro, setErro] = useState('');
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    const statusAplicacao = [
        { value: 'ativa', label: 'Ativa' },
        { value: 'resgatada', label: 'Resgatada' }
    ];

    function updateAplicacaoFinanceira() {
        if (!contaEncontrada) {
            setErro('Selecione uma conta válida');
            return;
        }

        const payload = { status }; 

        Client.put(`aplicacoesFinanceiras/${aplicacao.id}`, payload)
            .then(() => setShow(true))
            .catch(err => {
                console.error(err);
                setErro('Erro ao atualizar aplicação financeira');
            });
    }

    const handleClose = () => { setShow(false); navigate('/aplicacoesFinanceiras'); }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.editAplicacaoFinanceira === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        setTimeout(() => setLoad(false), 500);

        Client.get('contasCorrentes')
            .then(res => setContas(res.data.data || []))
            .catch(console.error);
    }, []);

    return (
        <>
            <NavigationBar />
            {load 
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#f700adff" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Label>Conta Corrente</Label>
                            <Select
                                value={contaEncontrada?.id || ''}
                                onChange={e => {
                                    const selected = contas.find(c => c.id === parseInt(e.target.value));
                                    setContaEncontrada(selected || null);
                                }}
                            >
                                <option value="">Selecione a conta</option>
                                {contas.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.numeroConta} - {c.cliente?.nomeCompleto}
                                    </option>
                                ))}
                            </Select>
                            {contaEncontrada && (
                                <Alert
                                    className="mt-2 small py-2"
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#f700adff',
                                        border: 'none',
                                    }}
                                >
                                    Saldo: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaEncontrada.saldo)}</strong>
                                </Alert>
                            )}
                        </div>

                        <div className="col-md-6">
                            <Label>Status</Label>
                            <Select value={status} onChange={e => setStatus(e.target.value)}>
                                {statusAplicacao.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/aplicacoesFinanceiras')} />
                        <Submit value="Alterar" onClick={updateAplicacaoFinanceira} disabled={!contaEncontrada} />
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
