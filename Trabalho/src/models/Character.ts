export class Character {
    private id: number;
    private nome: string;
    private tipo: string;
    private raca: string;
    private arma: string;
    private status: string;

    constructor(
        id: number,
        nome: string,
        tipo: string,
        raca: string,
        arma: string,
        status: string
    ) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.raca = raca;
        this.arma = arma;
        this.status = status;
    }
}