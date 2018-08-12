export class Message{
id:string;
    text:string;
    to:string;
    from:string;
    seen:boolean = false;
    sent:boolean = false;

    constructor(text:string,to:string){
        this.text=text;
        this.to= to;
    }

}
