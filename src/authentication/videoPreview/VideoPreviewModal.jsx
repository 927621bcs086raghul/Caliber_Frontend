import { Modal } from 'antd'
import PropTypes from 'prop-types'
import './VideoPreviewModal.css'

function VideoPreviewModal({ visible, videoUrl, onClose, videoName }) {
  return (
    <Modal
      open={visible}
      title={videoName || 'Video Preview'}
      footer={null}
      onCancel={onClose}
      width={900}
      centered
      destroyOnClose
      className="video-preview-modal"
    >
      <div className="video-preview-container">
        <video
          controls
          autoPlay
          className="video-preview-player"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  )
}

VideoPreviewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  videoName: PropTypes.string,
}

VideoPreviewModal.defaultProps = {
  videoUrl: '',
  videoName: '',
}

export default VideoPreviewModal