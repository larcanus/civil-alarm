import {MigrationInterface, QueryRunner} from "typeorm";

export class addFilterSubject1641413408309 implements MigrationInterface {
    name = 'addFilterSubject1641413408309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filters" ADD "subject_1" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "filters" ADD "subject_2" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filters" DROP COLUMN "subject_2"`);
        await queryRunner.query(`ALTER TABLE "filters" DROP COLUMN "subject_1"`);
    }

}
