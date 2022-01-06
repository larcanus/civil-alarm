import {MigrationInterface, QueryRunner} from "typeorm";

export class addAllTables1641477339799 implements MigrationInterface {
    name = 'addAllTables1641477339799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "production"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production"."filters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_1" character varying NOT NULL DEFAULT '', "filter_1" character varying NOT NULL DEFAULT '', "subject_1" character varying NOT NULL DEFAULT '', "active_1" boolean NOT NULL DEFAULT true, "name_2" character varying NOT NULL DEFAULT '', "filter_2" character varying NOT NULL DEFAULT '', "subject_2" character varying NOT NULL DEFAULT '', "active_2" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_0a3564db8ce9b0dcb991598944c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production"."notices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filter_name" character varying NOT NULL, "documents" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "production"."filters" ADD CONSTRAINT "FK_26773c326afa2a81aa4bca06705" FOREIGN KEY ("userId") REFERENCES "production"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production"."notices" ADD CONSTRAINT "FK_79364067097eea7912bb08855b6" FOREIGN KEY ("userId") REFERENCES "production"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "production"."notices" DROP CONSTRAINT "FK_79364067097eea7912bb08855b6"`);
        await queryRunner.query(`ALTER TABLE "production"."filters" DROP CONSTRAINT "FK_26773c326afa2a81aa4bca06705"`);
        await queryRunner.query(`DROP TABLE "production"."notices"`);
        await queryRunner.query(`DROP TABLE "production"."filters"`);
        await queryRunner.query(`DROP TABLE "production"."users"`);
    }

}
