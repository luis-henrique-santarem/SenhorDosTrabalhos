import express, { Application, NextFunction, Request, Response, } from "express";
import router from "./routes/CharacterRoutes";
import { connection } from "./config/database";
const app: Application = express()
const PORT = 3000;
app.use(express.json());


app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
        
        const [rows]:any[] = await connection.query(
            "SELECT tipo FROM characters WHERE id = ?", [req.params.id]
        ) 

        if(rows.length > 0){
            const tipo = rows[0].tipo;
        switch (tipo) {
            case "Sociedade":
                console.log("Corram seus tolos!");
                break;

            case "Nazgûl":
                console.log("Os Nazgûl não estão em Moria.");
                break;

            case "Balrog":
                console.log("Você não vai passar!");
                break;

            default:
                break;
            }
        }
    }

    next();
});



app.use(router)

app.use((req, res) => {
  res.status(404).json({erro:"A passagem de Caradhras está fechada por Saruman. Esta rota não existe para nós. Só nos sobrou...Moria."})
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

})