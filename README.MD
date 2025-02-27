A collection of beautifully designed SVG icons packaged as React components. Easily customizable and ready to use in your React projects.

This package provides [Untitled UI Icons](https://www.untitledui.com/) (MIT version).

## Installation

You can install the package via npm or yarn:

#### Using npm
```bash
npm install react-untitledui-icons
```

#### Using yarn
```bash
yarn add react-untitledui-icons
```

## Usage

Import and use the icons in your React components and you can modify the appearance using CSS or inline styles.:

```jsx
import React from 'react';
import { ActivityFill, Activity } from 'react-untitledui-icons';

const App = () => (
  <div className="flex gap-4 p-4">
    <ActivityFill className="w-6 h-6 text-blue-500 hover:text-blue-700" />
    <Activity className="w-6 h-6 text-red-500 hover:text-red-700" />
  </div>
);

export default App;
```

---

## Customization

All icons are highly customizable using **CSS** or ***inline styles***. You can pass `className` or `style` props to customize the appearance.

### Example: Customizing with Tailwind CSS
```jsx
<ActivityFill className="w-8 h-8 text-purple-500 hover:text-purple-700" />
```

### Example: Customizing with Inline Styles
```jsx
<Activity style={{ width: '32px', height: '32px', color: '#FF0000' }} />
```

---

## Support

If you have any questions, issues, or feature requests, please open an issue on the [GitHub repository](https://github.com/ilmiirf/react-untitledui-icon).

---

## Acknowledgments

- Thanks to [SVGR](https://react-svgr.com/) for making it easy to convert SVGs to React components.
- Inspired by [Untitled UI Icons](https://www.untitledui.com/).

---
