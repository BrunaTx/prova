import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function IndexAplicacaoFinanceira() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('aplicacoesFinanceiras')
                .then(res => {
                    const aplicacoes = res.data.data.map(a => ({
                        ...a,
                        valor_formatado: new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(a.valor),
                        tipo_formatado: a.tipo === 'poupanca' ? 'Poupança' : 
                                      a.tipo === 'titulos_governo' ? 'Títulos do Governo' : 
                                      'Ações',
                        status_formatado: a.status === 'ativa' ? 'Ativa' : 'Resgatada',
                        conta_corrente_info: a.contaCorrente ? `${a.contaCorrente.numeroConta} - ${a.contaCorrente.cliente?.nomeCompleto}` : '—',
                        data_criacao: new Date(a.createdAt).toLocaleDateString('pt-BR')
                    }));
                    setData(aplicacoes);
                })
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.listAplicacaoFinanceira === 0) navigate(-1);
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
                   <DataTable 
                        title="Aplicações Financeiras Registradas" 
                        rows={['Tipo', 'Valor', 'Status', 'Conta Corrente', 'Data Criação', 'Ações']}
                        hide={[false, false, false, false, false, false]}
                        data={data}
                        keys={['tipo_formatado', 'valor_formatado', 'status_formatado', 'conta_corrente_info', 'data_criacao']} 
                        resource='aplicacoesFinanceiras'
                        crud={['viewAplicacaoFinanceira', 'createAplicacaoFinanceira', 'editAplicacaoFinanceira']} // <-- REMOVIDO delete
                    />

                  </Container>
            }
        </>
    )
}