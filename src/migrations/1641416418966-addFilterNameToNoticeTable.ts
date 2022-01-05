import {MigrationInterface, QueryRunner} from "typeorm";

export class addFilterNameToNoticeTable1641416418966 implements MigrationInterface {
    name = 'addFilterNameToNoticeTable1641416418966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notices" ADD "filter_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "filter_name"`);
    }

}
