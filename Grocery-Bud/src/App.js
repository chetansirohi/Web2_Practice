import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

//using local storage so as to prevent the list from refreshing and maintain previous items
//want the values as a string
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    // if we are submitting without entering a value 
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
      // if the name exist and we want to edit the value
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          // find the item's id to be edited 
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
      // entering a value and submitting
    } else {
      showAlert(true, 'success', 'item added to the list');
      //invoke the unique id
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };
  //alert format for differnet scenarios
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  //clear all the items form the list 
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  //remove particular item from the list
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  //edit the particular selected item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  //side effect when any change is made to the list,store in localstorage the mentioned key's value
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* invoke the alert according to the criteria */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {/* conditional rendering based on what type of function be performed */}
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
