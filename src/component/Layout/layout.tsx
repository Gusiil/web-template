import { Layout, LayoutProps, Menu } from 'antd';
import React, { FC, useState } from "react";
import './layout.scss'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import { PageEvents, useEventEmitter, useWatch } from '@/custom-hooks';
import routes from '@/router';
import { useHistory } from 'react-router-dom'
import { BaseEvents } from '@/custom-hooks/eventBus/event';

const { Header, Sider, Content } = Layout;

interface PropsType extends LayoutProps {
    onLayoutChange: Function,
}

const _Layout: FC<PropsType> = (props) => {
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const [select, setSelect] = useState<string[]>(['/']);
    const { useListener } = useEventEmitter<PageEvents>()

    const toggle = () => {
        setCollapsed(collapsed ? false : true);
    };

    useWatch(select, () => {
        history && history.push(select[0]);
        props.onLayoutChange()
    })

    useListener(
        'goPage',
        (todo) => {
            setSelect([todo])
        },
    )

    return <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" > 👎  </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={select} selectedKeys={select}>
                {
                    routes.map(route =>
                        <Menu.Item
                            key={route.path}
                            icon={React.createElement(route.icon)}
                            onClick={() => setSelect([route.path])}>
                            {route.name}
                        </Menu.Item>)
                }
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })}
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {props.children}
            </Content>
        </Layout>
    </Layout>
}

export default _Layout;