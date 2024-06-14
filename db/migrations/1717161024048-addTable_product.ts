import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableProduct1717161024048 implements MigrationInterface {
    name = 'AddTableProduct1717161024048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "feature" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer array NOT NULL, "rate" numeric(1,1) NOT NULL DEFAULT '0', "isPopular" boolean NOT NULL DEFAULT false, "categoryId" integer, "updateById" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f26166d2efc8af3fbe62df7545b" FOREIGN KEY ("updateById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f26166d2efc8af3fbe62df7545b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
