import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DatePickerView } from 'zarm'
import dayjs from 'dayjs'

const PopupDate = ({ onSelect, mode = 'date' }) => {
  const [now, setNow] = useState(new Date())
  const choseMonth = (item) => {
    setNow(item)
    if (mode == 'month') {
      onSelect(dayjs(item).format('YYYY-MM'))
    } else if (mode == 'date') {
      onSelect(dayjs(item).format('YYYY-MM-DD'))
    }
  }


  return (
    < div className="modal" >
      <div className="content">
        <DatePickerView
          mode={mode}
          value={now}
          min="2018-1-13"
          onChange={choseMonth}
        />
      </div>
    </ div >
  );
}

PopupDate.propTypes = {
  mode: PropTypes.string,
  onSelect: PropTypes.func,
}

export default PopupDate;
