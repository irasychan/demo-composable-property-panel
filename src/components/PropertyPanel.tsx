import React from 'react'
import {
  Form,
  Select,
  Switch,
  Card,
  Divider,
  InputNumber,
  Input,
  Slider,
} from 'antd'
import { WidgetDefinition, DashboardTemplate, ConfigOption } from '../types'
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

  /** Handles state updates for both widget & global settings */
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

  /** Determines if a config should be rendered based on conditional rules */
  const shouldShowConfig = (option: ConfigOption): boolean => {
    const rule = dashboard?.conditionalRules.find(
      (r) => r.targetWidget === widget?.id && r.configKey === option.key
    )
    if (!rule) return true // No rule means always show

    const { widget: sourceWidget, key, operator, value } = rule.dependsOn
    const sourceValue =
      sourceWidget === 'global'
        ? userDashboard.dashboardProperties[key]
        : userDashboard.configValues[sourceWidget]?.[key]

    switch (operator) {
      case 'equals':
        return sourceValue === value
      case 'notEquals':
        return sourceValue !== value
      case 'greaterThan':
        return sourceValue > value
      case 'lessThan':
        return sourceValue < value
      default:
        return true
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
            {dashboard.properties.map((option) =>
              shouldShowConfig(option) ? (
                <Form.Item key={option.key} label={option.label}>
                  {option.uiControl === 'switch' && (
                    <Switch
                      checked={userDashboard.dashboardProperties[option.key]}
                      onChange={(checked) =>
                        handleChange(option.key, checked, true)
                      }
                    />
                  )}
                  {option.uiControl === 'dropdown' && (
                    <Select
                      value={userDashboard.dashboardProperties[option.key]}
                      onChange={(value) =>
                        handleChange(option.key, value, true)
                      }
                    >
                      {option.options?.map((opt) => (
                        <Option key={opt} value={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>
                  )}
                  {option.uiControl === 'slider' && (
                    <InputNumber
                      min={option.min || 0}
                      max={option.max || 100}
                      step={option.step || 1}
                      value={userDashboard.dashboardProperties[option.key]}
                      onChange={(value) =>
                        handleChange(option.key, value, true)
                      }
                    />
                  )}
                  {option.uiControl === 'input' && (
                    <Input
                      value={userDashboard.dashboardProperties[option.key]}
                      onChange={(e) =>
                        handleChange(option.key, e.target.value, true)
                      }
                    />
                  )}
                </Form.Item>
              ) : null
            )}
            <Divider />
          </>
        )}

        {/* Widget-Specific Settings */}
        {widget &&
          widget.configOptions.map((option) =>
            shouldShowConfig(option) ? (
              <Form.Item key={option.key} label={option.label}>
                {option.uiControl === 'switch' && (
                  <Switch
                    checked={
                      userDashboard.configValues[widget.id]?.[option.key] ??
                      option.defaultValue
                    }
                    onChange={(checked) => handleChange(option.key, checked)}
                  />
                )}
                {option.uiControl === 'dropdown' && (
                  <Select
                    value={
                      userDashboard.configValues[widget.id]?.[option.key] ??
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
                {option.uiControl === 'slider' && (
                  <Slider
                    min={option.min || 0}
                    max={option.max || 100}
                    step={option.step || 1}
                    value={
                      userDashboard.configValues[widget.id]?.[option.key] ??
                      option.defaultValue
                    }
                    onChange={(value) => handleChange(option.key, value)}
                  />
                )}
                {option.uiControl === 'input' && (
                  <Input
                    value={
                      userDashboard.configValues[widget.id]?.[option.key] ??
                      option.defaultValue
                    }
                    onChange={(e) => handleChange(option.key, e.target.value)}
                  />
                )}
              </Form.Item>
            ) : null
          )}
      </Form>
    </Card>
  )
}

export default PropertyPanel
