import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration1671143466033 implements MigrationInterface {
    name = 'DbMigration1671143466033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "states" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "code" character varying(191) NOT NULL, "created_by" character varying NOT NULL DEFAULT 'admin', "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "country_id" integer, CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "code" character varying(191) NOT NULL, "phone_code" character varying(191) NOT NULL, "created_by" character varying NOT NULL DEFAULT 'admin', "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "states"`);
    }

}
