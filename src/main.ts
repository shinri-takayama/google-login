// src/main.ts
import { supabase } from './lib/supabaseClient';
import { setupLoginPage } from './pages/loginPage';
import { setupHomePage } from './pages/homePage';

const app = document.querySelector<HTMLDivElement>('#app')!;

async function bootstrap() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    setupLoginPage(app, { initialStatus: `エラー: ${error.message}` });
    return;
  }

  if (data.session) {
    // ログイン済み → Home
    setupHomePage(app, data.session);
  } else {
    // 未ログイン → ログイン画面
    setupLoginPage(app);
  }
}

bootstrap().catch((e) => {
  console.error(e);
  setupLoginPage(app, { initialStatus: '初期化中にエラーが発生しました' });
});
