import { Request, Response } from "express";
import { connection } from "../config/database";

export class CharacterController {

async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM characters WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
    }
    return res.status(200).json(rows[0]);
  }


  // Método responsável por criar um novo personagem no banco de dados
  async create(req: Request, res: Response): Promise<Response> {
    // Desestrutura os dados enviados no corpo da requisição
    const { nome, tipo, raca, arma, statues } = req.body;
    // Se o tipo do personagem for "Nazgûl", exibimos uma mensagem temática no console
    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !tipo || !raca || !arma || !statues) {
      // Se faltar algum, retorna erro 400 com uma mensagem
      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }
    // Executa a inserção do novo personagem no banco de dados
    await connection.query(
      "INSERT INTO characters (nome, tipo, raca, arma, statues) VALUES (?, ?, ?, ?, ?)",
      [nome, tipo, raca, arma, statues] // Valores substituem os "?" de forma segura (evita SQL injection)
    );
    // Retorna resposta de sucesso com status 201 (Created)
    return res.status(201).json({ mensagem: "Personagem criado com sucesso" });
  }

  // Listar todos os personagens
  // Método assíncrono que consulta todos os personagens no banco de dados e os retorna em formato JSON
  async list(req: Request, res: Response): Promise<Response> {
    // Realiza a consulta no banco de dados para pegar todos os registros da tabela 'Character'
    const [rows] = await connection.query('SELECT * FROM characters');
    // Retorna os dados encontrados com status HTTP 200 (OK)
    return res.status(200).json(rows);
  }

  // Método responsável por excluir um personagem específico, com base no ID
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // Extrai o ID enviado na URL
    // Primeiro, buscamos o personagem pelo ID para verificar o tipo
    const [rows]: any = await connection.query(
      "SELECT tipo FROM characters WHERE id = ?",
      [id]
    );
    // Se o personagem for um "Nazgûl", exibimos a mensagem no console
    if (rows.length > 0 && rows[0].tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }
    // Em seguida, deletamos o personagem com base no ID
    const [result]: any = await connection.query(
      "DELETE FROM characters WHERE id = ?",
      [id]
    );
    // O result.affectedRows mostra quantas linhas foram afetadas pela operação
    // Se for 0, significa que nenhum personagem com esse ID foi encontrado
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }
    // Se a exclusão foi feita com sucesso, retorna status 204 (sem conteúdo)
    return res.status(204).send();
  }

  // Método responsável por atualizar um personagem existente
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // Extrai o ID da URL
    const { nome, tipo, raca, arma, statues } = req.body; // Extrai os dados enviados no corpo
    // Mensagem especial se o personagem for um Nazgûl
    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }
    // Verifica se todos os campos foram preenchidos
    if (!nome || !tipo || !raca || !arma || !statues) {
      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }
    // Executa a atualização no banco de dados
    const [result]: any = await connection.query(
      "UPDATE characters SET nome = ?, tipo = ?, raca = ?, arma = ?, statues = ? WHERE id = ?",
      [nome, tipo, raca, arma, statues, id]
    );
    // Verifica se algum registro foi realmente atualizado
    // Se affectedRows for 0, significa que o ID não existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }
    // Retorna mensagem de sucesso com status 200
    return res
      .status(200)
      .json({ mensagem: "Personagem atualizado com sucesso" });
  }
}
