export class SymbolListEntity {
    private id: number;
    private Change24Hr: string;
    private LastPrice: string;
  
    constructor(id: number, change24Hr: string, lastPrice:string) {
      this.id = id;
      this.Change24Hr = change24Hr;
      this.LastPrice = lastPrice;
    }
  }