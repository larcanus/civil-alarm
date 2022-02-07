import {MigrationInterface, QueryRunner} from "typeorm";

export class logs1644158026910 implements MigrationInterface {
    name = 'logs1644158026910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "production"."logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "record" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "production"."logs"`);
    }

}
