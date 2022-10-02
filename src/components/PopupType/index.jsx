import React, {useState, useEffect} from 'react';
import s from './style.module.less';
import PropTypes from 'prop-types'
import 'reactjs-popup/dist/index.css';
import { get } from '@/utils';
import cx from 'classnames';

const PopupType = ({onSelect}) => {
    const [active, setActive] = useState('all'); // active
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);

    useEffect(() => {
        getTypeList();
    }, [])

    // get type list
    const getTypeList = async () => {
        const { data: {list} } = await get(`/type/list`);
        setExpense(list.filter(i => i.type == 1));
        setIncome(list.filter(i => i.type ==2));
    }

    const choseType = (item) => {
        setActive(item.id);
        onSelect(item);
    };

    return <div className={s.popupType}>
        <div className={s.header}>
            Please choose a type
        </div>
        <div className={s.content}>
            <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>All Type</div>
            <div className={s.title}>Expense</div>
            <div className={s.expenseWrap}>
            {
                expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
            }
            </div>
            <div className={s.title}>Income</div>
            <div className={s.incomeWrap}>
            {
                income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
            }
            </div>
        </div>
    </div>
    
}

PopupType.propTypes = {
    onSelect: PropTypes.func
}

export default PopupType;