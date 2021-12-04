import React, { useEffect, useState, useContext } from "react";
import './add.scss'
import { Form, Input, Button, Radio } from 'antd';
import { BaseEvents } from "@/custom-hooks/eventBus/event";
import { PageEvents, useEventEmitter } from "@/custom-hooks";
import { context } from "@/reducer";

export default function Add() {
    // 获取全局通信emit事件
    const { emit } = useEventEmitter<PageEvents>()

    // 获取 store
    const { mock_store_data } = useContext(context);
    const goPage = () => {
        emit('goPage', '/')
    }

    return (
        <div className="add">
            <a onClick={goPage}> 回首页 </a>
            <span>{mock_store_data}</span>
        </div>
    )
}