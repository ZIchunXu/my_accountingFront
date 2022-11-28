import React, { useState } from 'react';
import { TabBar } from 'zarm';
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom';
import s from './style.module.less';
import {Icon} from 'zarm';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_xhshfhh89i.js'); 

const NavBar = ({ showNav }) => {
    const location = useLocation()
    const { pathname } = location
    const [activeKey, setActiveKey] = useState('pathname');
    const navigate = useNavigate()

    const changeTab = (path) => {
        setActiveKey(path)
        navigate(path)
    }

    return (
        <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={changeTab}>
            <TabBar.Item
                itemKey="/"
                title="Bills"
                icon={<MyIcon type="icon-notes" />}
            />
            <TabBar.Item
                itemKey="/statistics"
                title="Statistics"
                icon={<MyIcon type="icon-stats" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="User"
                icon={<MyIcon type="icon-user" />}
            />
        </TabBar>
    );
};

NavBar.propTypes = {
    showNav: PropTypes.bool
}

export default NavBar;