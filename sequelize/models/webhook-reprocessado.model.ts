import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export interface WebhookReprocessadoAttributes {
  id: number;
  uuid: string;
  protocolo: string | null;
  software_house_id: number | null;
  cedente_id: number | null;
  conta_id: number | null;
  data: any;
  created_at: Date;
  updated_at: Date;
}

export type WebhookReprocessadoCreationAttributes = Optional<
  WebhookReprocessadoAttributes,
  | "id"
  | "protocolo"
  | "software_house_id"
  | "cedente_id"
  | "conta_id"
  | "created_at"
  | "updated_at"
>;

export class WebhookReprocessado
  extends Model<
    WebhookReprocessadoAttributes,
    WebhookReprocessadoCreationAttributes
  >
  implements WebhookReprocessadoAttributes
{
  public id!: number;
  public uuid!: string;
  public protocolo!: string | null;
  public software_house_id!: number | null;
  public cedente_id!: number | null;
  public conta_id!: number | null;
  public data!: any;
  public created_at!: Date;
  public updated_at!: Date;
}

WebhookReprocessado.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
    protocolo: { type: DataTypes.UUID, allowNull: true },
    software_house_id: { type: DataTypes.INTEGER, allowNull: true },
    cedente_id: { type: DataTypes.INTEGER, allowNull: true },
    conta_id: { type: DataTypes.INTEGER, allowNull: true },
    data: { type: DataTypes.JSONB, allowNull: false },
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
    tableName: "webhook_reprocessados",
    modelName: "WebhookReprocessado",
    timestamps: false,
  },
);
