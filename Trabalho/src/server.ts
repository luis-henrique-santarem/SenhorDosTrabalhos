import express from 'express';
import router from './routes/CharacterRoutes';

const app = express();
const PORT = 3000;

// Middleware para permitir que o Express interprete JSON
app.use(express.json());
app.use(router)

// Rota GET para a raiz
app.get('/', (req, res) => {
  res.send('🚀 Servidor TypeScript rodando!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});