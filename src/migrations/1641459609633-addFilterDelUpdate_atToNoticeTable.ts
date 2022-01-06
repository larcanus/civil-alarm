import {MigrationInterface, QueryRunner} from "typeorm";

export class addFilterDelUpdateAtToNoticeTable1641459609633 implements MigrationInterface {
    name = 'addFilterDelUpdateAtToNoticeTable1641459609633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notices" RENAME COLUMN "update_at" TO "filter_name"`);
        await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "filter_name"`);
        await queryRunner.query(`ALTER TABLE "notices" ADD "filter_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "filter_name"`);
        await queryRunner.query(`ALTER TABLE "notices" ADD "filter_name" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notices" RENAME COLUMN "filter_name" TO "update_at"`);
    }

}
