import { BellOutlined, EllipsisOutlined, HomeFilled, MessageOutlined, PlayCircleOutlined, SearchOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Input, Typography } from 'antd'
import './Dashboard.css'

const { Title, Text } = Typography

function Dashboard() {
  return (
    <div className="dashboard-root">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <div className="dashboard-logo-group">
            <div className="dashboard-logo-icon">
              <PlayCircleOutlined />
            </div>
            <Title level={4} className="dashboard-logo-title">
              StreamHub
            </Title>
          </div>

          <div className="dashboard-search-wrapper">
            <Input
              className="dashboard-search-input"
              prefix={<SearchOutlined />}
              placeholder="Search creators, videos..."
            />
          </div>
        </div>

        <div className="dashboard-header-right">
          <Button
            type="text"
            icon={<SearchOutlined />}
            className="dashboard-icon-button dashboard-icon-button-mobile"
          />

          <div className="dashboard-header-actions">
            <div className="dashboard-bell-wrapper">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="dashboard-icon-button"
              />
              <span className="dashboard-bell-badge" />
            </div>
            <Button
              type="text"
              icon={<MessageOutlined />}
              className="dashboard-icon-button"
            />
          </div>

          <Avatar
            size={40}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
          />
        </div>
      </header>

      {/* Body layout */}
      <div className="dashboard-layout">
        {/* Left sidebar */}
        <aside className="dashboard-sider-left">
          <Button type="text" icon={<HomeFilled />}>
            Home
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />}>
            Explore
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />}>
            Subscriptions
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />}>
            Library
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />}>
            History
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />}>
            Liked Videos
          </Button>

          <div className="dashboard-sider-left-footer">
            <div className="dashboard-premium-card">
              <Text className="dashboard-premium-text">Enjoying StreamHub?</Text>
              <Button type="primary" block className="dashboard-premium-button">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="dashboard-main">
          <div className="dashboard-main-inner">
            {/* Filter bar */}
            <div className="dashboard-filter-bar">
              <div className="dashboard-filter-chips">
                <button className="dashboard-chip-primary">All</button>
                <button className="dashboard-chip">Gaming</button>
                <button className="dashboard-chip">Music</button>
                <button className="dashboard-chip">Technology</button>
              </div>
            </div>

            {/* Hero section */}
            <section className="dashboard-hero-section">
              <div className="dashboard-hero-card">
                <div className="dashboard-hero-media">
                  <div className="dashboard-hero-overlay" />
                </div>
                <div className="dashboard-hero-content">
                  <Flex align="center" gap={8} className="dashboard-hero-user-row">
                    <Avatar
                      size={32}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6LmZjKc3MSXJgx539fANyJ3bUKCK1GtdvPKEHBS_OX4rB0ew76uJB-dtTo6DUB3tRbHhNC4BpJL4g2V-O3P0hQ9UDQ3YvyHw1Bq9fTV73w30Xyc_qV17B3nmg5B37e4gfo4x2JcLeNw6-Uh8e1zTHwU7SelbpAwpwdpgw3-FmL0K9pcOQdWBOoTPFHOoT9mrgGhr5_swDV-ZppvxfzVXSYmIdrjgXhG9QJiQ9yojCyOpjelxqzuMHuFQEahS1TCArIWmvbT9Pt2g"
                    />
                    <Text className="dashboard-hero-user-name">NeonNinja</Text>
                  </Flex>
                  <Title level={2} className="dashboard-hero-title">
                    Cyberpunk 2077: Night City Run - No Commentary
                  </Title>
                  <Text className="dashboard-hero-description">
                    Exploring the dark alleys and completing side quests in high resolution.
                  </Text>
                </div>
              </div>
            </section>

            {/* Trending grid */}
            <section>
              <div className="dashboard-trending-header">
                <Title level={4}>Trending Now</Title>
                <Button type="link" className="dashboard-view-all-button">
                  View All
                </Button>
              </div>

              <div className="dashboard-trending-grid">
                {/* Card 1 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-1">
                    <span className="dashboard-card-duration">45:21</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZxAswdIBayFqhB7BDEJaZOgdwGy-US8N1AqaC86j4LscvdHDolATVlJitXTCtFl18B8SXiz2cX693f3O4j36VZpZVVmc4SERkpUImSnFgyvVA1sSGEnDmGO935-y3mLzaDSZzcXOxMCiLpwW1UHVgxyfJe--ZdXT22RxZ2TExHikjCsR5axEStka2AsLT-b91ZeC2Za5Hht1lnJZm8DlhurMKUUfO5PvER8hZTQhIy27XnY8e8WISE6b5JtVmo_01HOgH56YVJIc"
                    />
                    <div>
                      <p className="dashboard-card-title">
                        Grand Finals: Team Alpha vs Team Beta - Highlights
                      </p>
                      <p className="dashboard-card-meta">
                        Esports League • 1.2M views • 2 hours ago
                      </p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-2">
                    <span className="dashboard-card-duration">12:05</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoZnfuxBrO_1uxpgNKp3iOzEL5eaR09Dh8bw6zLOllQ0o6T1Xu5DW-bIlN3ml0tsW9vqgtGRGf0ODSUIFMBsfaN0a_9-emexzyMUp4nXutTxEgR5aPNBxByctPQljEayt4kWGp5DHqlWlqs4PELmQpF94iRFvgI0dl7zyY34qJmBqCySEKDULb8rFqbWXM5ISMkkMMrFlroaeAalFVWadGRwG53-SPmrMitOuZP2c36L2U_VX-azLCdZ-PVLnlq2Pyw6VNyzEApEI"
                    />
                    <div>
                      <p className="dashboard-card-title">
                        Building the Ultimate Custom Keyboard 2024
                      </p>
                      <p className="dashboard-card-meta">
                        TechSavvy • 500K views • 5 hours ago
                      </p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-3">
                    <span className="dashboard-card-duration">16:08</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4B6W41etywkB9k1cv8DYXnSA1GuZZC1UPxFdQ9tSS-KXuUJMaA2PaxBW00xRTnRB9d7zqiSvbtKV3EvEIaQNgmPc65oA2S-ZTwjkYa87_o7XXMrnkY8IZv1exCHrC9uc3nXRv2CsjPQrfb8ETQbeGGXOuKDWLF-8YFC249JNL16aW-cZo4RAI0d3LQ3pe_ISZ1iae1wVUfZ8j6Mzxppyguy-QxS5BtvJoB82LwgXk4DdS2HGOR_wIt0paHbf9uza8FvceZcZysag"
                    />
                    <div>
                      <p className="dashboard-card-title">Relaxing Nature Walk - 4K 60FPS</p>
                      <p className="dashboard-card-meta">NatureWalks • 120K views • 3 hours ago</p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>

                {/* Card 4 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-4">
                    <span className="dashboard-card-duration">08:14</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfCnDBBDrRJEOsYbJK7mQNzAHWvSuUZ97uBOsRVUVTqHKZs_V1a-ocLwH8LCgm_ARLSjezGlTaWSp2H3-RQ_hxDcnLbtoBkVOouN2h81dB0zj-nlvQcZEYHotxPZP4c50unoGlrh2wBxWZZwoUxuNDHVPOWbfoc94TcgeazpX3pTNsyBiQkE3W-XXNrpbz64F95gR_UPUJlQqww2Av9TH3PwjTOtoGqeTVd4s9tR1-dXxJtJylzutHnqhziqjV_WmEI7A_cwdu2rc"
                    />
                    <div>
                      <p className="dashboard-card-title">
                        Acrylic Pouring Techniques for Beginners
                      </p>
                      <p className="dashboard-card-meta">
                        CreativeFlow • 89K views • 1 day ago
                      </p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>

                {/* Card 5 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-5">
                    <span className="dashboard-card-duration">15:30</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuAzX8ixrHJVZMzBj4Qt1E1lbum_JdPeW8wue8MKYvE8Anm83A_432uPz6crd_aV8TfG2vKRtKIyCxGYR-8R_xRY1N2kr7o2lULd4wEhCUhWtO-nrrmf0lLHPSw67fslAhaBYCqW3C9Fr7mZ5lDQWeHvgoa4JWKRNlBO1IlZ41FkJ1d67Le1ZAtymKj9g4AJzt6g8vCn_DvAdu2juQApBDt7IENojD1bG2ax3Br1XJN8eUsk-etFD5PPtBa8HcAElPTyI1TZ2zWeo"
                    />
                    <div>
                      <p className="dashboard-card-title">
                        Desk Setup Tour 2024 - Productivity Boost
                      </p>
                      <p className="dashboard-card-meta">
                        DesignSpace • 230K views • 3 days ago
                      </p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>

                {/* Card 6 */}
                <article className="dashboard-card">
                  <div className="dashboard-card-media dashboard-card-media-6">
                    <span className="dashboard-card-duration">10:45</span>
                  </div>
                  <div className="dashboard-card-body">
                    <Avatar
                      size={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA35MABv7DsJpnZFQXKZZXs6C21c5Jx1slZFX_Miyun33WyKkWuMrPuDWtEOf9OXRmwSevSORDScZEd3enGORwHf-7AzKAeITHM8ugwYkqoEKE4_IynV85SlL0KjKl5hIsVXZMbwf0cEbroeIE7mZ-XUZz53vEcKVLC3gPbDoJgWCu-PGHP5XlGtkGw82V8hS5QD8eTdGhY1Ap9x1JNjUYT41zArKGEwwiFQNv9pcCx7_r7b6s5XrJXo_XmCtRjV5L3oubW_PrRtbI"
                    />
                    <div>
                      <p className="dashboard-card-title">
                        Authentic Italian Carbonara in 15 Minutes
                      </p>
                      <p className="dashboard-card-meta">
                        CookingWithLove • 1.5M views • 1 week ago
                      </p>
                    </div>
                    <div className="dashboard-card-more">
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
    