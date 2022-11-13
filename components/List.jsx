import styles from "../styles/List.module.css";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { Icon } from "@iconify/react";
import { Asap } from "@next/font/google";
import StockButton from "./StockButton";

const asap = Asap({ weight: "500", style: "normal", subsets: ["latin"] });

const List = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsState, setItemsState] = useState(items)

  const filterItems = rawItems => {
    if(rawItems === []) return []
    return rawItems.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const deleteItem = id => {
    let tempItems = []
    tempItems = items.filter(item => item.id !== id)
    localStorage.setItem('todos',tempItems)
  }

  const createNewItem = () => {
    console.log(items)
    localStorage.setItem('todos',JSON.stringify([{
      id: uniqid(),
      text: "",
      edit: true
    }]))
  }

  const saveItem = ({item}) => {
    
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <div className={styles.inputContainer}>
          <Icon icon="ci:search" className={styles.searchIcon} />
        <input className={styles.searchInput} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <StockButton onClick={createNewItem}>New <Icon icon="el:file-new" /></StockButton>
      </div>
      {items ? filterItems(items).map((todoItem) => (
        <ListItem edit={todoItem?.edit} key={todoItem.id} {...{ todoItem, deleteItem }} />
      )) : null}
    </div>
  );
};

const ListItem = ({ todoItem, edit, deleteItem }) => {
  const [editMode, setEditMode] = useState(edit ?? false);
  const [textContent, setTextContent] = useState(todoItem.text);

  const handleChange = (e) => {
    setTextContent(e.target.value);
  };

  return (
    <div className={`${styles.todoItem} ${asap.className}`}>
      {editMode ? (
        <input type="text" value={textContent} onChange={handleChange} />
      ) : (
        <div>{textContent}</div>
      )}
      <div className={styles.buttonContainer}>
        {editMode ? (
          <StockButton onClick={() => setEditMode(false)}>
            <Icon icon="entypo:save"/>
          </StockButton>
        ) : (
          <>
            <StockButton onClick={() => setEditMode(true)}>
              <Icon icon="bi:pencil-square"/>
            </StockButton>
            <StockButton onClick={() => deleteItem(todoItem.id)}>
              <Icon icon="entypo:trash"/>
            </StockButton>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
