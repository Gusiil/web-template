import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.scss'
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import routes from '../src/router'
import EventEmitterRC from './custom-hooks/eventBus/context'
import {
    reducer,
    initialState,
    context
} from './reducer';
import Layout from './component/Layout/layout';
import { CSSTransition } from 'react-transition-group'

function App(props: any) {
    const [store, dispatch] = useReducer(reducer, initialState);
    const [match, setMatch] = useState(false);

    useEffect(() => {
        // 全局 reducer
        dispatch({
            type: 'mock_store_data',
            value: 'something just like this',
        });
    }, []);

    // set CSSTransition animation translation
    const onLayoutChange = () => {
        setMatch(false)
        setTimeout(() => setMatch(true), 0)
    }

    return (
        <context.Provider value={store}>
            <Router>
                <EventEmitterRC>
                    <Layout onLayoutChange={onLayoutChange}>
                        <Switch>
                            {
                                routes.map(route =>
                                    <Route exact key={route.path} path={route.path} >

                                        {() => (
                                            <CSSTransition
                                                in={match}
                                                timeout={300}
                                                classNames="page"
                                                unmountOnExit
                                            >
                                                <div className="page">
                                                    <route.component />
                                                </div>
                                            </CSSTransition>
                                        )}
                                    </Route>)
                            }
                        </Switch>
                    </Layout>
                </EventEmitterRC>
            </Router>

        </context.Provider>
    )
}
export default App
