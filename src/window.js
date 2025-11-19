document.getElementById('helperButton').addEventListener('click', async () => {
  const statusText = document.getElementById('status');
  const dlsiteUrlInput = document.getElementById('dlsiteUrl');
  const url = dlsiteUrlInput.value.trim();

  if (!url || !url.startsWith('https://')) {
    statusText.textContent = 'エラー: 正しいURLが入力されていません。';
    return;
  }
  
  statusText.textContent = '取得中...';

  try {
    // 1. Fetch APIでURLからHTMLコンテンツを取得
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const htmlText = await response.text();

    // 2. 正規表現を使ってHTMLからタイトル要素を抽出
    // ユーザーから提示された形式にマッチするように正規表現を作成
    // <h1 itemprop="name" id="work_name">...</h1>
    const titleRegex = /<h1\s+itemprop="name"\s+id="work_name"[^>]*>(.*?)<\/h1>/i;
    const match = htmlText.match(titleRegex);

    if (match && match[1]) {
      const title = match[1].trim();
      
      // 抽出したタイトルをステータスに表示
      statusText.innerHTML = `✅ **取得に成功しました:** <br> ${title}`;
      console.log(`[DLCE] 取得タイトル: ${title}`);
      
      // 次のステップのために、タイトルを投稿ページに入力するロジックをここに書く
      // ...
      
    } else {
      statusText.textContent = 'エラー: HTML内から指定のタイトル要素が見つかりませんでした。';
    }

  } catch (error) {
    statusText.textContent = `致命的なエラーが発生しました: ${error.message}。ネットワークまたはURLを確認してください。`;
    console.error('[DLCE] Fetchまたはパースエラー:', error);
  }
});