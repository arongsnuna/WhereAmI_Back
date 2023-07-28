import { Exclude } from "class-transformer";

export class UsersEntity {

    email: String;

    password: String;

    userName: String;

    @Exclude()
    id: String;

    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

    @Exclude()
    profilePath: String;


  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
    
}