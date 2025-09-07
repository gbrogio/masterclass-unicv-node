import { Router, type Express } from "express";
import { ExitsController } from "./exits.controller";
import { ExitsService } from "./exits.service";

export class ExitsModule {
  router: Router;

  constructor(app: Express) {
    this.router = Router();

    const exitsService = new ExitsService();
    const exitsController = new ExitsController(exitsService);

    this.router.post("/", exitsController.create);
    this.router.get("/", exitsController.getAll);

    this.router.get("/:id", exitsController.getOne);
    this.router.put("/:id", exitsController.update);
    this.router.delete("/:id", exitsController.delete);

    app.use("/exits", this.router);
  }
}
