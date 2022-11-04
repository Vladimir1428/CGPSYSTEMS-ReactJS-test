import * as moment from "moment";

export interface ClientModel{
    client: string,
    credit: string,
    firstName: string,
    lastName: string,
    notes: string,
    since:  moment.Moment,
    totalEarnings: string,   
}