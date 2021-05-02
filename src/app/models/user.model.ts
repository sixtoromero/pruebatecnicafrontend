import { Deserializable } from './deserializable.model';

export class UserModel implements Deserializable  {    
    public Id: number;
    public Names: string;
    public Surnames: string;
    public Username: string;
    public Password: string;
    public Email: string;
    public Status: string;
    public RolId: number;
    public Date: Date;    

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}