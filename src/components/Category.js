const Category = ({ category, addToCart }) => {
  return (
    <section>
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal, num) => {
          return (
            <article
              key={meal.id}
              onClick={() => {
                addToCart(meal);
              }}
            >
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <p>{meal.price} €</p>
              {meal.popular && <p className="popular">Popular</p>}
              <img src={meal.picture} alt="Meal" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
