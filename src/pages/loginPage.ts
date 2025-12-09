// src/pages/loginPage.ts
import '../styles/login.css';
import { supabase } from '../lib/supabaseClient';
import { Header } from '../components/Header';

type LoginPageOptions = {
  initialStatus?: string;
};

export function setupLoginPage(
  root: HTMLElement,
  options: LoginPageOptions = {}
) {
  root.innerHTML = `
    <div class="login-page">
      ${Header("login")}

      <main class="login-main">
        <h1 class="login-title">Realibrary</h1>

      <button id="rl-login-btn" class="login-google-btn">
        <img src="./icon-google.svg" class="login-google-icon" />
        <span class="login-google-label">サインイン</span>
      </button>

        <p id="rl-status" class="login-status"></p>
      </main>
    </div>
  `;

  const loginBtn = document.getElementById(
    'rl-login-btn'
  ) as HTMLButtonElement | null;
  const statusEl = document.getElementById(
    'rl-status'
  ) as HTMLParagraphElement | null;
  const infoBtn = document.getElementById(
    'login-info-btn'
  ) as HTMLButtonElement | null;

  if (!loginBtn || !statusEl) return;

  // 初期メッセージ
  if (options.initialStatus) {
    statusEl.textContent = options.initialStatus;
  }

  // 「i」アイコン（とりあえず簡単な説明ダイアログ）
  infoBtn?.addEventListener('click', () => {
    alert('Realibrary：社内の本棚を管理するツールです。');
  });

  // ログインボタン
  loginBtn.addEventListener('click', async () => {
    statusEl.textContent = 'Google へリダイレクトします…';

    // 現在のパス（GitHub Pages の /google-login/ にも対応）
    const redirectTo = `${window.location.origin}${window.location.pathname}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error(error);
      statusEl.textContent = `ログインエラー: ${error.message}`;
    }
  });
}
