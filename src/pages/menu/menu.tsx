import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import css from "./menu.module.scss"
import {menuItem} from "../routes";

const Menu = () => {
    const {pathname} = useLocation()
    return (
        <>
            <ul className={css.menuItemContainer}>
                {
                    menuItem.map(({path, name}) => {
                        return <li key={path} className={path === pathname ? css.active : undefined}>
                            <Link to={path} key={name}>{name}  </Link>

                        </li>
                    })
                }
            </ul>
        </>
    );
};

export default Menu;