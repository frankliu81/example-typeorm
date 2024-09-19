import {
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrganizationSubscription } from "./OrganizationSubscription.entity";

@Entity({ name: "organizations" })
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // https://orkhan.gitbook.io/typeorm/docs/one-to-one-relations
  // specify inverse side as second parameter
  // cascade enable to save in this relation in one call
  @OneToOne(
    () => OrganizationSubscription,
    (orgSubscription) => orgSubscription.organization,
    {
      cascade: true,
    }
  )
  subscription: OrganizationSubscription;
}
