import React, { useState } from "react";
import "./multiselect.css";

function Multiselect(props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedItem, setHighlightedItem] = useState({});
  const [showUsers, setShowUser] = useState(false);
  const initialItems = [
    {
      id: 1,
      img: "https://https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "Sara Degeorge",
      email: "saraDego@gmail.com",
    },
    {
      id: 2,
      img: "https://https://images.pexels.com/photos/3812720/pexels-photo-3812720.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      username: "Meloni Dior",
      email: "meloniDior@gmail.com",
    },
    {
      id: 3,
      img: "https://https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "Veronica",
      email: "veron@gmail.com",
    },
    {
      id: 4,
      img: "https://https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600",
      username: "Jamal Riaz",
      email: "jamalz@gmail.com",
    },
    {
      id: 5,
      img: "https://https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "Peter Dore",
      email: "peter@gmail.com",
    },

  ];

  const [items, setItems] = useState(initialItems);
  const handleInputChange = (e) => {
    const { value, keyCode } = e.target;
    // setInputValue(e.target.value);
    if (keyCode === 8 && value === "" && selectedItems.length > 0) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      setHighlightedItem(lastSelectedItem);
    } else {
      setInputValue(value);
      setHighlightedItem({});
    }
  };

  const handleBackspacePress = () => {
    if (Object.keys(highlightedItem).length > 0) {
      console.log(highlightedItem);
      handleChipRemove(highlightedItem);
      setHighlightedItem({});
    } else if (selectedItems.length > 0) {
      // Highlight the last chip if not already highlighted
      setHighlightedItem(selectedItems[selectedItems.length - 1]);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);

    setInputValue("");
  };

  const handleChipRemove = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    console.log(updatedItems);
    setSelectedItems(updatedItems);
  };

  console.log(selectedItems);
  const filteredItems = items.filter(
    (item) =>
      !selectedItems.includes(item) &&
      item.email.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(filteredItems);
  return (
    <div className="multiSelectContainer">
      <div className="searchWrapper">
        {selectedItems.map((item, index) => (
          <span
            key={item.email}
            className={`chip ${highlightedItem.email === item.email ? "highlight" : ""
              }`}
          >
            {item.username}
            <span className="closeIcon" onClick={() => handleChipRemove(item)}>
              X
            </span>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add a user"
          className="searchBox"
          value={inputValue}
          onFocus={() => {
            setShowUser(true);
          }}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspacePress()}

        />
      </div>
      {showUsers}
      {showUsers && (
        <div
          className={`optionListContainer ${!showUsers ? "displayNone" : ""}`}
        >
          <ul className="optionContainer ">
            {filteredItems.map((item) => (
              <li
                key={item.email}
                className="option"
                onClick={() => handleItemClick(item)}
              >
                <div style={{ display: "flex" }}>
                  <img src={item.img} alt={item.username} className="img" />
                  <p style={{ marginRight: "0.5rem" }}>{item.username} </p>
                </div>
                <p> {item.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Multiselect;
