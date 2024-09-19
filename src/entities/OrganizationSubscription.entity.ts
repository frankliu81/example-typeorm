import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { Organization } from "./Organization.entity";

enum OrganizationSubscriptionState {
  Active = "active",
  Inactive = "inactive",
  Trial = "trial",
  Demo = "demo",
}

@Entity("organization_subscriptions")
export class OrganizationSubscription<TAttributes = any> {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /* Fields */
  @Column({
    nullable: false,
    type: "varchar",
    default: OrganizationSubscriptionState.Trial,
  })
  state: OrganizationSubscriptionState;

  @Column({ type: "jsonb", nullable: false, default: {} })
  attributes: TAttributes;

  @Column({ name: "trial_start_date", nullable: true })
  trialStartDate: Date;

  @Column({ name: "trial_days", nullable: true })
  trialDays: number;

  // https://orkhan.gitbook.io/typeorm/docs/one-to-one-relations
  // @JoinColumn  is required and must be set only on one side of
  // the relation. The side you set @JoinColumn on, that side's table
  // will contain a "relation id" and foreign keys to the target entity table.
  // https://stackoverflow.com/questions/30517728/does-it-matter-which-table-has-the-foreign-key-in-a-one-to-one-relationship
  // Is there functional dependency? If yes, then the "parent" is the comment table,
  // and the "child" is the reply table. So then you'd want to put a FK on the reply
  // table pointing to the comment table.
  // In our case, the organization subscription entity is the child entity, should contain
  // the join column and foreign key.
  // onDelete: 'CASCADE' specifies how foreign key should behave when referenced object is deleted
  @OneToOne(() => Organization, (organization) => organization.subscription, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "organization_id" })
  organization: Organization;
}
