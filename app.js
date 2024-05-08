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

    // window.onload = () => console.log(wm.get(obj));
    alert('IP：' & wm.get(obj));
    
  }
