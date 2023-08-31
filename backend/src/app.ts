import express, { Express, Request, Response } from "express";
import cors from "cors";
import { PORT } from "./@constants/variables";
import applicationRouter from "./routes/applicationRouter";
import path from "path";

const startServer = async () => {
  const app: Express = express();
  //Middlewares
  app.use(cors());
  app.use(cors({
    origin:["https://vishwanath-demyst-challenge.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/v1/application", applicationRouter);
//   app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Backend of Loan App-Demyst",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server working on port http://localhost:${PORT}`);
  });
};

export default startServer;
 