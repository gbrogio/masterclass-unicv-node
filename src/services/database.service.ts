import { sequelize } from "@/sequelize";

export class DatabaseService {
  async connect() {
    await sequelize.authenticate().then(() => {
      console.log("Database connected");
    }).catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

    await sequelize.sync().then(() => {
      console.log("Database synchronized");
    }).catch((error) => {
      console.error("Unable to synchronize the database:", error);
    });
  }
}