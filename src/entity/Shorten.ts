import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {ShortenStat} from "./ShortenStat";

@Entity()
export class Shorten extends BaseEntity {
    @PrimaryColumn({type: "varchar"})
    id: string;

    @Column({ type: "varchar", nullable: false})
    originUrl: string;

    @CreateDateColumn()
    regDate: Date;

    @UpdateDateColumn()
    modDate: Date;

    @OneToMany(type => ShortenStat, shortenStat => shortenStat.shorten)
    shortenStats: ShortenStat[];
}
