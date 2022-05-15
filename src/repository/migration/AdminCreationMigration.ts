import {MigrationInterface, QueryRunner} from 'typeorm';

export class AdminCreationMigration1652584335062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "INSERT INTO user (id, name, surname, login, password, active) VALUES (?, ?, ?, ?, ?, ?)",
            [1, 'Administrator', 'root', 'admin', 'admin', 1]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `DELETE
             FROM user
             WHERE id = ?`,
            [1]
        );
    }

}