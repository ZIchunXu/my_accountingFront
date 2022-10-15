
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Icon, Input, Toast, Button } from "zarm";
import Header from '@/components/Header';
import { get, post } from '@/utils'
import s from './style.module.less';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_0zdmefjus0id.js');
const UserPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');
  const [new_password, setnewPassword] = useState('');
  const [confrimpassword, setConfirmPassword] = useState('');
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get('/user/getuser');
    setUser(data);
  }

  const uploadPassword = async () => {
    if (user.password !== password) {
        Toast.show("Old Password Incorrect");
        return;
    }

    if (new_password !== confrimpassword) {
        Toast.show("Please Confirm Password");
        return;
    }
    const params = {
        username: user.username,
        password: new_password,
    }
    const result = await post('/user/editpassword', params);
    Toast.show("Password Changed"); 
    navigate(-1);
  }

  return <div className={s.pass}>
    <Header title='Reset Password' />
    <div className={s.form}>
      <div>Old Password</div>
      <Input
        clearable
        type="text"
        placeholder="Please enter old password"
        onChange={(value) => setPassword(value)}
      />
      <div>New Password</div>
      <Input
        clearable
        type="text"
        value={new_password}
        placeholder="Please enter new password"
        onChange={(value) => setnewPassword(value)}
      />
      <Input
        clearable
        type="text"
        value={confrimpassword}
        placeholder="Please confirm new password"
        onChange={(value) => setConfirmPassword(value)}
      />
    </div>
    <div className={s.button}>
    <Button theme="primary" onClick={() => uploadPassword()}>Save</Button>
    </div>
  </div>
}
export default UserPassword