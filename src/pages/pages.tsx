import React, {Suspense} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {menuItem} from './routes';
import Loading from "../components/loading/loading";
import { DEFAULT_PAGE_ROUTE } from '../ui/url';



const Pages = () => {
    const {pathname} = useLocation();

    return (
        <Suspense fallback={<div><Loading/></div>}>
            <Routes>
                {
                    menuItem.map(({path, element: Element}) => {
                        return <Route key={path}
                                      path={path}
                                      element={<Element/>}
                        />
                    })
                }
            </Routes>
            {pathname === '/' ?
                <Navigate to={DEFAULT_PAGE_ROUTE} replace={true}/>
                : null
            }
        </Suspense>
    );
};

export default Pages;