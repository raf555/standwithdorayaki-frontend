import index from './routes/index.svelte';
import tes from './routes/Tes.svelte';
import login from './routes/login.svelte';

export default {
    '/': index,
    '/tes/': tes,
    '/login/': login,
    // The catch-all route must always be last
    //'*': NotFound
};
