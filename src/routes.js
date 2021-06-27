import index from './routes/index.svelte';
import login from './routes/login.svelte';
import setting from './routes/setting.svelte';
import notfound from './routes/404.svelte';
import register from './routes/register.svelte';

export default {
    '/': index,
    '/register/': register,
    '/login/': login,
    '/setting/': setting,
    
    '*': notfound
};
