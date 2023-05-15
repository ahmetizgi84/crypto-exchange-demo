import { SymbolListEntity } from "./SymbolListEntity";

export class SymbolList {
    private id: number;
    private BTC:  Array<SymbolListEntity>;
    private ETH:  Array<SymbolListEntity>;
    private Favorite:  Array<SymbolListEntity>;
    private TRY:  Array<SymbolListEntity>;
    private USDT:  Array<SymbolListEntity>;
  
    constructor(id: number,btc:  Array<SymbolListEntity>, eth:  Array<SymbolListEntity>, favorite:  Array<SymbolListEntity>, trytl:  Array<SymbolListEntity>, usdt:  Array<SymbolListEntity>) {
      this.id = id;
      this.BTC = btc;
      this.ETH = eth;
      this.Favorite= favorite;
      this.TRY = trytl;
      this.USDT = usdt;
    }
  }