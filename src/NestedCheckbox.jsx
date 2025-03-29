import React, { useState } from "react";

const initialData = [
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
  const [data, setData] = useState(initialData);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (id, children = []) => {
    setCheckedItems((prev) => {
      const newCheckedState = { ...prev };
      const isChecked = !newCheckedState[id];
      newCheckedState[id] = isChecked;
      
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

  const renderCheckboxes = (items, level = 0, parent = null) => {
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
          <button onClick={() => addCheckbox(item.id)}>Add Sub-Item</button>
          <button onClick={() => removeCheckbox(item.id, parent)}>Remove</button>
          {hasChildren && renderCheckboxes(item.children, level + 1, item)}
        </div>
      );
    });
  };

  const addCheckbox = (parentId) => {
    const newItem = {
      id: Date.now(),
      name: "New Item",
      children: [],
    };
    
    const updateTree = (items) => {
      return items.map((item) => {
        if (item.id === parentId) {
          return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };

    setData((prevData) => updateTree(prevData));
  };

  const removeCheckbox = (id, parent) => {
    const removeItem = (items) => items.filter((item) => item.id !== id);

    if (parent) {
      parent.children = removeItem(parent.children);
      setData([...data]);
    } else {
      setData(removeItem(data));
    }
  };

  return <div>{renderCheckboxes(data)}</div>;
};

export default NestedCheckbox;
