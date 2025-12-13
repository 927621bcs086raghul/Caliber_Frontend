import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons'
import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserProfilePopover from '../../components/UserProfilePopover'
import DashboardTrendingGrid from '../dashboard/components/DashboardTrendingGrid'
import { logoutRequest } from '../logout/logoutSlice'
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

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleLogoutClick = () => {
    dispatch(logoutRequest())
  }

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
      {/* Top navigation */}
      <header className="profile-nav">
        <div className="profile-nav-left">
          <div className="profile-brand">
            <div className="dashboard-logo-icon">
            <PlayCircleOutlined />
          </div>
            
            <h2 className="profile-brand-title">StreamHub</h2>
          </div>
        </div>
        <div className="profile-nav-right">
          <button
            type="button"
            className="profile-nav-dashboard-link"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <div className="profile-nav-avatar">
            <UserProfilePopover
              avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
              onProfileClick={handleProfileClick}
              onLogoutClick={handleLogoutClick}
              size="large"
            />
          </div>
        </div>
      </header>

      <main className="profile-main">
        {/* Header banner */}
        <section className="profile-hero">
          <div className="profile-hero-bg" />
          <div className="profile-hero-overlay" />
   StreamHub    </section>

        <section className="profile-content-wrapper">
          <div className="profile-card-shell">
            {/* Avatar + basic info */}
            <div className="profile-header-block">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-large">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALf9ASSnCScyxg340_UvzjonN5Q5O1CX6wuGu11JKdbHzZE8C6QYOyVai9Bnqrk1l5IAp1NAoW21Zuwg2UYUegCH_Gd_bhklaTkgCtCdPk3iF2YKapphyjIAhSZ5kPIVz9sIjWTq9-jrTbkUlE2AbTdS_gLZ8CjMoydMpoooyc5wPTkL6pRHixblpFTmM-Oj3U-u89T7y0UKlOmsCnOvJ6TVb1z_RAedbw2fqWh_Xxm8ZB1YotARGim0vsFeNb5mjug1OTyaVUeFw"
                    alt="Profile avatar"
                  />
                </div>
                <div className="profile-status-dot" title="Online" />
              </div>

              <div className="profile-header-text">
                <h1 className="profile-name">{displayName}</h1>
                <p className="profile-handle">@arivera</p>
                <p className="profile-bio">
                  Digital artist sharing tips on motion graphics and real-time 3D rendering.
                  Making the complex simple.
                </p>
              </div>
            </div>

            {/* Contact info */}
            <section className="profile-contact-card">
              <div className="profile-contact-header">
                <div className="profile-contact-title-group">
                  <span className="profile-contact-icon" />
                  <h3 className="profile-contact-title">Contact Info</h3>
                </div>
                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>

              <div className="profile-contact-grid">
                <div className="profile-contact-item">
                  <div className="profile-contact-item-icon">
                    <MailOutlined />
                  </div>
                  <div>
                    <p className="profile-contact-label">Email</p>
                    <a
                      href={`mailto:${displayEmail}`}
                      className="profile-contact-main-link"
                    >
                      {displayEmail}
                    </a>
                    <p className="profile-contact-sub">For business inquiries</p>
                  </div>
                </div>

                <div className="profile-contact-item">
                  <div className="profile-contact-item-icon">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <p className="profile-contact-label">Phone</p>
                    <p className="profile-contact-main">{displayPhone}</p>
                    <p className="profile-contact-sub">Available 9am-5pm EST</p>
                  </div>
                </div>

                <div className="profile-contact-item">
                  <div className="profile-contact-item-icon">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <p className="profile-contact-label">Location</p>
                    <p className="profile-contact-main">{displayLocation}</p>
                    <p className="profile-contact-sub">Open to relocation</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <div className=' uploaded-video-profile-contact-card'>
            <div>
                <h2 className="profile-contact-title">Uploaded Videos</h2>
            </div>
            <DashboardTrendingGrid videos={videos} />
        </div>
         
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
