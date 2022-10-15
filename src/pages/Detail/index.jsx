import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import s from './style.module.less';
import { Icon, Keyboard, Input, Modal, Toast } from 'zarm';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import cx from 'classnames';
import dayjs from 'dayjs'
import PopupAddBill from '@/components/PopupAddBill';
import Popup from "reactjs-popup";
import { get, post, typeMap } from '../../utils';
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_xhshfhh89i.js');

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = queryString.parse(location.search);
    const [detail, setDetail] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const { data } = await get(`/bill/detail?id=${id}`);
        setDetail(data);
    }

    const deleteDetail = () => {
        Modal.confirm({
            title: 'Delete',
            content: 'Are you sure you want to delete bill?',
            onOk: async () => {
                const { data } = await post(`/bill/delete?id=${id}`);
                Toast.show('Delete Sucessful');
                navigate(-1);
            }
        })
    }

    const editDetail = () => {

    }

    return <div className={s.detail}>
        <Header title='Detail' />
        <div className={s.card}>
            <div className={s.type}>
                <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
                    <MyIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
                </span>
                <span className={s.font}><b>{detail.type_name || ''}</b></span>
                <span className={s.amount}>
                    <br/>
                    {
                        detail.pay_type == 1
                            ? <div className={cx(s.expense)}>-{detail.amount}</div>
                            : <div className={cx(s.income)}>+{detail.amount}</div>
                    }
                </span>
            </div>
            <br/><br/>
            <div className={s.info}>
                <div className={s.time}>
                    <span>Date: </span>
                    <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
                </div>
                <div className={s.remark}>
                    <span>Remark: </span>
                    <span>{detail.remark ? detail.remark : "N/A"}</span>
                </div>
            </div>
            <div className={s.operation}>
                <span onClick={deleteDetail}>Delete</span>

                <Popup modal trigger={<span>Edit</span>} nested>
                    {close => <PopupAddBill onReload={getDetail} detail={detail} close={close} />}
                </Popup>
            </div>
        </div>
    </div >
}

export default Detail