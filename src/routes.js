import index from './routes/index.svelte';
import login from './routes/login.svelte';
import setting from './routes/setting.svelte';

import tes from './routes/tes.svelte';
import notfound from './routes/404.svelte';

import store from './routes/store/store.svelte';
import registerstore from './routes/store/registerstore.svelte';
import storeinfo from './routes/store/storeinfo.svelte';
import transfer from './routes/store/transfer.svelte';
import transferdorayaki from './routes/store/transferdorayaki.svelte';

import dorayaki from './routes/dorayaki/dorayaki.svelte';
import dorayakiinfo from './routes/dorayaki/dorayakiinfo.svelte';
import registerdorayaki from './routes/dorayaki/registerdorayaki.svelte';

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
