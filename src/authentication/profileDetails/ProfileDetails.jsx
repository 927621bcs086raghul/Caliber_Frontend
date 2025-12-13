import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    PlayCircleOutlined
} from '@ant-design/icons'
import './ProfileDetails.css'

function ProfileDetails() {
  return (
    <div className="profile-page-root">
      {/* Top navigation */}
      <header className="profile-nav">
        <div className="profile-nav-left">
          <div className="profile-brand">
            <div className="profile-brand-icon">
              <PlayCircleOutlined />
            </div>
            <h2 className="profile-brand-title">StreamConnect</h2>
          </div>
        </div>

        <div className="profile-nav-right">
          <div className="profile-nav-avatar">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
              alt="User avatar thumbnail"
            />
          </div>
        </div>
      </header>

      <main className="profile-main">
        {/* Header banner */}
        <section className="profile-hero">
          <div className="profile-hero-bg" />
          <div className="profile-hero-overlay" />
        </section>

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
                <h1 className="profile-name">Alex Rivera</h1>
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
                <button type="button" className="profile-edit-button">
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
                      href="mailto:alex.rivera@example.com"
                      className="profile-contact-main-link"
                    >
                      alex.rivera@example.com
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
                    <p className="profile-contact-main">+1 (555) 012-3456</p>
                    <p className="profile-contact-sub">Available 9am-5pm EST</p>
                  </div>
                </div>

                <div className="profile-contact-item">
                  <div className="profile-contact-item-icon">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <p className="profile-contact-label">Location</p>
                    <p className="profile-contact-main">San Francisco, CA</p>
                    <p className="profile-contact-sub">Open to relocation</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfileDetails
