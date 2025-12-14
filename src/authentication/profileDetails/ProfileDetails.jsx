import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../dashboard/components/DashboardHeader'
import ProfileHeroAndContact from './components/ProfileHeroAndContact'
import UploadedVideosSection from './components/UploadedVideosSection'
import './ProfileDetails.css'
import { profileFetchRequest, profileUpdateRequest, profileUserVideosRequest } from './profileDetailsSlice'

function ProfileDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, loading } = useSelector((state) => state.profileDetails || {})
  const loginUser = useSelector((state) => state.login?.user || null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [form] = Form.useForm()
  const videos = useSelector((state) => state.profileDetails?.userVideos || [])
  useEffect(() => {
    // Load current profile via GET /api/auth/me/{id}
    let storedUserId
    try {
      const storedRaw = window.localStorage.getItem('loginUser')
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw)
        storedUserId = parsed?.id || parsed?.user?.id
      }
    } catch (e) {
      // ignore JSON / storage errors
    }

    const userId = loginUser?.id || storedUserId

    if (!userId) {
      return
    }

    if (!data) {
      dispatch(profileFetchRequest(userId))
    }

    dispatch(profileUserVideosRequest(userId))
  }, [dispatch, loginUser?.id, data])
  const displayName = data?.name || 'Alex Rivera'
  const displayEmail = data?.email || 'alex.rivera@example.com'
  const displayPhone = data?.phone || 'N/A'
  const displayLocation = data?.location || 'N/A'

  const handleEditClick = () => {
    form.setFieldsValue({
      phone: data?.phone || '',
      location: data?.location || '',
    })
    setIsEditModalVisible(true)
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
  }

  const handleEditFinish = (values) => {
    dispatch(
      profileUpdateRequest({
        name: displayName,
        email: displayEmail,
        phone: values.phone,
        location: values.location,
      }),
    )
    setIsEditModalVisible(false)
  }

  return (
    <div className="profile-page-root">
      <DashboardHeader hideSearch showDashboardLink />

      <main className="profile-main">
        <ProfileHeroAndContact
          displayName={displayName}
          displayEmail={displayEmail}
          displayPhone={displayPhone}
          displayLocation={displayLocation}
          onEditClick={handleEditClick}
        />

        <UploadedVideosSection videos={videos} />
         
      </main>

      <Modal
        title="Edit Profile"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditFinish}
        >
          <Form.Item label="Name">
            <Input value={displayName} readOnly />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={displayEmail} readOnly />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input placeholder="Enter location" />
          </Form.Item>
        </Form>
      </Modal>
     
    </div>
  )
}

export default ProfileDetails
