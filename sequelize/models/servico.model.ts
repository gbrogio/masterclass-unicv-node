import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export type Produto = "boleto" | "pagamento" | "pix";
export type Situacao = "disponivel" | "cancelado" | "pago";

export interface ServicoAttributes {
  id: number;
  conta_id: number;
  produto: Produto;
  situacao: Situacao;
  ativo: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ServicoCreationAttributes = Optional<
  ServicoAttributes,
  "id" | "ativo" | "created_at" | "updated_at"
>;

export class Servico
  extends Model<ServicoAttributes, ServicoCreationAttributes>
  implements ServicoAttributes
{
  public id!: number;
  public conta_id!: number;
  public produto!: Produto;
  public situacao!: Situacao;
  public ativo!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

Servico.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    conta_id: { type: DataTypes.INTEGER, allowNull: false },
    produto: {
      type: DataTypes.ENUM("boleto", "pagamento", "pix"),
      allowNull: false,
    },
    situacao: {
      type: DataTypes.ENUM("disponivel", "cancelado", "pago"),
      allowNull: false,
    },
    ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
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
  { sequelize, tableName: "servicos", modelName: "Servico", timestamps: false },
);
