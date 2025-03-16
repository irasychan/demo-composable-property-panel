import React from 'react'
import { Card, Table } from 'antd'
import { useDashboardStore } from '../../store/dashboardStore'

const WidgetTable: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const { dashboard } = useDashboardStore()
  const rowsPerPage = dashboard.configValues[widgetId]?.rowsPerPage || 10
  const currency = dashboard.dashboardProperties.syncCurrency
    ? dashboard.dashboardProperties.globalCurrency
    : dashboard.configValues[widgetId]?.currency

  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    key: index + 1,
    name: `Item ${index + 1}`,
    category: `Category ${(index % 5) + 1}`,
    value: `${currency} ${(Math.random() * 100).toFixed(2)}`,
  }))

  const columns = [
    { title: 'ID', dataIndex: 'key', key: 'key', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'right' as 'right',
    },
  ]

  return (
    <Card title="Product Data" variant={'borderless'}>
      <Table
        dataSource={sampleData.slice(0, rowsPerPage)}
        columns={columns}
        pagination={false}
        size="small"
        bordered
      />
      <p style={{ textAlign: 'right', marginTop: '10px', color: '#888' }}>
        Showing {rowsPerPage} rows
      </p>
    </Card>
  )
}

export default WidgetTable
