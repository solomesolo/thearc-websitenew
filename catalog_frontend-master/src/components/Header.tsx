import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import "./header.scss"
import "./reactSelect.scss"
import { NavBarRight } from './NavBarRight';

const MenuItem = React.memo((props: { title: string, address: string, onClick: () => void, isActive: boolean }) => {
    const style = useMemo(() => ({
        color: props.isActive ? '#36BEF9' : '#425A8B',
    }), [props.isActive]);
    
    return (
        <NavLink onClick={props.onClick} target={props.title === "Blog" ? "blank" : ""} to={props.address} style={style}><li>{props.title} </li></NavLink>
    )
});

type Props = {}

const Header = React.memo((props: Props) => {
    const menu = useMemo(() => [
        ["Catalog", "/catalog"],
        ["Blog", "/blog"],
        ["About", "/about"],
    ], []);

    let { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    const handleBurgerOpen = useCallback(() => setOpen(true), []);
    const handleBurgerClose = useCallback(() => setOpen(false), []);
    const handleLogoClick = useCallback(() => {
        window.location.href = '/';
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const menuItems = useMemo(() => 
        menu.map(([title, address]: string[], index) => (
            <MenuItem 
                onClick={handleBurgerClose} 
                key={title} 
                title={title} 
                address={address} 
                isActive={pathname === address} 
            />
        )), [menu, pathname, handleBurgerClose]);

    return (
        <div className='header-box'>
            {open && <div onClick={handleBurgerClose} className={"overlay"}></div>}
            <header className="header sticky-bar" style={{background: '#000', color: '#fff', borderBottom: '1px solid #222', marginBottom: '48px'}}>
                <div className="container">
                    <div className="main-header" style={{minHeight: 84, display: 'flex', alignItems: 'center', padding: '16px 0 0 0'}}>
                        <div className="header-left" style={{display: 'flex', alignItems: 'center'}}>
                            <div className="thearc-logo" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#fff', letterSpacing: '-1px', userSelect: 'none', marginRight: 32, cursor: 'pointer'}} onClick={handleLogoClick}>
                                TheArc
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu main-menu-style" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: '#fff', gap: 32, letterSpacing: '-0.5px'}}>
                                        {menuItems}
                                    </ul>
                                </nav>
                                <div onClick={handleBurgerOpen} className="burger-icon burger-icon-white">
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                </div>
                            </div>
                        </div>
                        <NavBarRight />
                    </div>
                </div>
            </header>
        </div>
    );
});

export default Header;