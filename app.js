import Dexie from 'dexie';
import { SampleDatabase } from '@/SampleDatabase';
const appVersion = '0.0.1';

function reload() {
  if (!('serviceWorker' in navigator))
    return;

  console.log('app_js reload開始');
  navigator.serviceWorker.getRegistration()
  .then(registration => {
    if (registration.waiting != null) {
      // registration.unregister();  // 効果が疑わしいので保留
      alert('インストール済みの更新があります。アプリを再起動してください。');
      disableUpdateButton();
    }
    else {
      registration.update()
      .then(registration => {
        const installingWorker = registration.installing;
        if (installingWorker != null) {
          installingWorker.onstatechange = e => {
            if (e.target.state == 'installed') {
              // registration.unregister();  // 効果が疑わしいので保留
              alert('更新がインストールされました。アプリを再起動してください。');
              disableUpdateButton();
            }
          }
        }
        else {
          alert('更新はありませんでした。');
        }
      });
    }
  });
}

function disableUpdateButton() {
  // 更新チェック用のボタンを無効化する。
  // ボタンの近くに「再起動してください。」などと表示すると良い。
}

const ipGet = () => {
  var wm = new WeakMap;
    var obj = {};
    const callback = (data) => wm.set(obj, data.ip);

    var script = document.createElement('script');
    script.src='https://ipinfo.io?callback=callback'
    document.head.appendChild(script);
    console.log(window.location.href);

    window.onload = () => console.log(wm.get(obj));
  }

  const ipGet1 = () => {
    document.getElementById('your_id').innerText = "";
    fetch('https://api.ipify.org?format=json')
    .then(response => {
      if (!response.ok) {
        throw new Error('ネットワークの状態が良くないか、サーバーに接続できませんでした。');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('your_id').innerText += data.ip;
    })
    .catch(error => {
      document.getElementById('your_id').innerText = 'IPアドレスを取得できませんでした。';
      console.error('Error fetching IP:', error);
    });
  }

  const strageOtameshi = async () => {
    const db = new Dexie('sample-database');
    db.version(1).stores({
      table_1: 'id, name, age, [name+age]'
    });
    await db.table_1.put({ id: 1, name: 'hoge', age: 10 });
    await db.table_1.bulkPut([
    { id: 2, name: 'hoge', age: 11 },
    { id: 3, name: 'fuga', age: 12 },
    { id: 4, name: 'hoge', age: 13 },
    { id: 5, name: null, age: 14 },
    { id: 6, name: null, age: 15 },
  ]);
  
  const data = await db.table_1.toArray();
  console.log('data: ', data);
  // const data = await db.table_1.get(1);
  // console.log('data: ', data);
  
  // console.log('nameがhogeに等しい:\n',
  //   await db.table_1.where('name').equals('hoge').toArray());
  
  // console.log('nameがhogeに等しいまたはageが15に等しい:\n',
  //   await db.table_1
  //     .where('name').equals('hoge')
  //     .or('age').equals(15)
  //     .toArray());
  
  // console.log('ageが12より大きい;\n',
  //   await db.table_1.where('age').above(12).toArray());
  //   // await db.table_1.put({ id: 1, name: 'huge', age: 11 });
  //   // await db.table_1.delete(1);
  //   // indexedDB.deleteDatabase('sample-database');
  
  }