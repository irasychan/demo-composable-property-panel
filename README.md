# **Composable Property Panel - Proof of Concept (POC)**

## **🚀 Overview**
This project demonstrates a **composable, schema-driven property panel** that dynamically renders settings for both **global dashboard configurations** and **individual widget configurations**. The system allows **extensible, reusable UI controls** with built-in **conditional rules** that dynamically adjust visibility and behavior.

This POC is ideal for applications requiring **highly configurable dashboards**, **no-code platforms**, or **dynamic UI forms**.

---

## **🔹 Features**
✅ **Composable & Schema-Driven** - UI dynamically adapts to the provided definition.  
✅ **Global & Widget-Level Settings** - Supports settings at both levels, with automatic overrides.  
✅ **Conditional Rules System** - Properties can depend on other values, enabling sync behaviors.  
✅ **UI Control Rendering** - Supports multiple control types (`dropdown`, `switch`, `input`, `number`).  
✅ **Ant Design UI Components** - Provides a polished, modern UI.  
✅ **Zustand for State Management** - Lightweight and efficient state management.

---

## **📂 Project Structure**
```
src/
│── components/
│   │── PropertyPanel.tsx          # Composable property panel (schema-driven UI)
│   │── DashboardRenderer.tsx      # Renders widgets dynamically
│   │── widgets/
│   │   │── WidgetChart.tsx        # Chart widget (uses schema-defined props)
│   │   │── WidgetTable.tsx        # Table widget (dynamically updates rows & currency)
│── data/
│   │── dashboardTemplate.ts       # Defines widgets, settings, and conditional rules
│── store/
│   │── dashboardStore.ts          # Zustand store for managing configurations
│── types.ts                       # TypeScript interfaces for schema-driven rendering
│── App.tsx                        # Main app container
│── main.tsx                        # React entry point
│── README.md                      # Documentation
```

---

## **⚙️ How It Works**

### **📌 Composable Property Panel**
The **`PropertyPanel.tsx`** dynamically generates UI controls based on a schema.  
It supports:
- **Global Settings (Dashboard Level)**
- **Per-Widget Settings (Independent or Synced)**

```tsx
<PropertyPanel dashboard={dashboardTemplate} />   // Renders global properties
<PropertyPanel widget={widget} dashboard={dashboardTemplate} />   // Renders per-widget settings
```

---

### **📌 Schema-Driven UI Rendering**
Instead of hardcoding UI elements, the system **interprets definitions dynamically**.

Example of a **widget property definition in `dashboardTemplate.ts`**:
```tsx
{
  key: "currency",
  label: "Currency",
  type: "string",
  uiControl: "dropdown",
  defaultValue: "USD",
  options: ["USD", "EUR", "JPY", "GBP"],
}
```
The **Property Panel** automatically renders this as a **`Select` dropdown**, without manual UI configuration.

---

### **📌 Conditional Rules for Dynamic UI**
Settings can be **conditionally displayed or updated** based on other values.  
For example, if **`syncCurrency` is enabled**, all widgets will follow the **`globalCurrency`** setting.

#### **Example: Conditional Rule for Currency Syncing**
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
],
```

#### **Behavior in the UI**
- **If `syncCurrency = true`** → Widgets **follow `globalCurrency`**.
- **If `syncCurrency = false`** → Widgets **can have independent currencies**.

---

### **📌 Supported UI Controls**
| Control Type | `uiControl` Value | Example UI |
|-------------|-----------------|------------|
| Switch (Toggle) | `"switch"` | `✓ Enable Sync` |
| Dropdown | `"dropdown"` | `USD / EUR / JPY` |
| Number Input | `"number"` | `Rows Per Page: 10` |
| Text Input | `"input"` | `Report Name: "Monthly Sales"` |

These controls are **automatically rendered** based on the schema, without modifying the UI code.

---

## **💡 Use Cases**
✅ **Configurable Dashboards** - Dynamically generate UI based on user-defined templates.  
✅ **No-Code Platforms** - Enable users to modify UI configurations without writing code.  
✅ **Dynamic UI Systems** - Automatically adapt UI components based on settings.

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

## **🚀 Future Enhancements**
🔹 **Drag & Drop Widgets** - Allow users to reposition widgets dynamically.  
🔹 **Local Storage Persistence** - Save user settings across sessions.  
🔹 **More Widget Types** - Support charts, tables, KPIs, etc.  
🔹 **Dark Mode / Theming** - Customizable styles.

---

## **🤝 Contributing**
This project is open for contributions! 🚀  
1️⃣ Fork the repo  
2️⃣ Create a feature branch  
3️⃣ Submit a PR 🎉

---

## **📜 License**
MIT License. Free to use and modify.

---

## **🔗 Links**
📖 **Ant Design Components** → [https://ant.design/components/](https://ant.design/components/)  
🔧 **Zustand State Management** → [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)  
📊 **Recharts for Charts** → [https://recharts.org/en-US/](https://recharts.org/en-US/)

---

**🚀 Designed for scalability, reusability, and dynamic UI generation!**  
Let me know if you need further refinements. 😃