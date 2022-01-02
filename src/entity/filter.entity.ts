import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/entity/user.entity';

@Entity( { name: 'filters' } )
export class FilterEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne( () => UserEntity, user => user.filters,
        { cascade: [ 'remove', 'insert', 'update' ] } )
    user: UserEntity;

    @Column( { default: '' } )
    name: string;

    @Column( { default: '' } )
    filter: string;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    created_at: Date;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    update_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_at = new Date();
    }
}