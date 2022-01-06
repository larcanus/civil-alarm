import {MigrationInterface, QueryRunner} from "typeorm";

export class notes1641398259796 implements MigrationInterface {
    name = 'notes1641398259796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notices" ("id" SERIAL NOT NULL, "documents" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notices" ADD CONSTRAINT "FK_79364067097eea7912bb08855b6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notices" DROP CONSTRAINT "FK_79364067097eea7912bb08855b6"`);
        await queryRunner.query(`DROP TABLE "notices"`);
    }

}
