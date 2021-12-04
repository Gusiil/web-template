import { useEffect, useRef } from 'react'
import { BaseEvents } from './eventBus/event';
import { useEventEmitter } from './eventBus/hooks'

// 框架page Events合集
export interface PageEvent {}
export interface PageEvents extends BaseEvents {
    goPage: [string] // 跳转event
}

type Callback<T> = (prev: T | undefined) => void;

function useWatch<T>(dep: T, callback: Callback<T>) {
    const prev = useRef<T>();

    useEffect(() => {
        callback(prev.current);
        prev.current = dep;
    }, [dep]);

    return () => {
        // stop.current = true;
    };
}

export { useWatch, useEventEmitter }