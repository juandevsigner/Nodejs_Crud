import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  @Unique(['email'])
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  gender!: string;

  @Column()
  @UpdateDateColumn()
  updateAt!: Date;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
