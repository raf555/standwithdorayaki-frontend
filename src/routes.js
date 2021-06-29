import index from './routes/index.svelte';
import login from './routes/login.svelte';
import setting from './routes/setting.svelte';

import store from './routes/store.svelte';
import registerstore from './routes/registerstore.svelte';
import storeinfo from './routes/storeinfo.svelte';
import transfer from './routes/transfer.svelte';
import transferdorayaki from './routes/transferdorayaki.svelte';

import dorayaki from './routes/dorayaki.svelte';
import dorayakiinfo from './routes/dorayakiinfo.svelte';
import registerdorayaki from './routes/registerdorayaki.svelte';

import tes from './routes/tes.svelte';
import notfound from './routes/404.svelte';

export default {
    '/': index,
    '/register/': registerstore,
    '/login/': login,
    '/setting/': setting,

    '/store/transfer/:id': transferdorayaki,
    '/store/transfer/': transfer,
    '/store/:id': storeinfo,
    '/store/': store,

    '/dorayaki/new': registerdorayaki,
    '/dorayaki/:id': dorayakiinfo,
    '/dorayaki/': dorayaki,
    
    '/tes/': tes,
    '*': notfound
};
