import React, { FC, useState } from "react";
import { createContext } from 'react'
import { EventEmitter } from './event'

type PropsType = {}

export const EventEmitterRCContext = createContext<EventEmitter<any>>(
    null as any,
)

const EventEmitterRC: React.FC<PropsType> = (props) => {
    return (
        <EventEmitterRCContext.Provider value={new EventEmitter()}>
            {props.children}
        </EventEmitterRCContext.Provider>
    )
}

export default EventEmitterRC