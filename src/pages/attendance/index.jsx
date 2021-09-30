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
    // 请求接口
    var reqapi = auth.getCurrentUserRole() === "0" ? "jt/stu/searchjt" : "jt/teacher/searchjt"
    // 发起请求
    run(getAttendanceList(reqapi)).then(result => {

      const list = new Map()
      const currentMonth = (new Date()).getMonth()

      result.data.forEach(item => {
        const startDate = new Date(item.s_time)
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

    // 请假日期
    if (value.range) {
      value.s_time = value.range[0].format("YYYY-MM-DD")
      value.e_time = value.range[1].format("YYYY-MM-DD")
    }
    delete value.range

    // value.userID = auth.getCurrentUserID() // 用于关联用户 id

    // 状态标志 processing, success, reject
    value.status = 'processing'
    run(postAttendance("jt/addjt", { method: "POST", data: value })).then(() => {
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
    const month = value.month()
    const currentMonth = (new Date()).getMonth()
    if (attendanceList.has(date) && month === currentMonth) {
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
          <Button type="primary" onClick={handleCalendarSelect} disabled={auth.getCurrentUserRole() === "1"}>请假</Button>
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
            <Form.Item label="请假类型" name="type">
              <Radio.Group>
                <Radio value={"事假"}>事假</Radio>
                <Radio value={"病假"}>病假</Radio>
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