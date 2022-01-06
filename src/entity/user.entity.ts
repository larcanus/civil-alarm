import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';
import { FilterEntity } from "@app/entity/filter.entity";

@Entity( { name: 'users' } )
export class UserEntity {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash( this.password, 10 );
    }

    @OneToMany( () => FilterEntity, filters => filters.user, )
    filters: FilterEntity;

    @OneToMany( () => FilterEntity, notices => notices.user, )
    notices: FilterEntity;
}