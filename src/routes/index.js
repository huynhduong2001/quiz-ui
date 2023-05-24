//Layouts
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Join from '~/pages/Join';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/join', component: Join, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
