import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TestimonialEntity } from './testimonial.entity';

@Entity({ name: 'testimonial_usage' })
export class TestimonialUsageEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  websiteUrl!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToOne(() => TestimonialEntity, (testimonial) => testimonial.testimonialsUsages)
  @JoinColumn({ name: 'testimonial_id' })
  testimonial!: TestimonialEntity;
}
