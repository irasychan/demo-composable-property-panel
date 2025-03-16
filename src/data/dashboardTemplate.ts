import { DashboardTemplate } from '../types'

export const dashboardTemplate: DashboardTemplate = {
  id: 'template-001',
  name: 'Sales Overview',
  properties: [
    {
      key: 'syncCurrency',
      label: 'Sync Currency Across Widgets',
      type: 'boolean',
      uiControl: 'checkbox',
      defaultValue: true,
    },
    {
      key: 'globalCurrency',
      label: 'Global Currency',
      type: 'string',
      uiControl: 'dropdown',
      defaultValue: 'USD',
      options: ['USD', 'EUR', 'JPY', 'GBP'],
    },
  ],
  widgets: [
    {
      id: 'chart-1',
      type: 'chart',
      configOptions: [
        {
          key: 'currency',
          label: 'Currency',
          type: 'string',
          uiControl: 'dropdown',
          defaultValue: 'USD',
          options: ['USD', 'EUR', 'JPY', 'GBP'],
        },
      ],
    },
    {
      id: 'table-1',
      type: 'table',
      configOptions: [
        {
          key: 'currency',
          label: 'Currency',
          type: 'string',
          uiControl: 'dropdown',
          defaultValue: 'USD',
          options: ['USD', 'EUR', 'JPY', 'GBP'],
        },
      ],
    },
  ],
  conditionalRules: [
    {
      targetWidget: 'chart-1',
      configKey: 'currency',
      dependsOn: {
        widget: 'global',
        key: 'syncCurrency',
        operator: 'equals',
        value: true,
      },
    },
    {
      targetWidget: 'table-1',
      configKey: 'currency',
      dependsOn: {
        widget: 'global',
        key: 'syncCurrency',
        operator: 'equals',
        value: true,
      },
    },
  ],
}
