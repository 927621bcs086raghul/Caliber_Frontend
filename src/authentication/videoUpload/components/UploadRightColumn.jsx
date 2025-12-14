import { CloudUploadOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Upload } from 'antd'

const { Title, Text } = Typography

function UploadRightColumn({
  form,
  loading,
  thumbnailFile,
  onPublish,
  onThumbnailChange,
  onSaveDraft,
}) {

  // 🔑 Handle publish click
  const handlePublish = () => {
    form.setFieldsValue({ isDraft: false });
    form.submit();
  };

  // 🔑 Handle save draft click
  const handleSaveDraft = () => {
    form.setFieldsValue({ isDraft: true });
    form.submit();
  };

  // 🔑 Single submit handler
  const handleFinish = (values) => {
    if (values.isDraft) {
      onSaveDraft(values);
    } else {
      onPublish(values);
    }
  };

  return (
    <div className="upload-right-column">
      <Form
        form={form}
        layout="vertical"
        className="upload-form"
        onFinish={handleFinish}
      >

        {/* 🔒 Hidden field to track draft/publish */}
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
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input
              placeholder="Give your video a catchy title"
              maxLength={100}
            />
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
            loading={loading}
            disabled={loading}
            className="upload-publish-button"
            onClick={handlePublish}
          >
            Publish Video
          </Button>

          <Button
            type="primary"
            loading={loading}
            disabled={loading}
            className="save-Draft-button"
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UploadRightColumn
