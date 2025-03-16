import React from 'react'
import { Row, Col } from 'antd'
import { DashboardTemplate } from '../types'
import WidgetChart from './widgets/WidgetChart'
import WidgetTable from './widgets/WidgetTable'

interface Props {
  template: DashboardTemplate
}

const DashboardRenderer: React.FC<Props> = ({ template }) => {
  return (
    <div
      style={{
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        minHeight: '500px',
      }}
    >
      <Row gutter={[24, 24]}>
        {template.widgets.map((widget) => (
          <Col key={widget.id} span={widget.type === 'table' ? 24 : 12}>
            {widget.type === 'table' ? (
              <WidgetTable widgetId={widget.id} />
            ) : (
              <WidgetChart widgetId={widget.id} />
            )}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default DashboardRenderer
