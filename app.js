const appVersion = '0.0.1';

function reload() {
  if (!('serviceWorker' in navigator))
    return;

  navigator.serviceWorker.getRegistration()
  .then(registration => {
    if (registration.waiting != null) {
      // registration.unregister();  // 効果が疑わしいので保留
      alert('インストール済みの更新があります。アプリを再起動してください。');
      disableUpdateButton();
      registration.update();
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
              registration.update();
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