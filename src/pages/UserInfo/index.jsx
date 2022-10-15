
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Icon, FilePicker, Input, Toast, Button } from "zarm";
import Header from '@/components/Header';
import { get, post } from '@/utils';
import axios from 'axios';
import s from './style.module.less';
import { imgUrlTrans } from "../../utils";
import { baseUrl } from 'config';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_0zdmefjus0id.js');
const UserInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get('/user/getuser');
    setUser(data);
    setAvatar(imgUrlTrans(data.avatar))
    setAbout(data.about);
  }

  const handleSelect = (file) => {
    console.log('file, file', file.file);
    if (file && file.file.size > 400 * 1024) {
      Toast.show("Your file is too powerful! Max file size is 400KB")
      return;
    }
    let formData = new FormData();
    formData.append('file', file.file);
    axios({
      method: 'post',
      url: `/upload`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': token
      }
    }).then(res => {
      setAvatar(imgUrlTrans(res.data))
      Toast.show("Uploded Successfull")
    })
  }

  const uploadInformation = async () => {
    const params = {
      about: about,
      avatar: avatar
    }
    const result1 = await post('/user/updateinfo', params);
    navigate(-1);
  }
  return <div className={s.user}>
    <Header title='User information' />
    <div className={s.form}>
      <div className={s.left}>
        <img className={s.avatar} style={{}} src={user.avatar} alt="" />
        <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
          <div className={s.upload} theme='primary' size='xs'>Click to upload</div>
        </FilePicker>
      </div>
      <div className={s.right}>
        <div className={s.name}>User: {user.username || '--'}</div>
        <div className={s.about}><div>About:</div>
          <Input
            clearable
            type="text"
            value={about}
            placeholder="Please enter your name"
            onChange={(value) => setAbout(value)}
          />
        </div>
      </div>
    </div>
    <div className={s.button}>
      <Button theme="primary" onClick={() => uploadInformation()}>Save</Button>
    </div>
  </div>
}
export default UserInfo