import React from 'react'
import { Layout, Row, Col, Typography } from 'antd'
import PropertyPanel from './components/PropertyPanel'
import DashboardRenderer from './components/DashboardRenderer'
import { dashboardTemplate } from './data/dashboardTemplate'

const { Header, Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  return (
    <Layout
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <Header
        style={{
          background: '#001529',
          color: 'white',
          textAlign: 'center',
          padding: '16px',
        }}
      >
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Composable Property Panel - POC
        </Title>
      </Header>

      {/* Centered Content */}
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
          background: '#f0f2f5',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Row gutter={24}>
            {/* Left Panel - Property Settings */}
            <Col span={6}>
              <Title level={4}>Dashboard Settings</Title>
              <PropertyPanel dashboard={dashboardTemplate} />

              <Title level={4} style={{ marginTop: '20px' }}>
                Widget Settings
              </Title>
              {dashboardTemplate.widgets.map((widget) => (
                <PropertyPanel key={widget.id} widget={widget} />
              ))}
            </Col>

            {/* Right Canvas - Rendered Dashboard */}
            <Col span={18}>
              <DashboardRenderer template={dashboardTemplate} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

export default App
