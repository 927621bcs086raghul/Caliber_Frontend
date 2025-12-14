import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons'

function ProfileHeroAndContact({
  displayName,
  displayEmail,
  displayPhone,
  displayLocation,
  onEditClick,
}) {
  return (
    <>
      <section className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-hero-overlay" />
        StreamHub
      </section>

      <section className="profile-content-wrapper">
        <div className="profile-card-shell">
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

          <section className="profile-contact-card">
            <div className="profile-contact-header">
              <div className="profile-contact-title-group">
                <span className="profile-contact-icon" />
                <h3 className="profile-contact-title">Contact Info</h3>
              </div>
              <button
                type="button"
                className="profile-edit-button"
                onClick={onEditClick}
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
    </>
  )
}

export default ProfileHeroAndContact
