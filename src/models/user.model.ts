import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'User',
  timestamps: true,
  paranoid: true,
  comment: '유저 테이블',
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @ApiProperty()
  @Expose()
  @Column({
    allowNull: false,
    comment: '유저 이름',
  })
  name: string;

  @ApiProperty()
  @Expose()
  @Column({
    allowNull: false,
    comment: '유저 이메일',
  })
  email: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '유저 비밀번호',
  })
  password: string;
}
