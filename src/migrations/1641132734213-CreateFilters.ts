import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFilters1641132734213 implements MigrationInterface {
    name = 'CreateFilters1641132734213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "filter" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a3564db8ce9b0dcb991598944c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "filters"`);
    }

}
