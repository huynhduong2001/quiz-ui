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
import ReviewResult from '~/pages/ReviewResult';
import EditExam from '~/pages/EditExam';
const publicRoutes = [
    { path: '/login', component: Login, layout: NoneLayout },
    { path: '/register', component: Register, layout: NoneLayout },
    { path: '/forgotpw', component: ForgotPassword, layout: NoneLayout },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/myLibrary', component: MyLibrary },
    { path: '/myLibrary/reviewResult', component: ReviewResult },
    { path: '/createQuestion', component: CreateQuestion },
    { path: '/createQuestion/editExam', component: EditExam },
    { path: '/myAccount', component: MyAccount },
    { path: '/join', component: Join, layout: HeaderOnly },
    { path: '/question', component: Question },
    { path: '/exam', component: Exam },
];

export { publicRoutes, privateRoutes };
