import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1694120420094 implements MigrationInterface {
  name = 'AddUserRole1694120420094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'ADMIN') NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`testimonial\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`testimonial\` CHANGE \`update_at\` \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`testimonial\` CHANGE \`update_at\` \`update_at\` datetime(0) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`testimonial\` CHANGE \`created_at\` \`created_at\` datetime(0) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
