import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@app/entity/user.entity";

@Entity( { name: 'notices' } )
export class NoticeEntity {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string

    @Column()
    filter_name: string;

    @Column( { type: 'jsonb', array: false } )
    documents!: string;

    @Column( { type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' } )
    created_at: Date;

    @ManyToOne( () => UserEntity, user => user.filters,
        { onDelete: 'CASCADE' } )
    user: UserEntity;
}