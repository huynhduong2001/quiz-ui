//Layouts
import { HeaderOnly, NoneLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Join from '~/pages/Join';
import MyLibrary from '~/pages/MyLibrary';
import CreateQuestion from '~/pages/CreateQuestion';
import MyAccount from '~/pages/MyAccount';
import Question from '~/pages/Question';
import Exam from '~/pages/Exam';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassWord';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/myLibrary', component: MyLibrary },
    { path: '/createQuestion', component: CreateQuestion },
    { path: '/myAccount', component: MyAccount },
    { path: '/join', component: Join, layout: HeaderOnly },
    { path: '/question', component: Question, layout: HeaderOnly },
    { path: '/exam', component: Exam, layout: HeaderOnly },
    { path: '/login', component: Login, layout: NoneLayout },
    { path: '/register', component: Register, layout: NoneLayout },
    { path: '/forgotpw', component: ForgotPassword, layout: NoneLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
