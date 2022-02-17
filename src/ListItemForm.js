import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  // you'll need to track the name and quantity in state
  const [formName, setFormName] = useState('');
  const [formQty, setFormQty] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    // make a new list item in supabase using the form values stored in state
    const newItem = {
      name: formName,
      quantity: formQty,
      has_been_bought: false
    };
    await createListItem(newItem);
    // refetch the items using the handler function passed down as a prop
    await fetchItems();
    // clear the name and quantity in state to refresh the form
    setFormName('');
    setFormQty('');
  }

  return (
    <div className='new-item-form-container'>
      {/* on submit, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
          I need . . . 
        <label>
            Quantity
          {/* on change, update the quantity in state */}
          <input 
            // this should be a controlled input, soi set the value based on state
            required 
            type="number" 
            name="quantity"
            value={formQty}
            onChange={e => setFormQty(e.target.value)}
          />
        </label>
        <label>
            Name
          {/* on change, update the name in state */}
          <input
            // this should be a controlled input, soi set the value based on state 
            required 
            name="name"
            value={formName}
            onChange={e => setFormName(e.target.value)} />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
