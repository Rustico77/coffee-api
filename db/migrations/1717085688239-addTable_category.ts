import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableCategory1717085688239 implements MigrationInterface {
    name = 'AddTableCategory1717085688239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "updateById" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_bddfb75e2b61517b12d77cfc5f5" FOREIGN KEY ("updateById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_bddfb75e2b61517b12d77cfc5f5"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
