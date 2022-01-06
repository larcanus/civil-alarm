import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/entity/user.entity';

@Entity( { name: 'filters' } )
export class FilterEntity {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Column( { default: '' } )
    name_1: string;

    @Column( { default: '' } )
    filter_1: string;

    @Column( { default: '' } )
    subject_1: string;

    @Column( { type: 'boolean' , default: true } )
    active_1: string;

    @Column( { default: '' } )
    name_2: string;

    @Column( { default: '' } )
    filter_2: string;

    @Column( { default: '' } )
    subject_2: string;
    
    @Column( { type: 'boolean' , default: true }  )
    active_2: string;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    created_at: Date;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    update_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_at = new Date();
    }

    @ManyToOne( () => UserEntity, user => user.filters,
        { onDelete: 'CASCADE' } )
    user: UserEntity;
}