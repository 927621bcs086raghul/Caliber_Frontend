import { EllipsisOutlined, CloudUploadOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Typography,
  Modal,
  Input,
  Upload,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../draftVideo.css'

const { Title } = Typography
const { TextArea } = Input

function DraftGrid({ videos = [], onPublishDraft }) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  // 🔑 Open modal
  const handleOpenModal = (video) => {
    setSelectedVideo(video)
    setTitle(video.title || '')
    setDescription(video.description || '')
    setThumbnailFile(null)
    setThumbnailPreview(
      video.thumbnailPath
        ? `http://localhost:5000${video.thumbnailPath}`
        : null
    )
    setOpen(true)
  }

  // 🔑 Close modal
  const handleClose = () => {
    setOpen(false)
    setSelectedVideo(null)
    setThumbnailFile(null)
    setThumbnailPreview(null)
  }

  // 🔑 Handle image select
  const handleThumbnailChange = (info) => {
    const file = info.file.originFileObj
    if (file) {
      setThumbnailFile(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  // 🔑 Publish draft (SEND TO BACKEND)
  const handlePublish = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('draft', false)

    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile)
    }

    onPublishDraft(selectedVideo.id, formData)
    handleClose()
  }

  return (
    <section>
      <div className="dashboard-trending-grid">
        {videos.length === 0 ? (
          <p style={{ padding: '8px 0', color: '#8c8c8c' }}>
            No videos found.
          </p>
        ) : (
          videos.map((video) => (
            <article
              key={video.id}
              className="dashboard-card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOpenModal(video)}
            >
              <div
                className="dashboard-card-media"
                style={
                  video.thumbnailPath
                    ? {
                        backgroundImage: `url(http://localhost:5000${video.thumbnailPath})`,
                      }
                    : undefined
                }
              />

              <div className="dashboard-card-body">
                <Avatar size={40}>{video.User?.name?.[0]}</Avatar>

                <div>
                  <p className="dashboard-card-title">
                    {video.title || 'Untitled video'}
                  </p>
                  <p className="dashboard-card-meta">
                    {video.User?.name || 'Unknown creator'}
                  </p>
                </div>

                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </article>
          ))
        )}
      </div>

      {/* ✅ MODAL */}
      <Modal
        title="Publish Video"
        open={open}
        onCancel={handleClose}
        onOk={handlePublish}
        okText="Publish"
      >
        {/* Thumbnail Preview */}
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="Thumbnail"
            style={{
              width: '100%',
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
        )}

     

        <Title level={5} style={{ marginTop: 16 }}>
          Title
        </Title>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Title level={5} style={{ marginTop: 16 }}>
          Description
        </Title>
        <TextArea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </section>
  )
}

export default DraftGrid
