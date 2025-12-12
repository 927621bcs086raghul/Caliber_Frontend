import {
    BellOutlined,
    CloseOutlined,
    CloudUploadOutlined,
    EditOutlined,
    SearchOutlined,
    VideoCameraOutlined
} from '@ant-design/icons'
import { Avatar, Button, Form, Input, Layout, Progress, Typography, Upload } from 'antd'
import { useState } from 'react'
import './VideoUpload.css'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Dragger } = Upload

function VideoUpload() {
  const [uploadInfo, setUploadInfo] = useState(null)
  const [fileList, setFileList] = useState([])

  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList]

    // Keep only the most recent file
    if (newFileList.length > 1) {
      newFileList = newFileList.slice(-1)
    }

    setFileList(newFileList)

    if (newFileList.length === 0) {
      setUploadInfo(null)
      return
    }

    const current = newFileList[0]
    const rawFile = current.originFileObj || current
    const sizeMB = rawFile.size ? rawFile.size / (1024 * 1024) : 0

    setUploadInfo({
      name: rawFile.name,
      sizeMB,
      percent: 100,
    })
  }

  return (
    <Layout className="upload-page-root">
      <Header className="upload-header">
        <div className="upload-header-inner">
          <div className="upload-header-left">
            <div className="upload-logo-group">
              <div className="upload-logo-icon">
                <VideoCameraOutlined />
              </div>
              <Title level={4} className="upload-logo-title">
                StreamFlow
              </Title>
            </div>

            <div className="upload-search-wrapper">
              <Input
                className="upload-search-input"
                prefix={<SearchOutlined />}
                placeholder="Search videos..."
              />
            </div>
          </div>

          <div className="upload-header-right">
            <div className="upload-header-links">
              <Button type="text" className="upload-header-link">
                Dashboard
              </Button>
            </div>

            <Button
              type="text"
              icon={<BellOutlined />}
              className="upload-icon-button"
            />
            <Avatar
              size={36}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB26uZbBxLN8PwmUI4VTsmeX6AE-GJognI0MGKjDHI84QDGQFiztsKURINyT8uqybQ-jAwZlJvCiUwXRWku1Jh0-mnvr4HyAEVnXX0bLQA31hXXZNG8nZ6PrGmPCtqs56TuHnoBGT7k9sijxUxfdAlOZBi3pbS71JWbi9MtGvuLo1TsmVxFlds2VLQJlMOX6waxB83JaOe8mwjT0DrtYnoQZxXyatnNyhftYShxHOV0ic6-V0FHA2tXlacSC1cbQywddfpOaLboc5s"
            />
          </div>
        </div>
      </Header>

      <Content className="upload-main">
        <div className="upload-main-inner">
          <div className="upload-page-heading">
            <div className="upload-page-heading-left">
              <Title level={2} className="upload-page-title">
                Upload Video
              </Title>
              <Text className="upload-page-subtitle">
                Manage your upload details and visibility settings.
              </Text>
            </div>
          </div>

          <div className="upload-grid">
            {/* Left column: upload + status */}
            <div className="upload-left-column">
              <Dragger
                name="file"
                multiple={false}
                accept="video/mp4,video/quicktime,video/webm,video/*"
                beforeUpload={() => false}
                showUploadList={false}
                fileList={fileList}
                onChange={handleUploadChange}
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
                    <div className="upload-status-thumb" />
                    <div className="upload-status-info">
                      <Text className="upload-status-name" ellipsis>
                        {uploadInfo.name}
                      </Text>
                      <Text className="upload-status-meta">
                        {uploadInfo.sizeMB.toFixed(1)} MB • {uploadInfo.percent}% uploaded
                      </Text>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="upload-status-close"
                      onClick={() => {
                        setUploadInfo(null)
                        setFileList([])
                      }}
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

            {/* Right column: form */}
            <div className="upload-right-column">
              <Form layout="vertical" className="upload-form">
                <div className="upload-section">
                  <div className="upload-section-header">
                    <Title level={4} className="upload-section-title">
                      <EditOutlined className="upload-section-icon" />
                      <span>Video Details</span>
                    </Title>
                  </div>

                  <Form.Item
                    label="Title (required)"
                    name="title"
                    initialValue="Nature Documentary 2024"
                    className="upload-form-item"
                  >
                    <Input placeholder="Give your video a catchy title" maxLength={100} />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    className="upload-form-item"
                  >
                    <Input.TextArea
                      rows={5}
                      placeholder="Tell viewers about your video"
                      className="upload-textarea"
                    />
                  </Form.Item>
                </div>

                <div className="upload-divider" />

                <div className="upload-section">
                  <div className="upload-section-header upload-section-header-thumbnails">
                    <Text className="upload-section-label">Thumbnail</Text>
                    <Text className="upload-section-helper">
                      Select or upload a picture that shows what&apos;s in your video.
                    </Text>
                  </div>

                  <div className="upload-thumbnails-grid">
                    <Upload
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/*"
                      showUploadList={false}
                      beforeUpload={() => false}
                    >
                      <Button type="dashed" className="upload-thumbnail-upload">
                        <CloudUploadOutlined />
                        <span>Upload image</span>
                      </Button>
                    </Upload>
                  </div>
                </div>

                <div className="upload-divider" />


                <div className="upload-form-footer">
                  <Button className="upload-cancel-button">Cancel</Button>
                  <Button type="primary" className="upload-publish-button">
                    Publish Video
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div> 
      </Content>
    </Layout>
  )
}

export default VideoUpload
