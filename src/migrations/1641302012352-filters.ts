import {MigrationInterface, QueryRunner} from "typeorm";

export class filters1641302012352 implements MigrationInterface {
    name = 'filters1641302012352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filters" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "filters" ADD CONSTRAINT "FK_26773c326afa2a81aa4bca06705" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filters" DROP CONSTRAINT "FK_26773c326afa2a81aa4bca06705"`);
        await queryRunner.query(`ALTER TABLE "filters" DROP COLUMN "userId"`);
    }

}
