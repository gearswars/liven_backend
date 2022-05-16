import {MigrationInterface, QueryRunner} from 'typeorm';
import {crypt} from "../../util/PasswordUtils";

export class AdminCreationMigration1652584335062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "INSERT INTO user (id, name, surname, login, password, active) VALUES (?, ?, ?, ?, ?, ?)",
            [1, 'Administrator', 'root', 'admin', await crypt('admin'), 1]
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