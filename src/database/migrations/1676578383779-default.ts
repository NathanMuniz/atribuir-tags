import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676578383779 implements MigrationInterface {
    name = 'default1676578383779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "complements" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_complements" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_e244c5ff57861339ebb5e63abb3" FOREIGN KEY ("user_sender") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ab830c254dc31e6f7f519742089" FOREIGN KEY ("user_receiver") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_529695b3459cb911c7be20843c8" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_complements"("id", "user_sender", "user_receiver", "tag_id", "message", "created_at") SELECT "id", "user_sender", "user_receiver", "tag_id", "message", "created_at" FROM "complements"`);
        await queryRunner.query(`DROP TABLE "complements"`);
        await queryRunner.query(`ALTER TABLE "temporary_complements" RENAME TO "complements"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complements" RENAME TO "temporary_complements"`);
        await queryRunner.query(`CREATE TABLE "complements" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "complements"("id", "user_sender", "user_receiver", "tag_id", "message", "created_at") SELECT "id", "user_sender", "user_receiver", "tag_id", "message", "created_at" FROM "temporary_complements"`);
        await queryRunner.query(`DROP TABLE "temporary_complements"`);
        await queryRunner.query(`DROP TABLE "complements"`);
    }

}
