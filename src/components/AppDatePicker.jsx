import { useState } from 'react'
import { DatePicker } from 'antd'

export default function AppDatePicker({ value, onChange, placeholder = 'Select Date', disabledDate }) {
  const [open, setOpen] = useState(false)

  return (
    <DatePicker
      value={value ?? null}
      open={open}
      onOpenChange={setOpen}
      onChange={(date) => { onChange(date); setOpen(false) }}
      placeholder={placeholder}
      format="DD MMM YYYY"
      placement="bottomLeft"
      getPopupContainer={(trigger) => trigger.parentNode}
      disabledDate={disabledDate}
      style={{
        width: '100%',
        height: 44,
        borderRadius: 10,
        border: '1px solid #EBEBEB',
        background: '#FFFFFF',
      }}
    />
  )
}
