import styles from "../styles/List.module.css";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { Icon } from "@iconify/react";
import { Asap } from "@next/font/google";
import StockButton from "./StockButton";

const asap = Asap({ weight: "500", style: "normal", subsets: ["latin"] });

const List = ({ items, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsState, setItemsState] = useState(items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const filterItems = (rawItems) => {
    if (rawItems === []) return [];
    return rawItems.filter((item) =>
      item.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const deleteItem = (id) => {
    let tempItems = [];
    tempItems = itemsState.filter((item) => item.id !== id);
    setItemsState(tempItems);
    localStorage.setItem(`${user}-todos`, JSON.stringify(tempItems));
  };

  const createNewItem = () => {
    const newItem = {
      id: uniqid(),
      text: "",
      edit: true,
    };
    setSearchTerm("");
    localStorage.setItem(`${user}-todos`, JSON.stringify([newItem, ...itemsState]));
    setItemsState((current) => {
      return [newItem, ...current];
    });
  };

  const saveItem = (editedItem) => {
    let tempItems = [];
    tempItems = itemsState.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setItemsState(tempItems);
    localStorage.setItem(`${user}-todos`, JSON.stringify(tempItems));
  };

  return (
    <div className={styles.listContainer}>
      <h1 className={`${styles.headerText} ${asap.className}`} >My To-do List</h1>
      <div className={styles.listHeader}>
        <div className={styles.inputContainer}>
          <Icon icon="ci:search" className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <StockButton onClick={createNewItem}>
          New <Icon icon="el:file-new" />
        </StockButton>
      </div>
      {itemsState
        ? filterItems(itemsState).map((todoItem) => (
            <ListItem
              edit={todoItem?.edit}
              key={todoItem.id}
              {...{ todoItem, deleteItem, saveItem }}
            />
          ))
        : null}
    </div>
  );
};

const ListItem = ({ todoItem, edit, deleteItem, saveItem }) => {
  const [editMode, setEditMode] = useState(edit ?? false);
  const [textContent, setTextContent] = useState(todoItem.text);

  const handleChange = (e) => {
    setTextContent(e.target.value);
  };

  const handleSave = () => {
    setEditMode(false);
    saveItem({ text: textContent, edit: false, id: todoItem.id });
  };

  return (
    <div className={`${styles.todoItem} ${asap.className}`}>
      {editMode ? (
        <input type="text" value={textContent} onChange={handleChange} className={`${styles.editInput} ${asap.className}`} />
      ) : (
        <div>{textContent}</div>
      )}
      <div className={styles.buttonContainer}>
        {editMode ? (
          <StockButton onClick={handleSave}>
            <Icon icon="entypo:save" />
          </StockButton>
        ) : (
          <>
            <StockButton onClick={() => setEditMode(true)}>
              <Icon icon="bi:pencil-square" />
            </StockButton>
            <StockButton onClick={() => deleteItem(todoItem.id)}>
              <Icon icon="entypo:trash" />
            </StockButton>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
