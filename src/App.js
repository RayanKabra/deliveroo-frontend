import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./components/Category";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-9d14ec950a74.herokuapp.com/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  let total = 0;

  const addToCart = (meal) => {
    const newCart = [...cart];

    const mealExists = newCart.find((elem) => elem.id === meal.id);
    if (mealExists) {
      mealExists.quantity++;
    } else {
      const newMeal = { ...meal, quantity: 1 };
      newCart.push(newMeal);
    }
    setCart(newCart);
  };

  const removeFromCart = (meal) => {
    const newCart = [...cart];
    const mealInTab = newCart.find((elem) => elem.id === meal.id);
    if (mealInTab.quantity === 1) {
      const index = newCart.indexOf(mealInTab);
      newCart.splice(index, 1);
    } else {
      mealInTab.quantity--;
    }
    setCart(newCart);
  };

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div className="App">
      <div className="hero">
        <div className="container hero-container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="Meal" />
        </div>
      </div>
      <main className="container">
        <div className="main-left">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  category={category}
                  key={index}
                  addToCart={addToCart}
                />
              )
            );
          })}
        </div>
        <div className="main-right">
          {" "}
          {/* {partie de droite correspondant au panier} */}
          {cart.map((meal, index) => {
            total += meal.price * meal.quantity;
            return (
              <div key={meal.id}>
                <button
                  onClick={() => {
                    removeFromCart(meal);
                  }}
                >
                  -
                </button>
                <span>{meal.quantity}</span>
                <button
                  onClick={() => {
                    addToCart(meal);
                  }}
                >
                  +
                </button>
                <span>{meal.title}</span>
                <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
              </div>
            );
          })}
          <p>Total : {total.toFixed(2)}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
