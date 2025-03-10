import React, { useState } from "react";

const data = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Laptops",
        children: [
          { id: 3, name: "MacBook" },
          { id: 4, name: "Dell XPS" },
        ],
      },
      {
        id: 5,
        name: "Phones",
        children: [
          { id: 6, name: "iPhone" },
          { id: 7, name: "Samsung Galaxy" },
        ],
      },
    ],
  },
];

const NestedCheckbox = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (id, children = []) => {
    setCheckedItems((prev) => {
      const newCheckedState = { ...prev };
      const isChecked = !newCheckedState[id];

      newCheckedState[id] = isChecked;

      // Recursively update children
      children.forEach((child) => updateChildren(newCheckedState, child, isChecked));

      return newCheckedState;
    });
  };

  const updateChildren = (state, item, isChecked) => {
    state[item.id] = isChecked;
    if (item.children) {
      item.children.forEach((child) => updateChildren(state, child, isChecked));
    }
  };

  const renderCheckboxes = (items, level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      return (
        <div key={item.id} style={{ marginLeft: `${level * 20}px`, marginBottom: "5px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              checked={checkedItems[item.id] || false}
              onChange={() => toggleCheckbox(item.id, item.children || [])}
            />
            {item.name}
          </label>

          {hasChildren && renderCheckboxes(item.children, level + 1)}
        </div>
      );
    });
  };

  return <div>{renderCheckboxes(data)}</div>;
};

export default NestedCheckbox;
