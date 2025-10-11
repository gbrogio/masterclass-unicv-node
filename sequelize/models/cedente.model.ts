import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export interface CedenteAttributes {
  id: number;
  software_house_id: number;
  cnpj: string;
  token: string;
  status: "ativo" | "inativo";
  configuracao_notificacao: any | null;
  created_at: Date;
  updated_at: Date;
}

export type CedenteCreationAttributes = Optional<
  CedenteAttributes,
  "id" | "configuracao_notificacao" | "status" | "created_at" | "updated_at"
>;

export class Cedente
  extends Model<CedenteAttributes, CedenteCreationAttributes>
  implements CedenteAttributes
{
  public id!: number;
  public software_house_id!: number;
  public cnpj!: string;
  public token!: string;
  public status!: "ativo" | "inativo";
  public configuracao_notificacao!: any | null;
  public created_at!: Date;
  public updated_at!: Date;
}

Cedente.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    software_house_id: { type: DataTypes.INTEGER, allowNull: false },
    cnpj: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    token: { type: DataTypes.STRING, allowNull: false },
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
  { sequelize, tableName: "cedentes", modelName: "Cedente", timestamps: false },
);
