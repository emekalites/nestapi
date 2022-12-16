import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreMigration1671219900878 implements MigrationInterface {
    name = 'StoreMigration1671219900878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP(6), "name" character varying(191) NOT NULL, "address" character varying(191) NOT NULL, "city" character varying(191) NOT NULL, "location" character varying(191) NOT NULL, "state_id" integer, "country_id" integer, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_37792d029d51eadfae2ef0091f9" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_f64a0baba8c4ee301d43a77b1e2" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_f64a0baba8c4ee301d43a77b1e2"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_37792d029d51eadfae2ef0091f9"`);
        await queryRunner.query(`DROP TABLE "stores"`);
    }

}
