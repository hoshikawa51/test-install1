import Dexie from 'dexie';

/**
 * IndexedDBに保存するオブジェクト
 */
export interface SampleEntity {
  id?: number;
  name?: string | null;
  age?: number | null;
}

/**
 * IndexedDBをラップするDexieクラス
 */
export class SampleDatabase extends Dexie {

  // テーブルをプロパティとして定義
  // ジェネリックの1つ目はストアするオブジェクト、2つ目はキーの型
  table_1!: Dexie.Table<SampleEntity, number>;
  table_2!: Dexie.Table<SampleEntity, number>;

  constructor() {
    super('sample-database'); // データベース名をsuperのコンストラクタに渡す

    // テーブルとインデックスを定義する
    this.version(1).stores({
      table_1: 'id',
      table_2: 'id, name'
    });
  }

}