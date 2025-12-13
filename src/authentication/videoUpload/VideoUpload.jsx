import {
  BellOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  EditOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Form, Input, Layout, Progress, Typography, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserProfilePopover from '../../components/UserProfilePopover'
import { logoutRequest } from '../logout/logoutSlice'
import './VideoUpload.css'
import { resetVideoUploadState, videoUploadRequest } from './videoUploadSlice'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Dragger } = Upload

function VideoUpload() {
  const [form] = Form.useForm()
  const [uploadInfo, setUploadInfo] = useState(null)
  const [fileList, setFileList] = useState([])
  const [thumbnailFile, setThumbnailFile] = useState(null)

  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.videoUpload || {})
  const navigate = useNavigate()

  const handleProfileClick = () => {
    // Navigate to profile page when implemented
  }

  const handleLogoutClick = () => {
    dispatch(logoutRequest())
  }

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

  const handleThumbnailChange = (info) => {
    const file = info.file.originFileObj || info.file
    setThumbnailFile(file || null)
  }

  const handlePublish = (values) => {
    if (!fileList.length) {
      // No video selected; do nothing for now
      return
    }

    const videoFile = fileList[0].originFileObj || fileList[0]
console.log('Publishing video with details:', { values, videoFile, thumbnailFile })
    dispatch(
      videoUploadRequest({
        title: values.title,
        description: values.description,
        videoFile,
        thumbnailFile,
      }),
    )
  }

    useEffect(() => {
      if (success) {
        form.resetFields()
        setUploadInfo(null)
        setFileList([])
        setThumbnailFile(null)
        dispatch(resetVideoUploadState())
      }
    }, [success, form, dispatch])

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
              StreamHub
              
              </Title>
            </div>
          </div>

          <div className="upload-header-right">
            <div className="upload-header-links">
              <Button
                type="text"
                className="upload-header-link"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            </div>

            <Button
              type="text"
              icon={<BellOutlined />}
              className="upload-icon-button"
            />
            <UserProfilePopover
              avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
              onProfileClick={handleProfileClick}
              onLogoutClick={handleLogoutClick}
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
              <Form
                form={form}
                layout="vertical"
                className="upload-form"
                onFinish={handlePublish}
              >
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
                      onChange={handleThumbnailChange}
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                    className="upload-publish-button"
                  >
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
