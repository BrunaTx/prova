/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Rota de health check
router.get('/', async () => {
  return {
    hello: 'world',
    status: 'API is running',
    timestamp: new Date().toISOString()
  }
})

// Rota pública boas-vindas / autenticação
router.get('/hello', async () => {
  return {
    message: 'API AdonisJS com Autenticação por Access Tokens',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout (protegida)',
        me: 'GET /auth/me (protegida)',
        tokens: 'GET /auth/tokens (protegida)',
        createToken: 'POST /auth/tokens (protegida)'
      },
      protected: {
        profile: 'GET /profile (protegida)',
        dashboard: 'GET /dashboard (protegida)',
        posts: 'GET /posts (protegida)',
        createPost: 'POST /posts (protegida)'
      },
    },
  }
})

// Rotas de autenticação (públicas)
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  // Rotas protegidas de autenticação
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
  router.get('/tokens', '#controllers/auth_controller.tokens').use(middleware.auth())
  router.post('/tokens', '#controllers/auth_controller.createToken').use(middleware.auth())
}).prefix('/auth')

// Rotas protegidas por autenticação
router.group(() => {
  const ClienteController = () => import('#controllers/cliente_controller')
  router.resource('clientes', ClienteController)

  const ContaCorrenteController = () => import('#controllers/conta_corrente_controller')
  router.resource('contasCorrentes', ContaCorrenteController)

  const MovimentacaoController = () => import('#controllers/movimentacao_controller')
  router.resource('movimentacoes', MovimentacaoController)

  const AplicacaoFinanceiraController = () => import('#controllers/aplicacao_financeira_controller')
  router.resource('aplicacoesFinanceiras', AplicacaoFinanceiraController)
}).use([middleware.auth()])