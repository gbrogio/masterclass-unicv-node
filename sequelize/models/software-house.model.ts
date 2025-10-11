import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export interface SoftwareHouseAttributes {
  id: number;
  cnpj: string;
  token: string;
  status: "ativo" | "inativo";
  created_at: Date;
  updated_at: Date;
}

export type SoftwareHouseCreationAttributes = Optional<
  SoftwareHouseAttributes,
  "id" | "created_at" | "updated_at" | "status"
>;

export class SoftwareHouse
  extends Model<SoftwareHouseAttributes, SoftwareHouseCreationAttributes>
  implements SoftwareHouseAttributes
{
  public id!: number;
  public cnpj!: string;
  public token!: string;
  public status!: "ativo" | "inativo";
  public created_at!: Date;
  public updated_at!: Date;
}

SoftwareHouse.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cnpj: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    token: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("ativo", "inativo"),
      allowNull: false,
      defaultValue: "ativo",
    },
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
  {
    sequelize,
    tableName: "software_houses",
    modelName: "SoftwareHouse",
    timestamps: false,
  },
);
