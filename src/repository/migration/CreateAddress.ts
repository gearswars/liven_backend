import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateAddress1652584275517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "CREATE TABLE address( id INT AUTO_INCREMENT PRIMARY KEY, address VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, id_user INT NOT NULL, CONSTRAINT FK_0a48e44e5353c7f029559178716 FOREIGN KEY (id_user) REFERENCES user (id) ON UPDATE CASCADE)"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE address`);
    }

}