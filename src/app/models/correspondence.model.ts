import { Deserializable } from './deserializable.model';

export class CorrespondeceModel implements Deserializable  {    
    public Id: number;
    public Consecutive: string;
    public Type: string;
    public SenderId: number;
    public AddresseeId: number;
    public Subject: string;
    public Body: string;
    public Ready: boolean;
    public Date: Date;
    public UserId: number;
    public Sender: string;
    public Addressee: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}