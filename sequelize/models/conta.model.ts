import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export interface ContaAttributes {
  id: number;
  cedente_id: number;
  status: "ativo" | "inativo";
  configuracao_notificacao: any | null;
  created_at: Date;
  updated_at: Date;
}

export type ContaCreationAttributes = Optional<
  ContaAttributes,
  "id" | "configuracao_notificacao" | "status" | "created_at" | "updated_at"
>;

export class Conta
  extends Model<ContaAttributes, ContaCreationAttributes>
  implements ContaAttributes
{
  public id!: number;
  public cedente_id!: number;
  public status!: "ativo" | "inativo";
  public configuracao_notificacao!: any | null;
  public created_at!: Date;
  public updated_at!: Date;
}

Conta.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cedente_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("ativo", "inativo"),
      allowNull: false,
      defaultValue: "ativo",
    },
    configuracao_notificacao: { type: DataTypes.JSONB, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, tableName: "contas", modelName: "Conta", timestamps: false },
);
