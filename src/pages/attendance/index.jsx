import { createRef, useEffect, useState } from "react"
import { DatePicker, message, Badge, Button, Calendar, Modal, Form, Radio, Input, Breadcrumb } from "antd"
import { useHttp } from "../../utils/http"
import { useAsync } from "../../utils/use-async"
import * as auth from "../../auth-provider"

const { RangePicker } = DatePicker

const Attendance = () => {
  const [visible, setVisible] = useState(false) // 模态框的显示
  const [attendanceList, setAttendanceList] = useState()
  const form = createRef()

  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const postAttendance = useHttp()
  const getAttendanceList = useHttp()

  useEffect(() => {
    run(getAttendanceList("660/attendance", { data: { userID: auth.getCurrentUserID() } })).then(result => {
      const list = new Map()
      const currentMonth = (new Date()).getMonth()
      result.forEach(item => {
        const start = item.range.split("~")[0]
        const startDate = new Date(start)
        const month = startDate.getMonth()
        const day = startDate.getDate()
        if (month === currentMonth) {
          list.has(day) ? list.get(day).push(item) : list.set(day, [item])
        }

      })
      setAttendanceList(list)
    })
    setAttendanceList(new Map())
  }, [])

  const handleCalendarSelect = (date) => {
    setVisible(true)
  }

  const handleAttendanceInfo = () => {
    const value = form.current.getFieldValue()
    const date = value.range[0].date()
    if (value.range) {
      const start = value.range[0].format("YYYY-MM-DD HH:mm")
      const end = value.range[1].format("YYYY-MM-DD HH:mm")
      value.range = `${start}~${end}`
    }
    if (value.type) {
      switch (value.type) {
        case 1:
          value.type = "事假"
          break
        case 2:
          value.type = "病假"
          break
        default:
          value.type = "其他"
          break
      }
    }
    value.userID = auth.getCurrentUserID() // 用于关联用户 id
    // 状态标志 processing, success, reject
    value.status = 'processing'
    run(postAttendance("660/attendance", { method: "POST", data: value })).then(() => {
      message.success("已提交申请")
      setVisible(false)
      attendanceList.has(date) ? attendanceList.get(date).push(value) : attendanceList.set(date, [value])
      const list = new Map(attendanceList)
      setAttendanceList(list)
    }).catch((error) => {
      message.error(error.message)
    })
  }

  const dateCellRender = (value) => {
    if (!attendanceList)
      return
    const date = value.date()
    if (attendanceList.has(date)) {
      const list = attendanceList.get(date)
      return <ul style={{ listStyle: "none" }}>
        {
          list.map((item, key) => {
            return <li key={key}>
              <Badge status={item.status} text={item.reason} />
            </li>
          })
        }
      </ul>
    }
  }
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>主页</Breadcrumb.Item>
        <Breadcrumb.Item >请假申请</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <div>
          <Button type="primary" onClick={handleCalendarSelect}>请假</Button>
        </div>
        <Calendar dateCellRender={dateCellRender} />
        <Modal title="填写请假信息" width={800} visible={visible} footer={[
          <Button key="conform" type="primary" htmlType="submit" onClick={handleAttendanceInfo}>确定</Button>,
          <Button key="cancel" onClick={() => {
            setVisible(false); form.current.setFieldsValue({
              name: "", range: "", type: -1, reason: ""
            })
          }}>取消</Button>
        ]}>
          <Form onFinish={handleAttendanceInfo} ref={form}>
            <Form.Item label="姓名" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="请假类型" name="type">
              <Radio.Group>
                <Radio value={1}>事假</Radio>
                <Radio value={2}>病假</Radio>
                <Radio value={3}>其他</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="请假时间" name="range">
              <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item label="请假事由" name="reason">
              <Input.TextArea rows={8} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default Attendance