import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateMovimentacao() {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [numeroContaOrigem, setNumeroContaOrigem] = useState('');
    const [numeroContaDestino, setNumeroContaDestino] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataMovimentacao, setDataMovimentacao] = useState('');
    const [contaOrigemEncontrada, setContaOrigemEncontrada] = useState(null);
    const [contaDestinoEncontrada, setContaDestinoEncontrada] = useState(null);
    const [erroOrigem, setErroOrigem] = useState('');
    const [erroDestino, setErroDestino] = useState('');
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    const tiposMovimentacao = [
        { value: 'deposito', label: 'Depósito' },
        { value: 'saque', label: 'Saque' },
        { value: 'transferencia', label: 'Transferência' },
    ];

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createMovimentacao === 0) navigate(-1);
    }

    // Função para buscar conta pelo número
    async function buscarContaPorNumero(numeroConta, tipoConta) {
        if (!numeroConta) {
            if (tipoConta === 'origem') {
                setContaOrigemEncontrada(null);
                setErroOrigem('');
            } else {
                setContaDestinoEncontrada(null);
                setErroDestino('');
            }
            return;
        }

        try {
            const response = await Client.get(`contasCorrentes?numero_conta=${numeroConta}`);
            if (response.data.data && response.data.data.length > 0) {
                const conta = response.data.data[0];
                if (tipoConta === 'origem') {
                    setContaOrigemEncontrada(conta);
                    setErroOrigem('');
                } else {
                    setContaDestinoEncontrada(conta);
                    setErroDestino('');
                }
            } else {
                if (tipoConta === 'origem') {
                    setContaOrigemEncontrada(null);
                    setErroOrigem('Conta de origem não encontrada');
                } else {
                    setContaDestinoEncontrada(null);
                    setErroDestino('Conta de destino não encontrada');
                }
            }
        } catch (error) {
            if (tipoConta === 'origem') {
                setContaOrigemEncontrada(null);
                setErroOrigem('Erro ao buscar conta de origem');
            } else {
                setContaDestinoEncontrada(null);
                setErroDestino('Erro ao buscar conta de destino');
            }
        }
    }

    useEffect(() => {
        verifyPermission();
        const agora = new Date();
        const isoLocal = agora.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
        setDataMovimentacao(isoLocal);
        setTimeout(() => setLoad(false), 500);
    }, []);

    // Busca conta origem quando o número muda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (numeroContaOrigem && numeroContaOrigem.length >= 4) {
                buscarContaPorNumero(numeroContaOrigem, 'origem');
            } else {
                setContaOrigemEncontrada(null);
                setErroOrigem('');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [numeroContaOrigem]);

    // Busca conta destino quando o número muda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (numeroContaDestino && numeroContaDestino.length >= 4) {
                buscarContaPorNumero(numeroContaDestino, 'destino');
            } else {
                setContaDestinoEncontrada(null);
                setErroDestino('');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [numeroContaDestino]);

    function sendData() {
        // Validações baseadas no tipo
        if (tipo === 'saque' || tipo === 'transferencia') {
            if (!contaOrigemEncontrada) {
                setErroOrigem('Conta de origem é obrigatória para este tipo de movimentação');
                return;
            }
            // Verifica saldo para saque e transferência
            if ((tipo === 'saque' || tipo === 'transferencia') && contaOrigemEncontrada.saldo < parseFloat(valor)) {
                setErroOrigem('Saldo insuficiente na conta de origem');
                return;
            }
        }

        if ((tipo === 'deposito' || tipo === 'transferencia') && !contaDestinoEncontrada) {
            setErroDestino('Conta de destino é obrigatória para este tipo de movimentação');
            return;
        }

        const movimentacao = {
            tipo,
            valor: parseFloat(valor),
            conta_origem_id: tipo === 'deposito' ? null : contaOrigemEncontrada?.id,
            conta_destino_id: tipo === 'saque' ? null : contaDestinoEncontrada?.id,
            descricao,
            data_movimentacao: new Date(dataMovimentacao).toISOString()
        };

        Client.post('movimentacoes', movimentacao)
            .then(() => navigate('/movimentacoes'))
            .catch(console.error);
    }

    // Mostra/oculta campos baseado no tipo
    const showContaOrigem = tipo === 'saque' || tipo === 'transferencia';
    const showContaDestino = tipo === 'deposito' || tipo === 'transferencia';

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
                            <Label>Tipo de Movimentação</Label>
                            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value="">Selecione o tipo</option>
                                {tiposMovimentacao.map(t => (
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
                        </div>
                    </div>

                    {showContaOrigem && (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <Label>Número da Conta de Origem</Label>
                                <Input
                                    type="text"
                                    value={numeroContaOrigem}
                                    onChange={e => setNumeroContaOrigem(e.target.value)}
                                    placeholder="Digite o número da conta de origem"
                                />
                                {contaOrigemEncontrada && (
                                    <Alert variant="success" className="mt-2 small py-2">
                                        ✅ Conta origem: <strong>{contaOrigemEncontrada.numeroConta}</strong> - {contaOrigemEncontrada.cliente?.nomeCompleto}
                                        <br />
                                        Saldo: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaOrigemEncontrada.saldo)}</strong>
                                    </Alert>
                                )}
                                {erroOrigem && (
                                    <Alert variant="danger" className="mt-2 small py-2">
                                        ❌ {erroOrigem}
                                    </Alert>
                                )}
                            </div>
                        </div>
                    )}

                    {showContaDestino && (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <Label>Número da Conta de Destino</Label>
                                <Input
                                    type="text"
                                    value={numeroContaDestino}
                                    onChange={e => setNumeroContaDestino(e.target.value)}
                                    placeholder="Digite o número da conta de destino"
                                />
                                {contaDestinoEncontrada && (
                                    <Alert variant="success" className="mt-2 small py-2">
                                        ✅ Conta destino: <strong>{contaDestinoEncontrada.numeroConta}</strong> - {contaDestinoEncontrada.cliente?.nomeCompleto}
                                    </Alert>
                                )}
                                {erroDestino && (
                                    <Alert variant="danger" className="mt-2 small py-2">
                                        ❌ {erroDestino}
                                    </Alert>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <Label>Descrição</Label>
                            <Input
                                type="text"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                placeholder="Digite uma descrição"
                            />
                        </div>
                        <div className="col-md-4">
                            <Label>Data da Movimentação</Label>
                            <Input
                                type="datetime-local"
                                value={dataMovimentacao}
                                onChange={e => setDataMovimentacao(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/movimentacoes')} />
                        <Submit value="Cadastrar" onClick={sendData} disabled={!tipo || !valor} />
                    </div>
                </Container>
            }
        </>
    );
}