import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1671211996134 implements MigrationInterface {
    name = 'AuthMigration1671211996134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP(6), "firstname" character varying(191) NOT NULL, "lastname" character varying(191) NOT NULL, "email" character varying(191) NOT NULL, "password" character varying(191) NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'male', "phone" character varying(191), "address" character varying(191), "status" integer NOT NULL DEFAULT '1', "state_id" integer, "country_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_resets" ("id" SERIAL NOT NULL, "email" character varying(191) NOT NULL, "token" character varying(191) NOT NULL, "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_4816377aa98211c1de34469e742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "countries" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "states" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e589d18ac4320f3f83fc7891421" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ae78dc6cb10aa14cfef96b2dd90" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ae78dc6cb10aa14cfef96b2dd90"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e589d18ac4320f3f83fc7891421"`);
        await queryRunner.query(`ALTER TABLE "states" ADD "created_by" character varying NOT NULL DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "countries" ADD "created_by" character varying NOT NULL DEFAULT 'admin'`);
        await queryRunner.query(`DROP TABLE "password_resets"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
