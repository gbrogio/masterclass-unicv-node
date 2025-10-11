import { type Express } from "express";
import { validarHeaders } from "./modules/webhook/util/validar-headers";

export class Routes {
  constructor(app: Express) {
  
    // app.use("/reenviar", validarHeaders, (req, res) => {
    //   req.headers; // new Headers()
    // });
  }
}
