import { MigrationInterface, QueryRunner, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

export class ADDMASTERADMIN1692732796128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASS;
    const adminRole = 'admin';

    if (!adminEmail || !adminPass) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASS environment variables must be set.");
    }

    const hashedPass = await bcrypt.hash(adminPass, +process.env.SALT_OR_ROUNDS);

    await queryRunner.query(`
      INSERT INTO user (email, password, roles)
      VALUES (?, ?, ?)
    `, [adminEmail, hashedPass, adminRole]);

    console.log(`Created master admin:
  email: ${adminEmail},
  password: ${adminPass},
  role: ${adminRole}
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      throw new Error("You need to set the ADMIN_EMAIL environment variable to rollback the migration.");
    }

    await queryRunner.query(`
      DELETE FROM user
      WHERE email = ?
    `, [adminEmail]);

    console.log(`Rolled back the creation of a master administrator account by email: ${adminEmail}`);
  }
}


