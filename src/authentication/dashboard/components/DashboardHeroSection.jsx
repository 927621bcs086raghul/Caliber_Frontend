import { Avatar, Flex, Typography } from 'antd'
import '../Dashboard.css'

const { Title, Text } = Typography

function DashboardHeroSection() {
  return (
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
  )
}

export default DashboardHeroSection
