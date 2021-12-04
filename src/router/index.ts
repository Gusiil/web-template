import Index from '../pages/Index'
import Add from '../pages/Add/add'
import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const routes = [{
    path: "/",
    component: Index,
    name: '首页',
    icon: UserOutlined
}, {
    path: '/add',
    component: Add,
    name: '添加页',
    icon: VideoCameraOutlined
}];

export default routes