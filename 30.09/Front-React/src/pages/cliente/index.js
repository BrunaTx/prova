import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function HomeCliente() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('clientes')
                .then(res => {
                    console.log(res.data.data)
                    const clientes = res.data.data.map(c => ({
                        ...c,
                        endereco_completo: `${c.rua}, ${c.numeroCasa} - ${c.cidade}/${c.estado}`
                    }));
                    setData(clientes);
                })
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.listCliente === 0) navigate(-1);
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
                        title="Clientes Registrados" 
                        rows={['Nome', 'Email', 'CPF', 'Endereço', 'Ações']}
                        hide={[false, false, false, false, false]}
                        data={data}
                        keys={['nomeCompleto', 'email', 'cpf', 'endereco_completo']} 
                        resource='clientes'
                        crud={['viewCliente', 'createCliente', 'editCliente', 'deleteCliente']}
                    />
                  </Container>
            }
        </>
    )
}