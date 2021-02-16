import {MigrationInterface, QueryRunner} from "typeorm";

export class createTodo1613488971747 implements MigrationInterface {
    name = 'createTodo1613488971747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
