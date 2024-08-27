import './sidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/dashboard',
        section: ''
    },
    {
        display: 'Petrol',
        icon: <i className='bx bx-droplet'></i>,
        to: '/petrol',
        section: 'started'
    },
    {
        display: 'Stock',
        icon: <i className='bx bx-package'></i>,
        to: '/transaction-history',
        section: 'started'
    },
    {
        display: 'Order',
        icon: <i className='bx bx-receipt'></i>,
        to: '/transaction-history',
        section: 'order'
    }
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    // ดึง username จาก localStorage
    const username = localStorage.getItem('username') || 'Guest';

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar_menu_item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className='sidebar'>
            <div className="sidebar_logo">
                Welcome!! <h3 className='username' data-username={username}>{username}</h3>
            </div>
            <div ref={sidebarRef} className="sidebar_menu">
                <div
                    ref={indicatorRef}
                    className="sidebar_menu_indicator"
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                    }}
                ></div>
                {sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar_menu_item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar_menu_item_icon">
                                {item.icon}
                            </div>
                            <div className="sidebar_menu_item_text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
