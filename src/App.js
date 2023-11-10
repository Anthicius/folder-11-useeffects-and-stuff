import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  cart : {items:[]},
  total:0,
  totalPrice:0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        cart: { 
          items: [...state.cart.items, {name: action.name, price: action.price, id: action.id}] 
        },
        total: state.total+1,
        totalPrice: state.totalPrice+action.price
      };
    case "DELETE":
      const deletedItem = state.cart.items.find((item)=> item.name === action.name)
      return {
        cart : {
          items: state.cart.items.filter((item)=> item.name !== action.name)
        },
        total: state.total- (deletedItem? 1 : 0),
        totalPrice: state.totalPrice-action.price
      }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addHandler = (id,name, price) => {
    dispatch({ type: "ADD", id: id, name: name, price: price });
  };
  

  const deleteHandler = ( name, price) => {
    dispatch({ type: "DELETE", name: name, price:price});
  };


  const shoppingItems = {
    cart : {items:[{ name: "Cereal", price: 15.99, id: 1 },
    { name: "Milk", price: 2.99, id: 2 },
    { name: "Eggs", price: 4.49, id: 3 },
    { name: "Bread", price: 3.99, id: 4 },
    { name: "Cheese", price: 7.99, id: 5 },
    { name: "Chicken", price: 12.99, id: 6 },
    { name: "Rice", price: 8.49, id: 7 },
    { name: "Pasta", price: 2.29, id: 8 },
    { name: "Tomatoes", price: 5.99, id: 9 },
    { name: "Bananas", price: 1.99, id: 10 },
    { name: "Apples", price: 4.99, id: 11 },
    { name: "Coffee", price: 9.99, id: 12 },
    { name: "Orange Juice", price: 3.49, id: 13 },
    { name: "Potatoes", price: 6.99, id: 14 },
    { name: "Onions", price: 2.79, id: 15 },]},
    total:0,
    totalPrice:0
  };


  return (
    <div className="App">
      <ul>
        {shoppingItems.cart.items.map((item) => (
          <li>
            <h4>{"ID: " + item.id}</h4>
            <p>{item.name + " " + item.price + "$"}</p>
            <button
              onClick={() => {
                addHandler(item.id, item.name, item.price);
              }}
            >
              ADD
            </button>
          </li>
        ))}
      </ul>
      <h2>Your Items cart</h2>
      <ul>
        {console.log(state)}
        {state.cart.items.length > 0 ? (
          state.cart.items.map((item) => (
            <li>
              <h4>{"ID: " + item.id}</h4>
              <p>{item.name + " " + item.price + "$"}</p>
              <button
                onClick={() => {
                  deleteHandler(item.name, item.price);
                }}
              >
                REMOVE
              </button>
            </li>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </ul>
      <h5>Your total Items: {state.total}</h5>
      <h5>Your total Items Price: {state.totalPrice}</h5>
    </div>
  );
}

export default App;
