import { useEffect, useState } from "react"
import { Button, Table, Tag, Tooltip, Breadcrumb, message } from "antd"
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { useHttp } from "../../utils/http"
import { useAsync } from "../../utils/use-async"
import * as auth from "../../auth-provider"

const { Column } = Table

const AttendanceList = () => {
  const [list, setList] = useState()
  const fetchAttendanceList = useHttp()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const patchStatus = useHttp()

  // 请求时刻: 首次渲染
  useEffect(() => {
    // 请求接口
    var reqapi = auth.getCurrentUserRole() === "0" ? "jt/stu/searchjt" : "jt/teacher/searchjt"
    // 发起请求
    run(fetchAttendanceList(reqapi)).then(result => {
      message.success("成功获取记录")
      setList(result.data.reverse())
    }).catch(error => {
      message.error(error.message)
    })
  }, [])

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>主页</Breadcrumb.Item>
        <Breadcrumb.Item >考勤管理</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={list} loading={isLoading} rowKey="id">
        <Column align="center" title="序号" dataIndex="id" key="id" />
        <Column align="center" title="姓名" dataIndex="name" key="name" />
        <Column align="center" title="请假类型" dataIndex="type" key="type" />
        <Column align="center" title="请假原因" dataIndex="reason" key="reason" />
        <Column align="center" title="开始时间" dataIndex="s_time" key="s_time" />
        <Column align="center" title="结束时间" dataIndex="e_time" key="e_time" />
        <Column align="center" title="申请状态" dataIndex="status" key="status" render={(status) => {
          switch (status) {
            case "待审批":
              return <Tag icon={<SyncOutlined />} color="processing">申请中</Tag>
            case "已准假":
              return <Tag icon={<CheckCircleOutlined />} color="green">已同意</Tag>
            default:
              return <Tag icon={<CloseCircleOutlined />} color="red">已拒绝</Tag>
          }
        }} />
        {
          auth.getCurrentUserRole() === "0" ? null : (
            <Column align="center" title="处理请假信息" key="action" render={(record) => {

              const handleClick = (status, msg) => {
                record.status = status
                // 请求体
                var reqbody = {
                  status: status,
                  jid: record.id
                }
                run(patchStatus("jt/teacher/updatejt", {
                  method: "GET",
                  data: reqbody
                })).then(() => {
                  message.success(msg)
                  const tempList = [...list]
                  tempList.forEach(item => {
                    if (item.id === record.id) {
                      item.status = status
                    }
                  })
                  setList(tempList)
                }).catch(() => {
                  message.error()
                })
              }
              return (
                <span style={{
                  display: "flex",
                  justifyContent: "space-evenly"
                }}>
                  <Tooltip title="同意申请">
                    <Button onClick={() => handleClick("已准假", "已准假")} disabled={record.status !== "待审批"} size="small" type="primary" icon={<CheckOutlined />} />
                  </Tooltip>
                  <Tooltip title="拒绝申请">
                    <Button onClick={() => handleClick("被驳回", "已驳回")} disabled={record.status !== "待审批"} size="small" type="primary" danger icon={<CloseOutlined />} />
                  </Tooltip>
                </span>
              )
            }}>
            </Column>
          )
        }
      </Table>
    </>
  )
}

export default AttendanceList
