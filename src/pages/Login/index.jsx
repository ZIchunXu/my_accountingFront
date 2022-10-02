import React, { useState } from 'react';
import { Cell, Input, Button, Toast, Tabs, Panel } from 'zarm';
import s from './style.module.less';
import { post } from '@/utils';

const Login = () => {
    const [type, setType] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return <div className={s.auth}>
        <div className={s.head} />
        <div>
            <Tabs value={type} onChange={setType}>
                <Panel title="Login" ></Panel>
                <Panel title="Register"></Panel>
            </Tabs>
        </div>
        <div className={s.form}>
            <Cell >
                <Input
                    clearable
                    type="text"
                    placeholder="Please enter username"
                    onChange={(value) => setUsername(value)}
                />
            </Cell>
            <Cell >
                <Input
                    clearable
                    type="password"
                    placeholder="Please enter password"
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
        </div>
        <div className={s.operation}>
            <Button onClick={() => onSubmit(username, password, type)} block theme="primary">{type == 0 ? 'Login' : 'Register'}</Button>
        </div>
    </div>
}

const onSubmit = async (username, password, type) => {
    if (!username) {
        Toast.show('Please enter username');
        return;
    }
    if (!password) {
        Toast.show('Please enter password')
        return;
    }
    try {
        if (type == 0) {
            const { data } = await post('/user/login', {
                username,
                password
            });
            localStorage.setItem('token', data.token);
            window.location.href = '/';
            Toast.show('Login Sucessful');
        } else {
            const { data } = await post('/user/register', {
                username,
                password
            });
            Toast.show('Register Sucessful');
        }
    } catch (error) {
        Toast.show('System Error');
    }
};
export default Login