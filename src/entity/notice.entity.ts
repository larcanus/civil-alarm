import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@app/entity/user.entity";

@Entity( { name: 'notices' } )
export class NoticeEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    filter_name: string;

    @Column( { type: 'jsonb', array: false } )
    documents!: string;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    created_at: Date;

    @ManyToOne( () => UserEntity, user => user.filters,
        { cascade: [ 'remove', 'insert', 'update' ] } )
    user: UserEntity;
}