import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { RosaButton } from './style';


export default function EditAplicacaoFinanceira() {
    const location = useLocation();
    const aplicacao = location.state?.item;

    const [tipo, setTipo] = useState(aplicacao.tipo || '');
    const [valor, setValor] = useState(aplicacao.valor || '');
    const [numeroConta, setNumeroConta] = useState(aplicacao.conta_corrente?.numero_conta || '');
    const [status, setStatus] = useState(aplicacao.status || 'ativa');
    const [contaEncontrada, setContaEncontrada] = useState(aplicacao.conta_corrente || null);
    const [erro, setErro] = useState('');
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    const tiposAplicacao = [
        { value: 'poupanca', label: 'Poupança' },
        { value: 'titulos_governo', label: 'Títulos do Governo' },
        { value: 'acoes', label: 'Ações' }
    ];

    const statusAplicacao = [
        { value: 'ativa', label: 'Ativa' },
        { value: 'resgatada', label: 'Resgatada' }
    ];

    // Função para buscar conta pelo número
    async function buscarContaPorNumero() {
        if (!numeroConta) {
            setContaEncontrada(null);
            setErro('');
            return;
        }

        try {
            setErro('');
            const response = await Client.get(`contasCorrentes?numero_conta=${numeroConta}`);
            if (response.data.data && response.data.data.length > 0) {
                const conta = response.data.data[0];
                setContaEncontrada(conta);
                setErro('');
            } else {
                setContaEncontrada(null);
                setErro('Conta corrente não encontrada');
            }
        } catch (error) {
            setContaEncontrada(null);
            setErro('Erro ao buscar conta corrente');
        }
    }

    function updateAplicacaoFinanceira() {
    if (!contaEncontrada) {
        setErro('Por favor, digite um número de conta válido');
        return;
    }

    const payload = { status }; // só atualizando o status

    Client.put(`aplicacoesFinanceiras/${aplicacao.id}`, payload)
        .then(() => {
            setShow(true); // abre modal de sucesso
        })
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
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (numeroConta && numeroConta.length >= 4) {
                buscarContaPorNumero();
            } else {
                setContaEncontrada(null);
                setErro('');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [numeroConta]);

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
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Label>Número da Conta Corrente</Label>
                            <Input 
                                type="text" 
                                value={numeroConta} 
                                onChange={e => setNumeroConta(e.target.value)} 
                                placeholder="Digite o número da conta"
                            />
                            { }

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
                         <Submit  value="Voltar" onClick={() => navigate('/aplicacoesFinanceiras')} />
                         <Submit value="Alterar" onClick={updateAplicacaoFinanceira} disabled={!contaEncontrada || !tipo || !valor} />
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