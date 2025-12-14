import { Form, Layout, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppSidebar from '../../components/AppSidebar'
import DashboardHeader from '../dashboard/components/DashboardHeader'
import '../dashboard/Dashboard.css'
import { logoutRequest } from '../logout/logoutSlice'
import VideoPreviewModal from '../videoPreview/VideoPreviewModal'
import UploadLeftColumn from './components/UploadLeftColumn'
import UploadRightColumn from './components/UploadRightColumn'
import './VideoUpload.css'
import { resetVideoUploadState, videoUploadRequest } from './videoUploadSlice'

const { Header, Content } = Layout

function VideoUpload() {
  const [form] = Form.useForm()
  const [uploadInfo, setUploadInfo] = useState(null)
  const [fileList, setFileList] = useState([])
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.videoUpload || {})
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate('/profile')
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
        isDraft : false
      }),
    )
  }

  const handleDraft = (values) => {
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
        isDraft : true
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <Layout className="upload-page-root">
      <DashboardHeader hideSearch />

      <div className="dashboard-layout">
        <AppSidebar />
        <main className="dashboard-main">
          <div className="upload-main-inner">
          <div className="upload-page-heading">
            <div className="upload-page-heading-left">
              <Typography.Title level={2} className="upload-page-title">
                Upload Video
              </Typography.Title>
              <Typography.Text className="upload-page-subtitle">
                Manage your upload details and visibility settings.
              </Typography.Text>
            </div>
          </div>

          <div className="upload-grid">
            <UploadLeftColumn
              fileList={fileList}
              uploadInfo={uploadInfo}
              onUploadChange={handleUploadChange}
              onPreviewClick={handlePreviewClick}
              onClearUpload={() => {
                setUploadInfo(null)
                setFileList([])
                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl)
                  setPreviewUrl('')
                }
              }}
            />

            <UploadRightColumn
              form={form}
              loading={loading}
              thumbnailFile={thumbnailFile}
              onPublish={handlePublish}
              onSaveDraft = {handleDraft}
              onThumbnailChange={handleThumbnailChange}
            />
          </div>
          </div>
        </main>
      </div>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        visible={previewVisible}
        videoUrl={previewUrl}
        onClose={handlePreviewClose}
        videoName={uploadInfo?.name}
      />
    </Layout>
  )
}

export default VideoUpload