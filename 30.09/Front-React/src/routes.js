// React Router
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'

// Clientes
import Clientes from './pages/cliente'
import ClientesCreate from './pages/cliente/create'
import ClientesEdit from './pages/cliente/edit'

// Contas Correntes
import ContasCorrentes from './pages/contaCorrente'
import ContasCorrentesCreate from './pages/contaCorrente/create'
import ContasCorrentesEdit from './pages/contaCorrente/edit'

// Movimentações
import Movimentacoes from './pages/movimentacao'
import MovimentacoesCreate from './pages/movimentacao/create'
import MovimentacoesEdit from './pages/movimentacao/edit'

// Aplicações Financeiras
import AplicacoesFinanceiras from './pages/aplicacaoFinanceira'
import AplicacoesFinanceirasCreate from './pages/aplicacaoFinanceira/create'
import AplicacoesFinanceirasEdit from './pages/aplicacaoFinanceira/edit'

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login", 
        element: <Login />,
    },
    {
        path: "/error", 
        element: <Error />,
    },
    { 
        path: "/home", 
        element: <Home />,
    },

    // Clientes
    {
        path: "/clientes", 
        element: <Clientes />,
    },
    {
        path: "/clientes/create", 
        element: <ClientesCreate />,
    },
    {
        path: "/clientes/edit", 
        element: <ClientesEdit />,
    },

    // Contas Correntes
    {
        path: "/contasCorrentes", 
        element: <ContasCorrentes />,
    },
    {
        path: "/contasCorrentes/create", 
        element: <ContasCorrentesCreate />,
    },
    {
        path: "/contasCorrentes/edit", 
        element: <ContasCorrentesEdit />,
    },

    // Movimentações
    {
        path: "/movimentacoes", 
        element: <Movimentacoes />,
    },
    {
        path: "/movimentacoes/create", 
        element: <MovimentacoesCreate />,
    },
    {
        path: "/movimentacoes/edit", 
        element: <MovimentacoesEdit />,
    },

    // Aplicações Financeiras
    {
        path: "/aplicacoesFinanceiras", 
        element: <AplicacoesFinanceiras />,
    },
    {
        path: "/aplicacoesFinanceiras/create", 
        element: <AplicacoesFinanceirasCreate />,
    },
    {
        path: "/aplicacoesFinanceiras/edit", 
        element: <AplicacoesFinanceirasEdit />,
    },
])

export default router