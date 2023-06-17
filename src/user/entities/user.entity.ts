import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Декоратор, указывающий, что это сущность
export class User {
  @PrimaryGeneratedColumn() // Декоратор, указывающий, что это первичный ключ, генерируемый автоматически
  id: number;

  @Column() // Декоратор, указывающий, что это колонка в таблице
  name: string;

  @Column()
  email: string;

  // Другие поля и методы сущности
}
