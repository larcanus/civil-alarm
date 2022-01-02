import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationBetweenUserAndFilter1641144497228 implements MigrationInterface {
    name = 'AddRelationBetweenUserAndFilter1641144497228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "filter" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_0a3564db8ce9b0dcb991598944c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "filters" ADD CONSTRAINT "FK_26773c326afa2a81aa4bca06705" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filters" DROP CONSTRAINT "FK_26773c326afa2a81aa4bca06705"`);
        await queryRunner.query(`DROP TABLE "filters"`);
    }

}
