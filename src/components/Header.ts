// src/components/Header.ts

/**
 * 共通ヘッダーコンポーネント
 * @param title - ヘッダー中央のタイトル
 * @returns string - 挿入できる HTML
 *
 * ボタンは画面側で addEventListener をつける
 */
export function Header(title: string = "Realibrary") {
  return `
    <header class="home-header">
      <div class="home-header-left">
        <button id="header-left-btn" class="home-header-icon-btn">↩</button>
      </div>

      <div class="home-header-center">${title}</div>

      <div class="home-header-right">
        <button id="header-right-btn" class="home-header-icon-btn">🔍</button>
      </div>
    </header>
  `;
}
