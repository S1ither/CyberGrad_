import { DataSource, DataSourceOptions } from "mikro-orm";

export default class DB {
  private _connect: DataSource;

  constructor(databaseOpt: DataSourceOptions) {
    this._connect = new DataSource(databaseOpt);
  }

  public connect(): void {
    !this._connect.isInitialized && this._connect.initialize();
    console.log("Database initialize");
  }
  public save(): void {}
  public put(): void {}
  public delete(): void {}
}

/* 
Эта ***** не работает нормально с модульной структурой, как и typeorm, и орм системы. Костыль на файловую систему, условимся что это закрытая внутри компании приложение.
*/
