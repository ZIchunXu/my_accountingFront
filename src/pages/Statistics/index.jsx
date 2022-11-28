import React from 'react'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { get, typeMap } from '@/utils'
import { Progress, Icon } from 'zarm';
import s from './style.module.less';
import PopupDate from '@/components/PopupDate';
import Popup from "reactjs-popup";
import cx from 'classnames';
import PieChart from '@/components/PieChart';

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_ocqu5v5w59g.js');

const Statistics = () => {
  const [pieType, setPieType] = useState('expense');
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalType, setType] = useState('expense');
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    getBillList();
  }, [currentMonth])

  const selectMonth = (item) => {
    setCurrentMonth(item);
  }

  const changePieType = (type) => {
    setPieType(type);
    setChartData(type == 'expense' ? expenseData : incomeData);
  }
  const getBillList = async () => {
    const { data } = await get(`/bill/data?date=${currentMonth}`);
    console.log(data);
    setTotalExpense(data.totalExpense);
    setTotalIncome(data.totalIncome);
    let expense_data = data.total_data.filter(item => item.pay_type == 1).sort((a, b) => b.number - a.number);
    let income_data = data.total_data.filter(item => item.pay_type == 2).sort((a, b) => b.number - a.number);
    expense_data = expense_data.map(item => {
      return {
        ...item,
        payType: item.pay_type.toString(),
        percent: Number(Number((item.number / Number(data.totalExpense)) * 100).toFixed(2))
      }
    })

    income_data = income_data.map(item => {
      return {
        ...item,
        payType: item.pay_type.toString(),
        percent: Number(Number((item.number / Number(data.totalIncome)) * 100).toFixed(2))
      }
    })

    setExpenseData(expense_data);
    setIncomeData(income_data);
    setChartData(pieType == 'expense' ? expense_data : income_data);
  }

  return (<div className={s.page}>
    <div className={s.header}>
      <span className={s.date}>
        <Popup trigger={<span>{currentMonth} </span>}>
          <PopupDate mode="month" onSelect={selectMonth} />
        </Popup>
        <MyIcon type="icon--rili" />
      </span>
      <div className={s.amount}>
        <span className={s.expense}>Total Expense:</span>
        <span>{totalExpense}$</span>
        <span className={s.income}>Total Income:{totalIncome}$</span>
      </div>

    </div>

    <div className={s.title}>
      <div>Financial Statistics</div>
      <div className={s.tab}>
        <span className={cx({ [s.active]: totalType == 'expense' })} onClick={() => {setType('expense'), changePieType('expense')}}>Expense</span>
        <span className={cx({ [s.active]: totalType == 'income' })} onClick={() => {setType('income'), changePieType('income')}}>Income</span>
      </div>
    </div>

    <div className={s.content}>

      <div className={s.pieChart}>
        <PieChart chartData={chartData} totalExpense={totalExpense} totalIncome={totalIncome} />
      </div>
      {

        (totalType == 'expense' ? expenseData : incomeData).map(item => <div className={s.item} key={item.type_id}>
          <div className={s.left}>
            <div className={s.typeName}>
              <MyIcon type={typeMap[item.type_id] ? typeMap[item.type_id].icon : 'icon-qita'} />
              <div>{item.type_name}</div>
            </div>
            <div className={s.typeAmount}>{item.number}</div>
          </div>
          <div className={s.right}>
            <Progress
              shape="line"
              percent={Number(item.number / (totalType == 'expense' ? totalExpense : totalIncome) * 100).toFixed(2)}
              theme='primary'
            />
          </div>
        </div>)
      }
    </div>
  </div>
  )
};

export default Statistics