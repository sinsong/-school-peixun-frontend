import { useEffect, useState } from "react"
import { Button, Table, Tag, Tooltip, Breadcrumb, message } from "antd"
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { useHttp } from "../../utils/http"
import { useAsync } from "../../utils/use-async"

const { Column } = Table

const AttendanceList = () => {
  const [ list, setList ] = useState()
  const fetchAttendanceList = useHttp()
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})
  const patchStatus = useHttp()
  
  // 请求时刻: 首次渲染
  useEffect(()=>{
    run(fetchAttendanceList("660/attendance")).then(result=>{
      message.success("成功获取记录")
      setList([...result])
    }).catch(error=>{
      message.error(error.message)
    })
  }, [])

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>主页</Breadcrumb.Item>
        <Breadcrumb.Item >考勤管理</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={list} loading={isLoading}>
        <Column align="center" title="序号" dataIndex="id" key="id" />
        <Column align="center" title="姓名" dataIndex="name" key="name" />
        <Column align="center" title="请假类型" dataIndex="type" key="type" />
        <Column align="center" title="请假原因" dataIndex="reason" key="reason" />
        <Column align="center" title="请假时间" dataIndex="range" key="range" />
        <Column align="center" title="申请状态" dataIndex="status" key="status" render={(status) => {
          switch (status) {
            case "processing":
              return <Tag icon={<SyncOutlined />} color={status}>申请中</Tag>
            case "success":
              return <Tag icon={<CheckCircleOutlined />} color={status}>已同意</Tag>
            default:
              return <Tag icon={<CloseCircleOutlined />} color={status}>已拒绝</Tag>
          }
        }} />
        <Column align="center" title="处理请假信息" key="action" render={(record) => {

          const handleClick = (status, msg) => {
            record.status = status
            run(patchStatus(`660/attendance/${record.id}`, {
              method: "PATCH",
              data: record
            })).then(() => {
              message.success(msg)
              const tempList = [...list]
              tempList.forEach(item => {
                if (item.id === record.id)
                {
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
                <Button onClick={()=>handleClick("success", "已同意")} disabled={(record)=>record.status !== "processing"} size="small" type="primary" icon={<CheckOutlined />} />
              </Tooltip>
              <Tooltip title="拒绝申请">
                <Button onClick={()=>handleClick("error", "已拒绝")} disabled={(record)=>record.status !== "processing"} size="small" type="primary" danger icon={<CloseOutlined />} />
              </Tooltip>
            </span>
          )
        }}></Column>
      </Table>
    </>
  )
}

export default AttendanceList
