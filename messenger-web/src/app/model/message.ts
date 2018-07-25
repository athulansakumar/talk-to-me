export class Message{
id:string;
    text:string;
    to:string;
    from:string;

    constructor(text:string,to:string){
        this.text=text;
        this.to= to;
    }

}
