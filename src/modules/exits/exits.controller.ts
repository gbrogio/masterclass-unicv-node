import { type Request, type Response } from "express";
import { ExitsService } from "./exits.service";

export class ExitsController {
  constructor(private readonly exitsService: ExitsService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const { userId } = request.body;
    const result = await this.exitsService.create(userId);
    response.status(201).json(result);
  }

  async getAll(_request: Request, response: Response) {
    const result = await this.exitsService.getAll();
    response.status(200).json(result);
  }

  async getOne(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.exitsService.getOne(id);
    response.status(200).json(result);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { full_name, reason } = request.body;
    const result = await this.exitsService.update(id, { full_name, reason });
    response.status(200).json(result);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.exitsService.delete(id);
    response.status(200).json(result);
  }
}
