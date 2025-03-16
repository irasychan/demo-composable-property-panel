import { create } from 'zustand'
import { UserDashboard } from '../types'
import { dashboardTemplate } from '../data/dashboardTemplate'

interface DashboardStore {
  dashboard: UserDashboard
  updateWidgetConfig: (widgetId: string, key: string, value: any) => void
  updateDashboardConfig: (key: string, value: any) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboard: {
    id: 'user-dash-001',
    templateId: dashboardTemplate.id,
    configValues: {
      'chart-1': { currency: 'USD' },
      'table-1': { currency: 'USD', rowsPerPage: 10 },
    },
    dashboardProperties: { syncCurrency: true, globalCurrency: 'USD' },
  },
  updateWidgetConfig: (widgetId, key, value) =>
    set((state) => {
      const isSyncEnabled = state.dashboard.dashboardProperties.syncCurrency
      if (isSyncEnabled && key === 'currency') {
        return {
          dashboard: {
            ...state.dashboard,
            dashboardProperties: {
              ...state.dashboard.dashboardProperties,
              globalCurrency: value,
            },
            configValues: {
              ...state.dashboard.configValues,
              'chart-1': {
                ...state.dashboard.configValues['chart-1'],
                currency: value,
              },
              'table-1': {
                ...state.dashboard.configValues['table-1'],
                currency: value,
              },
            },
          },
        }
      } else {
        return {
          dashboard: {
            ...state.dashboard,
            configValues: {
              ...state.dashboard.configValues,
              [widgetId]: {
                ...state.dashboard.configValues[widgetId],
                [key]: value,
              },
            },
          },
        }
      }
    }),
  updateDashboardConfig: (key, value) =>
    set((state) => {
      if (key === 'syncCurrency') {
        return {
          dashboard: {
            ...state.dashboard,
            dashboardProperties: {
              ...state.dashboard.dashboardProperties,
              syncCurrency: value,
            },
          },
        }
      }
      return {
        dashboard: {
          ...state.dashboard,
          dashboardProperties: {
            ...state.dashboard.dashboardProperties,
            [key]: value,
          },
        },
      }
    }),
}))
