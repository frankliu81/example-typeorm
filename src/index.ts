import * as express from "express";
import { AppDataSource } from './data-source';
import { orgRouter } from "./routes/organization.routes";

AppDataSource.initialize().then(() => {
   const app = express();
   app.use(express.json())
   app.use(orgRouter);
   app.get('/', (req, res) => {
   return res.json('Established connection!');
 })
  return app.listen(process.env.PORT);
})