import { CloudUploadOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Upload } from 'antd'

const { Title, Text } = Typography

function UploadRightColumn({ form, loading, thumbnailFile, onPublish, onThumbnailChange }) {
  return (
    <div className="upload-right-column">
      <Form
        form={form}
        layout="vertical"
        className="upload-form"
        onFinish={onPublish}
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
            <Upload
              accept="image/png,image/jpeg,image/jpg,image/webp,image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={onThumbnailChange}
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
  )
}

export default UploadRightColumn
