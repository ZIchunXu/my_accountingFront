
import React from "react";
import { useState, useEffect} from 'react';
import { Button } from "zarm";
import { get } from '@/utils'
import s from './style.module.less';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const userInfo = () => {
    navigate(`/user/edit`)
  };

  const resetPasswordPage = (item) => {
    navigate(`/user/password`)
  };

  const getUserInfo = async () => {
    const { data } = await get('/user/getuser');
    setUser(data);
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return <div className={s.user}>
    <Button theme='primary' onClick={() => logout()}>Logout</Button>
    <div className={s.head}>
      <img className={s.avatar} style={{ width: 100, height: 100, borderRadius: 8 }} src={user.avatar || '--'} alt="" />
      <span style={{ fontSize: 20}}><b>Name:{user.username || '--'}</b></span>
      <span style={{  fontSize: 13}}>About: {user.about || '--'}</span>
    </div>
    <div className={s.content}>
        <div className={s.list} onClick={() => userInfo()}>Change Information</div>
        <div className={s.list} onClick={() => resetPasswordPage()} >Reset Password</div>
    </div>
  </div>
}
export default User