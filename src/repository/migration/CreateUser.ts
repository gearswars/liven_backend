import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateUser1652580010833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "CREATE TABLE user( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, active TINYINT DEFAULT 1 NOT NULL, CONSTRAINT IDX_a62473490b3e4578fd683235c5 UNIQUE (login));"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE user`);
    }

}