import { DataTypes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "@/sequelize";

interface ExitAttributes {
  id: string;
  full_name: string;
  reason: string;
  created_at: Date;
}

interface ExitCreationAttributes extends InferCreationAttributes<Exit> {}

export class Exit extends Model<ExitAttributes, ExitCreationAttributes> {
  declare id: string;
  declare full_name: string;
  declare reason: string;
  declare created_at: Date;
}

Exit.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'exits',
    timestamps: false,
  }
);
