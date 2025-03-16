import React from 'react'
import { Form, Select, Switch, Card, Divider } from 'antd'
import { WidgetDefinition, DashboardTemplate } from '../types'
import { useDashboardStore } from '../store/dashboardStore'

const { Option } = Select

interface Props {
  widget?: WidgetDefinition
  dashboard?: DashboardTemplate
}

const PropertyPanel: React.FC<Props> = ({ widget, dashboard }) => {
  const {
    dashboard: userDashboard,
    updateWidgetConfig,
    updateDashboardConfig,
  } = useDashboardStore()
  const isSyncEnabled = userDashboard.dashboardProperties.syncCurrency
  const globalCurrency = userDashboard.dashboardProperties.globalCurrency

  const handleChange = (
    key: string,
    value: any,
    isDashboardProp: boolean = false
  ) => {
    if (isDashboardProp) {
      updateDashboardConfig(key, value)
    } else if (widget) {
      updateWidgetConfig(widget.id, key, value)
    }
  }

  return (
    <Card
      title={widget ? `${widget.type} Settings` : 'Dashboard Settings'}
      variant={'borderless'}
      style={{ marginBottom: '20px' }}
    >
      <Form layout="vertical">
        {/* Global Dashboard Settings */}
        {dashboard && (
          <>
            <Form.Item label="Sync Currency Across Widgets">
              <Switch
                checked={isSyncEnabled}
                onChange={(checked) =>
                  handleChange('syncCurrency', checked, true)
                }
              />
            </Form.Item>

            {isSyncEnabled && (
              <Form.Item label="Global Currency">
                <Select
                  value={globalCurrency}
                  onChange={(value) =>
                    handleChange('globalCurrency', value, true)
                  }
                >
                  {dashboard.properties
                    .find((p) => p.key === 'globalCurrency')
                    ?.options?.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            <Divider />
          </>
        )}

        {/* Widget-Specific Settings */}
        {widget &&
          widget.configOptions.map((option) => {
            if (isSyncEnabled && option.key === 'currency') return null // Hide widget currency if sync is on

            return (
              <Form.Item key={option.key} label={option.label}>
                {option.uiControl === 'dropdown' && (
                  <Select
                    value={
                      userDashboard.configValues[widget.id]?.[option.key] ||
                      option.defaultValue
                    }
                    onChange={(value) => handleChange(option.key, value)}
                  >
                    {option.options?.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            )
          })}
      </Form>
    </Card>
  )
}

export default PropertyPanel
