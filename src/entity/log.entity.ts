import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: 'logs' } )
export class LogEntity {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Column( { type: 'uuid', nullable: true } )
    userId: string;

    @Column( { nullable: true } )
    record: string;

    @Column( { type: 'timestamp without time zone', default: () => 'now()' } )
    created_at: Date;
}