import React from 'react'
import { useState, useEffect} from 'react';
import dayjs from 'dayjs'
import { get } from '@/utils'
import { Pull, Icon } from 'zarm';
import s from './style.module.less';
import BillItem from '@/components/BillItem';
import PopupType from '@/components/PopupType';
import PopupDate from '@/components/PopupDate';
import PopupAddBill from '@/components/PopupAddBill';
import Popup from "reactjs-popup";

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_sllxcu951u.js');

const REFRESH_STATE = {
    normal: 0,
    pull: 1,
    drop: 2,
    loading: 3,
    success: 4,
    failure: 5,
};

const LOAD_STATE = {
    normal: 0,
    abort: 1,
    loading: 2,
    success: 3,
    failure: 4,
    complete: 5,
};

const Home = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
    const [loading, setLoading] = useState(LOAD_STATE.normal);
    const [currentSelect, setCurrentSelect] = useState({});
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        getBillList();
    }, [page, currentSelect, currentMonth])

    // get list
    const getBillList = async () => {
        const { data } = await get(`/bill/list?date=${currentMonth}&page=${page}&page_size=5&type_id=${currentSelect.id || 'all'}`);

        if (page == 1) {
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }

        setTotalPage(data.totalPage);
        setLoading(LOAD_STATE.success);
        setRefreshing(REFRESH_STATE.success);
        setTotalExpense(data.totalExpense);
        setTotalIncome(data.totalIncome);
    }


    const selectMonth = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        setPage(1);
        setCurrentMonth(item)
    }

    // select type
    const select = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        setPage(1);
        setCurrentSelect(item);
    }

    // request data
    const refreshData = () => {
        setRefreshing(REFRESH_STATE.loading);
        if (page != 1) {
            setPage(1);
        } else {
            getBillList();
        };
    }

    //
    const loadData = () => {
        if (page < totalPage) {
            setLoading(LOAD_STATE.loading);
            setPage(page + 1);
        }
    }
const overlayStyle = { background: 'rgba(21, 16, 16, 0.505)' };
    return <div className={s.home}>
        <div className={s.add}>
            <Popup modal trigger={<MyIcon type="icon-update"/>}  {...{ overlayStyle }} nested>
            {close =><PopupAddBill onReload={refreshData} close={close}/>}
            </Popup>
        </div>
        <div className={s.header}>
            <div className={s.data}>
                <h3 className={s.expense}>Total expense: <b>{totalExpense}$</b></h3>
                <h3 className={s.income}>Total income: <b>{totalIncome}$</b></h3>
            </div>
            <div className={s.typeSection}>
                <div className={s.left}>
                    <Popup  trigger={<span>{currentSelect.name || "All Type"}</span>}>
                        <PopupType onSelect={select} />
                    </Popup>
                </div>
                <div className={s.right}>
                    <Popup  trigger={<span>{currentMonth}</span>} >
                        <PopupDate mode="month" onSelect={selectMonth} />
                    </Popup>
                </div>
            </div>
        </div>

        <div className={s.content}>
            {
                list.length ? <Pull animationDuration={200} stayTime={400} refresh={{ state: refreshing, handler: refreshData, }} load={{ state: loading, distance: 200, handler: loadData }}>
                    {list.map((item, index) => <BillItem data={item} key={index} />)
                    }
                </Pull> : null
            }
        </div>
    </div>
}
export default Home