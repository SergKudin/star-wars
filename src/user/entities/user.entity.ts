import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User id', nullable: true })
  id: number;

  // @Column()
  // @ApiProperty({ description: 'User name', nullable: true })
  // name: string;

  @Column()
  @ApiProperty({ description: 'User email', nullable: true })
  email: string;

  @Column()
  @ApiProperty({ description: 'User password', nullable: true })
  password: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date User created', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date User updated', nullable: true })
  updatedAt: Date;

}
