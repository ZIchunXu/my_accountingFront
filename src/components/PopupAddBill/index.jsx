import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PopupDate from '../PopupDate';
import { Icon, Keyboard, Input, Toast } from 'zarm';
import dayjs from 'dayjs'
import s from './style.module.less';
import cx from 'classnames';
import Popup from 'reactjs-popup';
import { get, typeMap, post } from '@/utils';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_xhshfhh89i.js');

const PopupAddBill = ({ detail = {}, close, onReload }) => {
    const id = detail && detail.id;
    const [currentType, setCurrentType] = useState({});
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);
    const [payType, setPayType] = useState('expense');
    const [date, setDate] = useState(dayjs());
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [showRemark, setShowRemark] = useState(false);
    const changeType = (type) => {
        setPayType(type);
    };
    useEffect(() => {
        if (detail.id) {
            setPayType(detail.pay_type == 1 ? 'expense' : 'income');
            setCurrentType({
                id: detail.type_id,
                name: detail.type_name
            })
            setRemark(detail.remark);
            setAmount(detail.amount);
            setDate(dayjs(Number(detail.date)).$d)
        }
    }, [detail])


    useEffect(() => {
        getTypeList();
    }, [])

    // get type list
    const getTypeList = async () => {
        const { data: { list } } = await get(`/type/list`);
        const expense_data = list.filter(i => i.type == 1);
        const income_data = list.filter(i => i.type == 2);
        setExpense(expense_data);
        setIncome(income_data);
        if (!id) {
            setCurrentType(expense_data[0]);
        };
    }

    const selectDate = (val) => {
        setDate(val);
    }

    const addBill = async () => {
        if (!amount) {
            Toast.show('Please enter amount');
            return;
        }

        const params = {
            pay_type: payType == 'expense' ? 1 : 2,
            amount: Number(amount).toFixed(2),
            date: dayjs(date).unix() * 1000,
            type_id: currentType.id,
            type_name: currentType.name,
            remark: remark || ''
        }
        if (id) {
            params.id = id;
            const result = await post('/bill/update', params);
            Toast.show("Bill Uploaded");
        } else {
            const result = await post('/bill/add', params);
            setAmount('');
            setDate(new Date());
            setRemark('');
            Toast.show("Add bill successful");
        }
        close();
        if (onReload) {
            onReload();
        }
    }

    const handleMoney = (value) => {
        value = String(value);
        if (value == 'delete') {
            let _amount = amount.slice(0, amount.length - 1)
            setAmount(_amount);
            return
        }
        if (value == 'ok') {
            addBill();
            return;
        }
        if (value == '.' && amount.includes('.')) {
            return;
        }
        if (value != '.' && amount.includes('.') && amount.split('.')[1].length >= 2) {
            return;
        }
        setAmount(amount + value);
    }
    return (
        < div className="modal" >
            <div className={s.addWrap}>
                <div className={s.type}>
                    <div className={s.left}>
                        <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>Expense</span>
                        <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>Income</span>
                    </div>
                    <Popup trigger={<span className={s.time}>{dayjs(date).format('MM-DD')}</span>} position="bottom center">
                        <PopupDate onSelect={selectDate} />
                    </Popup>
                </div>
                <div className={s.money}>
                    <span className={s.sufix}>$</span>
                    <span className={cx(s.amount, s.animation)}>{amount}</span>
                </div>
                <div className={s.typeWrap}>
                    <div className={s.typecontent}>
                        {
                            (payType == 'expense' ? expense : income).map(item => <div onClick={() => setCurrentType(item)} key={item.id} className={s.typeItem}>
                                <span className={cx({ [s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income', [s.active]: currentType.id == item.id })}>
                                    <MyIcon className={s.iconfont} type={typeMap[item.id] ? typeMap[item.id].icon : 'icon-qita'} />
                                </span>
                                <span className={s.name}>{item.name}</span>
                            </div>)
                        }</div>
                </div>
                <div className={s.remark}>
                    {
                        showRemark ? <Input
                            autoHeight
                            showLength
                            maxLength={50}
                            type="text" rows={3}
                            value={remark}
                            placeholder="Please enter detail information"
                            onChange={(val) => setRemark(val)}
                            onBlur={() => setShowRemark(false)}
                        /> : <span onClick={() => setShowRemark(true)}>{remark || 'add detail'}</span>
                    }
                </div>
                <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
            </div>
        </ div >
    );
}

PopupAddBill.propTypes = {
    mode: PropTypes.string,
    onSelect: PropTypes.func,
}

export default PopupAddBill;
