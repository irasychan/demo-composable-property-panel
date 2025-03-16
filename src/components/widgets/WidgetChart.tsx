import React from 'react'
import { Card } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDashboardStore } from '../../store/dashboardStore'

const WidgetChart: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const { dashboard } = useDashboardStore()
  const isSyncEnabled = dashboard.dashboardProperties.syncCurrency
  const currency = isSyncEnabled
    ? dashboard.dashboardProperties.globalCurrency
    : dashboard.configValues[widgetId]?.currency

  const data = Array.from({ length: 10 }, (_, index) => ({
    name: `Day ${index + 1}`,
    value: Math.floor(Math.random() * 100) + 20,
  }))

  return (
    <Card title={`Sales Trend (${currency})`} variant="borderless">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${currency} ${value}`} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1890ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default WidgetChart
