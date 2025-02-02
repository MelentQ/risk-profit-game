import {createApp} from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import {ru} from 'primelocale/ru.json';
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    locale: ru,
    theme: {
        preset: Aura,
    },
});

app.directive('tooltip', Tooltip);

app.mount('#app');
