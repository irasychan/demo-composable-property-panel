# **Composable Property Panel - Proof of Concept (POC)**

## **🚀 Overview**

This **Proof of Concept (POC)** demonstrates a **composable property panel** that dynamically updates widget configurations in a **dashboard-like environment**. The goal is to provide a **scalable, reusable** property panel system that synchronizes settings across widgets based on defined conditions.

---

## **🔹 Key Features**

✅ **Composable Property Panel** - Dynamically generates UI controls based on a configuration schema.\
✅ **Widget-Level & Global Settings** - Widgets have independent settings, while global settings can override them.\
✅ **Conditional Synchronization** - Enforces rules (e.g., syncing currency across widgets).\
✅ **Ant Design UI Components** - Provides a clean, modern interface.\
✅ **Zustand for State Management** - Ensures efficient and reactive state updates.\
✅ **Pluggable Widgets (********`Widget*`******** Components)** - Easily extendable with new widgets.

---

## **📂 Project Structure**

```
src/
│── components/
│   │── PropertyPanel.tsx         # Composable property panel
│   │── DashboardRenderer.tsx     # Renders widgets in the dashboard
│   │── widgets/
│   │   │── WidgetChart.tsx       # Chart widget with currency support
│   │   │── WidgetTable.tsx       # Table widget with dynamic row count & currency
│── data/
│   │── dashboardTemplate.ts      # Defines widgets, settings, and conditional rules
│── store/
│   │── dashboardStore.ts         # Zustand store for managing settings
│── types.ts                      # TypeScript interfaces for schema-driven rendering
│── App.tsx                        # Main app container
│── main.tsx                       # React entry point
│── README.md                      # Documentation
```

---

## **⚙️ How It Works**

### **📌 Composable Property Panel**

The **`PropertyPanel.tsx`** dynamically renders input fields for:

- **Global Settings (Dashboard Level)**
- **Per-Widget Settings (Independent or Synced)**

```tsx
<PropertyPanel dashboard={dashboardTemplate} />   // For global settings
<PropertyPanel widget={widget} dashboard={dashboardTemplate} />   // For per-widget settings
```

---

### **📌 Conditional Rules (Sync Currency Feature)**

This system allows defining **dynamic dependencies** between settings.\
Example: If **`syncCurrency`** is enabled, all widgets follow **`globalCurrency`** instead of their own setting.

#### \*\*Conditional Rule Definition in \*\***`dashboardTemplate.ts`**

```tsx
conditionalRules: [
  {
    targetWidget: "chart-1",
    configKey: "currency",
    dependsOn: {
      widget: "global",
      key: "syncCurrency",
      operator: "equals",
      value: true,
    },
  },
  {
    targetWidget: "table-1",
    configKey: "currency",
    dependsOn: {
      widget: "global",
      key: "syncCurrency",
      operator: "equals",
      value: true,
    },
  },
]
```

#### \*\*Behavior in \*\***`PropertyPanel.tsx`**

```tsx
{isSyncEnabled && option.key === "currency" ? null : (
  <Form.Item key={option.key} label={option.label}>
    <Select
      value={userDashboard.configValues[widget.id]?.[option.key] || option.defaultValue}
      onChange={(value) => handleChange(option.key, value)}
    >
      {option.options?.map((opt) => (
        <Option key={opt} value={opt}>
          {opt}
        </Option>
      ))}
    </Select>
  </Form.Item>
)}
```

📌 **Outcome:**

- \*\*If \*\***`syncCurrency = true`** → Widgets follow `globalCurrency`.
- \*\*If \*\***`syncCurrency = false`** → Each widget can choose its own currency.

---

## **💡 Use Cases**

✅ **Configurable Dashboards** - Allowing users to modify settings dynamically.\
✅ **No-Code Platforms** - Enabling users to configure components via UI.\
✅ **Composable UI Systems** - Extending the property panel for different applications.

---

## **🛠️ Setup & Run**

1️⃣ Install dependencies:

```bash
npm install
```

2️⃣ Start the development server:

```bash
npm run dev
```

3️⃣ Open [http://localhost:5173](http://localhost:5173) to see the demo.

---

## **🤝 Contributing**

This is a **POC** and open to improvements! If you’d like to contribute:\
1️⃣ Fork the repo\
2️⃣ Create a feature branch\
3️⃣ Submit a PR 🎉

---

## **📜 License**

MIT License. Free to use and modify.

---

## **🔗 Links**

📖 **Ant Design Components** → [https://ant.design/components/](https://ant.design/components/)\
🔧 **Zustand State Management** → [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)\
📊 **Recharts for Charts** → [https://recharts.org/en-US/](https://recharts.org/en-US/)

---

**🚀 Built for flexibility, composability, and scalability!**\
Let me know if you’d like additional improvements! 😃
