// src/main.ts
import './style.css';
import { supabase } from './lib/supabaseClient';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="rl-page">
    <h1 class="rl-logo">Realibrary</h1>
    <button id="rl-login-btn" class="rl-login-btn">ログイン</button>
    <p id="rl-status" class="rl-status"></p>
  </div>
`;

const loginBtn = document.getElementById('rl-login-btn') as HTMLButtonElement;
const statusEl = document.getElementById('rl-status') as HTMLParagraphElement;

let isLoggedIn = false;

async function init() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    statusEl.textContent = `エラー: ${error.message}`;
    return;
  }

  if (data.session) {
    isLoggedIn = true;
    updateUILoggedIn(data.session.user.email ?? '');
  } else {
    isLoggedIn = false;
    updateUILoggedOut();
  }
}

loginBtn.addEventListener('click', async () => {
  if (!isLoggedIn) {
    // ログイン処理（Google）
    statusEl.textContent = 'Googleへリダイレクトします…';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error(error);
      statusEl.textContent = `ログインエラー: ${error.message}`;
    }
  } else {
    // ログアウト処理
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      statusEl.textContent = `ログアウトエラー: ${error.message}`;
      return;
    }
    isLoggedIn = false;
    updateUILoggedOut();
  }
});

function updateUILoggedIn(email: string) {
  loginBtn.textContent = 'ログアウト';
  statusEl.textContent = email ? `${email} でログイン中` : 'ログイン中';
}

function updateUILoggedOut() {
  loginBtn.textContent = 'ログイン';
  statusEl.textContent = '';
}

init().catch((e) => {
  console.error(e);
  statusEl.textContent = '初期化中にエラーが発生しました';
});
