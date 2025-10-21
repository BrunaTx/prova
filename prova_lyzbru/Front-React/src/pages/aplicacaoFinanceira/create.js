import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Select, Input, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateAplicacaoFinanceira() {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [contaEncontrada, setContaEncontrada] = useState(null);
    const [contas, setContas] = useState([]);
    const [status, setStatus] = useState('ativa');
    const [load, setLoad] = useState(true);
    const [erro, setErro] = useState('');
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

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createAplicacaoFinanceira === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        setTimeout(() => setLoad(false), 500);

        Client.get(`contasCorrentes?user_id=${dataUser.id}`)
            .then(res => setContas(res.data.data || []))
            .catch(console.error);
    }, []);

    function sendData() {
        if (!contaEncontrada) {
            setErro('Selecione uma conta válida');
            return;
        }

        const aplicacaoFinanceira = {
            tipo,
            valor: parseFloat(valor),
            conta_corrente_id: contaEncontrada.id,
            status
        };

        Client.post('aplicacoesFinanceiras', aplicacaoFinanceira)
            .then(() => navigate('/aplicacoesFinanceiras'))
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
                            <Label>Tipo de Aplicação</Label>
                            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value="">Selecione o tipo</option>
                                {tiposAplicacao.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Label>Valor</Label>
                            <Input
                                type="number"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                                placeholder="Digite o valor"
                                step="0.01"
                                min="0.01"
                            />
                            {contaEncontrada && valor && parseFloat(valor) > contaEncontrada.saldo && (
                                <Alert
                                className="mt-2 small py-2"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#f700adff',
                                    border: 'none',
                                }}
                                >
                                Saldo insuficiente, saldo atual:{' '}
                                <strong>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaEncontrada.saldo)}
                                </strong>
                                </Alert>
                            )}
                        </div>
                    </div>

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
                                    style={{ backgroundColor: 'white', color: '#f700adff', border: 'none' }}
                                >
                                    Saldo: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaEncontrada.saldo)}</strong>
                                </Alert>
                            )}
                        </div>
                       <div className="col-md-6">
                        <Label>Status</Label>
                        <Select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="ativa">Ativa</option>
                            {dataUser.papel === 'gerente' && (
                                <option value="resgatada">Resgatada</option>
                            )}
                        </Select>
                    </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/aplicacoesFinanceiras')} />
                        <Submit value="Cadastrar" onClick={sendData} disabled={!contaEncontrada || !tipo || !valor} />
                    </div>
                </Container>
            }
        </>
    );
}
