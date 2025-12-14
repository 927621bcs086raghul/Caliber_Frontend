import {
  CloseOutlined,
  CloudUploadOutlined,
  EditOutlined
} from '@ant-design/icons'
import { Button, Form, Input, Progress, Select, Typography, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoCategories } from '../../../api/videoApi'
import VideoPreviewModal from '../../videoPreview/VideoPreviewModal'
import { resetVideoUploadState, videoUploadRequest } from '../../videoUpload/videoUploadSlice'

const { Title, Text } = Typography
const { Dragger } = Upload

function VideoUploadContent() {
  const [form] = Form.useForm()
  const [uploadInfo, setUploadInfo] = useState(null)
  const [fileList, setFileList] = useState([])
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.videoUpload || {})

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

  // Handle video preview
  const handlePreviewClick = () => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj || fileList[0]
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setPreviewVisible(true)
    }
  }

  // Handle preview modal close
  const handlePreviewClose = () => {
    setPreviewVisible(false)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
  }

  // Handle publish click
  const handlePublishClick = () => {
    form.setFieldsValue({ isDraft: false })
    form.submit()
  }

  // Handle save draft click
  const handleDraftClick = () => {
    form.setFieldsValue({ isDraft: true })
    form.submit()
  }

  // Single submit handler
  const handleFinish = (values) => {
    if (!fileList.length) {
      return
    }

    const videoFile = fileList[0].originFileObj || fileList[0]
    console.log('Submitting video with details:', { values, videoFile, thumbnailFile, isDraft: values.isDraft })
    
    dispatch(
      videoUploadRequest({
        title: values.title,
        description: values.description,
        categories: values.categories || [],
        videoFile,
        thumbnailFile,
        isDraft: values.isDraft
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

  useEffect(() => {
    getVideoCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
        }
      })
      .catch((err) => {
        console.error('Failed to load categories', err)
      })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <>
      <div className="dashboard-main-inner">
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
                  <div 
                    className="upload-status-thumb" 
                    onClick={handlePreviewClick}
                    style={{ cursor: 'pointer' }}
                    title="Click to preview video"
                  />
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
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl)
                        setPreviewUrl('')
                      }
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
              onFinish={handleFinish}
            >
              {/* Hidden field to track draft/publish */}
              <Form.Item name="isDraft" hidden>
                <Input />
              </Form.Item>

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

                <Form.Item
                  label="Category"
                  name="categories"
                  className="upload-form-item"
                >
                  <Select
                    mode="tags"
                    allowClear
                    placeholder="Select one or more categories"
                    options={categories.map((value) => ({
                      value,
                      label: value,
                    }))}
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
                      <span>{thumbnailFile ? 'Reupload image' : 'Upload image'}</span>
                    </Button>
                  </Upload>

                  {/* THUMBNAIL PREVIEW */}
                  <div className="thumbnail-preview-title">
                    {!thumbnailFile && 'Preview'}
                    {thumbnailFile && (
                      <div className="thumbnail-preview">
                        <img
                          src={URL.createObjectURL(thumbnailFile)}
                          alt="Thumbnail preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="upload-divider" />

              <div className="upload-form-footer">
                <Button
                  type="primary"
                  loading={loading}
                  disabled={loading}
                  className="upload-publish-button"
                  onClick={handlePublishClick}
                >
                  Publish Video
                </Button>
                <Button
                  type="default"
                  loading={loading}
                  disabled={loading}
                  className="save-draft-button"
                  onClick={handleDraftClick}
                >
                  Save Draft
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        visible={previewVisible}
        videoUrl={previewUrl}
        onClose={handlePreviewClose}
        videoName={uploadInfo?.name}
      />
    </>
  )
}

export default VideoUploadContent