
import React from "react" ;
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs'
import ReactDOM from "react-dom" ;
import { Icon } from "zarm";
import {Popup} from "reactjs-popup" ;
import Statistics from "../Statistics";

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_0zdmefjus0id.js'); 
const User = () => {
    return <div>User
    <Popup modal trigger={<MyIcon type="icon-update"/>}>
                sss
    </Popup>
  </div>
}
export default User