import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrgAndOrgSubscription1726772328152 implements MigrationInterface {
    name = 'AddOrgAndOrgSubscription1726772328152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization_subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying NOT NULL DEFAULT 'trial', "attributes" jsonb NOT NULL DEFAULT '{}', "trial_start_date" TIMESTAMP, "trial_days" integer, "organization_id" uuid NOT NULL, CONSTRAINT "REL_ee120ecc7d96135bd947a1ea7a" UNIQUE ("organization_id"), CONSTRAINT "PK_64e17f1dc8ebe056b49e751a494" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization_subscriptions" ADD CONSTRAINT "FK_ee120ecc7d96135bd947a1ea7ae" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_subscriptions" DROP CONSTRAINT "FK_ee120ecc7d96135bd947a1ea7ae"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "organization_subscriptions"`);
    }

}
