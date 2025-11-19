chrome.action.onClicked.addListener((tab) => {
  // 新しいウィンドウを開く
  chrome.windows.create({
    url: chrome.runtime.getURL("window.html"),
    type: "popup",
    width: 600,
    height: 400 
  }, function(win) {
    // ウィンドウが開かれた後の処理があればここに記述

    console.log(`拡張機能ウィンドウを開きました。ID: ${win.id}`);
  });
})