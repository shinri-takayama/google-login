// src/pages/homePage.ts
import '../styles/home.css';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { Header } from '../components/Header';

export function setupHomePage(root: HTMLElement, session: Session) {
  root.innerHTML = `
    <div class="home-page">
      ${Header("Home")}

      <main class="home-main">
        <div class="home-grid">
          <div class="home-item" id="home-add">
            <div class="home-item-icon">＋</div>
            <div class="home-item-label">追加</div>
          </div>
          <div class="home-item" id="home-return">
            <div class="home-item-icon">↩</div>
            <div class="home-item-label">返却</div>
          </div>
          <div class="home-item" id="home-lend">
            <div class="home-item-icon">📘</div>
            <div class="home-item-label">貸出</div>
          </div>
          <div class="home-item" id="home-list">
            <div class="home-item-icon">≡</div>
            <div class="home-item-label">一覧</div>
          </div>
          <div class="home-item" id="home-bookmark">
            <div class="home-item-icon">🔖</div>
            <div class="home-item-label">ブックマーク</div>
          </div>
          <div class="home-item" id="home-manage">
            <div class="home-item-icon">👤</div>
            <div class="home-item-label">管理</div>
          </div>
        </div>
      </main>
    </div>
  `;

  // -------------------
  // ヘッダーのイベント
  // -------------------

  // 左ボタン → ログアウト
  document.getElementById("header-left-btn")?.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`ログアウトエラー: ${error.message}`);
      return;
    }
    location.reload(); // or setupLoginPage(root)
  });

  // 右ボタン（🔍） → 今はダミー
  document.getElementById("header-right-btn")?.addEventListener("click", () => {
    alert("検索機能（今後実装予定）");
  });

  // -------------------
  // メニューアイコンのイベント
  // -------------------

  document.getElementById('home-add')?.addEventListener('click', () => alert("追加画面へ"));
  document.getElementById('home-return')?.addEventListener('click', () => alert("返却画面へ"));
  document.getElementById('home-lend')?.addEventListener('click', () => alert("貸出画面へ"));
  document.getElementById('home-list')?.addEventListener('click', () => alert("一覧画面へ"));
  document.getElementById('home-bookmark')?.addEventListener('click', () => alert("ブックマーク画面へ"));
  document.getElementById('home-manage')?.addEventListener('click', () => alert("管理画面へ"));
}
