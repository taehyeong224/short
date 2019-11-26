import {CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Shorten} from "./Shorten";

@Entity()
export class ShortenStat {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    visitDate: Date;

    @ManyToOne(type => Shorten, shorten => shorten.shortenStats)
    shorten: Shorten;
}
