import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/types/roles.type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User id', nullable: true })
  id: string;

  @Column()
  @ApiProperty({ description: 'User email', nullable: true })
  email: string;

  @Column()
  @ApiProperty({ description: 'User password', nullable: true })
  password?: string;

  @Column()
  @ApiProperty({ description: 'User role', nullable: false })
  roles: Roles;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date User created', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date User updated', nullable: true })
  updatedAt: Date;

}
