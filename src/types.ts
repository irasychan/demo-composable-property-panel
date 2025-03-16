/**
 * Represents a configurable property in a widget.
 * Each property has a type, UI control type, and default value.
 */
export interface WidgetConfig {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean'
  uiControl: 'input' | 'slider' | 'checkbox' | 'dropdown'
  defaultValue: any
  options?: any[] // Used for dropdowns
}

/**
 * Defines a widget in the dashboard template.
 * Each widget has an ID, type, and configurable options.
 */
export interface WidgetDefinition {
  id: string
  type: string
  configOptions: WidgetConfig[]
}

/**
 * Represents a configurable property at the dashboard level.
 * These are global settings (e.g., theme, refresh rate).
 */
export interface DashboardConfig {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean'
  uiControl: 'input' | 'slider' | 'checkbox' | 'dropdown'
  defaultValue: any
  options?: any[]
}

/**
 * Defines a rule that controls inter-widget dependencies.
 * Conditions specify when a property should be visible or modified.
 */
export interface ConditionalRule {
  targetWidget: string // Widget affected by this rule
  configKey: string // Config property affected
  dependsOn: {
    widget: string // Widget that controls this dependency
    key: string // Config key in the controlling widget
    operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan'
    value: any
  }
}

/**
 * Represents a dashboard template created by an admin.
 * It includes widgets, dashboard-wide settings, and dependency rules.
 */
export interface DashboardTemplate {
  id: string
  name: string
  properties: DashboardConfig[] // Dashboard-wide settings
  widgets: WidgetDefinition[] // Widgets defined in the template
  conditionalRules: ConditionalRule[] // Cross-widget conditions
}

/**
 * Represents a user-configured dashboard instance.
 * Stores the user's custom configuration values.
 */
export interface UserDashboard {
  id: string
  templateId: string
  configValues: Record<string, Record<string, any>> // Widget-specific settings
  dashboardProperties: Record<string, any> // Global dashboard settings
}
