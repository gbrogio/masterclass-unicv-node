import { Exit } from "@/sequelize/models/exit.model";
import { v4 as uuid } from "uuid";

export class ExitsService {
  async create(userId: string) {
    const exit = await Exit.create({
      id: uuid(),
      full_name: userId,
      reason: "Test",
      created_at: new Date(),
    });

    return exit.dataValues;
  }

  async getAll() {
    const exits = await Exit.findAll();
    return exits;
  }

  async getOne(id: string) {
    const exit = await Exit.findByPk(id);
    if (!exit) {
      return null;
    }
    return exit.dataValues;
  }

  async update(id: string, data: { full_name: string; reason: string }) {
    const exit = await this.getOne(id);
    if (!exit) {
      return null;
    }
    await Exit.update(data, { where: { id } });
    return { id, ...data };
  }

  async delete(id: string) {
    const exit = await this.getOne(id);
    if (!exit) {
      return null;
    }
    await Exit.destroy({ where: { id } });
    return { id };
  }
}
