# ベクター変換（オフライン対応PWA）

画像（JPEG・PNG・WebPなど）を、まとめてSVGに変換します。処理はすべて端末内で行います。

## ファイル構成
- index.html … 画面と変換処理
- imagetracer.js … ベクター化ライブラリ（imagetracer.js 1.2.6 / パブリックドメイン）
- manifest.json / sw.js … アプリ設定とオフライン対応
- icon-192.png / icon-512.png / apple-touch-icon.png … アイコン

## 更新するとき
sw.js の CACHE_NAME の番号と、index.html の「バージョン」表示を上げてからアップロードしてください。
