import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { TestimonialUsageEntity } from './testimonial-usage.entity';

@Entity({ name: 'testimonial' })
export class TestimonialEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  content!: string;

  @Column()
  isNameUsageOnWebsiteGranted!: number;

  @Column()
  isNameUsageOnSocialMediaGranted!: number;

  @Column()
  isContentUsageOnWebsiteGranted!: number;

  @Column()
  isContentUsageOnSocialMediaGranted!: number;

  @Column()
  isLogoUsageOnWebsiteGranted!: number;

  @Column()
  isLogoUsageOnSocialMediaGranted!: number;

  @Column()
  updateAt!: Date;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.testimonial)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @OneToMany(() => TestimonialUsageEntity, (testimonialUsage) => testimonialUsage.testimonial)
  testimonialsUsages!: TestimonialUsageEntity[];
}
