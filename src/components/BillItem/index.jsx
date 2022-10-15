import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import s from './style.module.less';
import { Cell } from 'zarm';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'zarm';
import { typeMap } from '@/utils';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_xhshfhh89i.js');


const BillItem = ({ data }) => {
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const expenseData = data.bills.filter(i => i.pay_type == 1).reduce((curr, item) => {
            curr += Number(item.amount);
            return curr;
        }, 0);
        setExpense(expenseData);

        const incomeData = data.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {
            curr += Number(item.amount);
            return curr;
        }, 0);
        setIncome(incomeData);
    }), [data.bills];

    const detail = (item) => {
        navigate(`/detail?id=${item.id}`)
    };
    return <div className={s.item}>
        <div className={s.headerDate}>
            <div className={s.date}><b>{data.date}</b></div>
            <div className={s.amount}>
                <div className={s.out}>Expense: {expense}&nbsp;&nbsp;&nbsp;</div>
                <div className={s.in}>Income: {income}</div>
            </div>
        </div>
        {
            data && data.bills.map(item => <Cell
                className={s.bill}
                key={item.id}
                onClick={() => detail(item)}
                title={
                    <>
                        <MyIcon
                            className={s.itemIcon}
                            type={typeMap[item.type_id] ? typeMap[item.type_id].icon : 'icon-qita'}
                        />
                        <span>{item.type_name}</span>
                    </>
                }
                description={<span style={{ color: item.pay_type == 2 ? '#39be77' : 'red' }}>{`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}</span>}
                help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
            >
            </Cell>)
        }
    </div>
};

BillItem.propTypes = {
    data: PropTypes.object
};

export default BillItem;