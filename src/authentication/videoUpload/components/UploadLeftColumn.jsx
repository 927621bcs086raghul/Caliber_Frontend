import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { Button, Progress, Typography, Upload } from 'antd'

const { Title, Text } = Typography
const { Dragger } = Upload

function UploadLeftColumn({ fileList, uploadInfo, onUploadChange, onPreviewClick, onClearUpload }) {
  return (
    <div className="upload-left-column">
      <Dragger
        name="file"
        multiple={false}
        accept="video/mp4,video/quicktime,video/webm,video/*"
        beforeUpload={() => false}
        showUploadList={false}
        fileList={fileList}
        onChange={onUploadChange}
        className="upload-dragger"
      >
        <div className="upload-dragger-inner">
          <div className="upload-dragger-icon-wrapper">
            <CloudUploadOutlined className="upload-dragger-icon" />
          </div>
          <Title level={4} className="upload-dragger-title">
            Click or drag video
          </Title>
          <Text className="upload-dragger-text">
            MP4, MOV, or WEBM. Single upload only. Do not upload sensitive company data.
          </Text>
        </div>
      </Dragger>
      {uploadInfo && (
        <div className="upload-status-card">
          <div className="upload-status-header">
            <div
              className="upload-status-thumb"
              onClick={onPreviewClick}
              style={{ cursor: 'pointer' }}
              title="Click to preview video"
            />
            <div className="upload-status-info">
              <Text className="upload-status-name" ellipsis>
                {uploadInfo.name}
              </Text>
              <Text className="upload-status-meta">
                {uploadInfo.sizeMB.toFixed(1)} MB  {uploadInfo.percent}% uploaded
              </Text>
            </div>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              className="upload-status-close"
              onClick={onClearUpload}
            />
          </div>
          <div className="upload-status-progress">
            <Progress percent={uploadInfo.percent} showInfo={false} className="upload-progress" />
            <div className="upload-status-footer">
              <Text className="upload-status-label">Ready to upload</Text>
              <Text className="upload-status-time">
                {uploadInfo.percent}%
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadLeftColumn
