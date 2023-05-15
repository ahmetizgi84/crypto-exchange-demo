export class SymbolEntity {
    private id: number;
    private BaseAsset: string;
    private Name: string;
  
    constructor(id: number, baseAsset: string, name:string) {
      this.id = id;
      this.BaseAsset = baseAsset;
      this.Name = name;
    }
  }