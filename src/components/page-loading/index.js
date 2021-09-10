import { Spin } from 'antd'
import "./index.less"

const PageLoading = () => {
  return (
    <div className="page_loading_container">
      <div className="spinner_box">
        <div className="spinner_border_bottom">
          <div className="spinner_core"></div>
        </div>
        <div className="spinner_border_top">
          <div className="spinner_core"></div>
        </div>
      </div>
    </div>
  )
}

export default PageLoading
