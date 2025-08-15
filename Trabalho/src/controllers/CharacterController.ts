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



  async create(req: Request, res: Response): Promise<Response> {
    const { nome, tipo, raca, arma, statues } = req.body;
    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }
    if (!nome || !tipo || !raca || !arma || !statues) {
      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }
    await connection.query("INSERT INTO characters (nome, tipo, raca, arma, statues) VALUES (?, ?, ?, ?, ?)", [nome, tipo, raca, arma, statues]);
    return res.status(201).json({ mensagem: "Personagem criado com sucesso" });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const [rows] = await connection.query('SELECT * FROM characters');
    return res.status(200).json(rows);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query("SELECT tipo FROM characters WHERE id = ?", [id]);

    if (rows.length > 0 && rows[0].tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }

    const [result]: any = await connection.query(
      "DELETE FROM characters WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }

    return res.status(204).send();
  }


  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, tipo, raca, arma, statues } = req.body;

    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }

    if (!nome || !tipo || !raca || !arma || !statues) {
      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }

    const [result]: any = await connection.query("UPDATE characters SET nome = ?, tipo = ?, raca = ?, arma = ?, statues = ? WHERE id = ?", [nome, tipo, raca, arma, statues, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }

    return res
      .status(200)
      .json({ mensagem: "Personagem atualizado com sucesso" });
  }
}
