import React, { useEffect, useState, useContext, useRef } from "react";
import { Select, Radio, Button, Divider, message, notification, Modal } from "antd";
import logo from '@/logo.svg'
import "./index.scss";
import { PageEvents, useEventEmitter, useWatch } from "@/custom-hooks/index";
import fetch from '@/api/request'
import { context } from '@/reducer'
import { useHistory } from 'react-router-dom'

export default function Index() {
    // 获取全局通信emit事件
    const { emit } = useEventEmitter<PageEvents>()

    // 获取 store
    const { mock_store_data } = useContext(context);
    const goPage = () => {
        emit('goPage', '/add')
    }

    return (
        <div className="index-scss">
            <span>{mock_store_data}</span>
            <img src={logo} alt="" />
            <div className="navigation">
                <a onClick={goPage} style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    textDecoration: 'underline'
                }}>去添加页</a>
        </div>
        </div >
    );
}
