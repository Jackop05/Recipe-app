import { useState, useEffect } from 'react';



function App() {
  const [ search, setSearch ] = useState('');
  const [ recipes, setRecipes ] = useState([]);
  const [ recipeIndex, setRecipeIndex ] = useState(null);

  const getIngredientsList = (data) => {
    let array = [];
    for(let i = 1; i < 20; i++){
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if(ingredient){
        array.push([ingredient, measure]);
      } else {
        break;
      }
    }
    return array;
  }

  const handleInput = (e) => {
    setSearch(e.target.value);

  }

  const handleInputClick = async () => {
    try {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      const response = await data.json();
      
      let newArray = response.meals.map((element, index) => {
        if(index > 10){
          
        }
        return ({
          id: element.idMeal,
          name: element.strMeal,
          area: element.strArea,
          recipeDescription: element.strInstructions,
          ingredientsList: getIngredientsList(element),
          image: element.strMealThumb,
        })
      })

      setRecipes(newArray);

      window.scrollTo({top: document.getElementById('recipes').offsetTop, behavior: 'smooth'})
      
    } catch(error) {
      console.log(error);
    }
  }

  const handleRecipeClick = (index) => {
    setRecipeIndex(index);
  }

  useEffect(() => {
    if (recipeIndex !== null) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [recipeIndex]);

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="fixed w-screen flex flex-col sm:flex-row sm:text-left text-center justify-between bg-white px-10 py-8 items-center z-50">
          <div className="sm:text-4xl text-2xl sm:mb-0 mb-4 font-bold text-gray-700">Recipe App</div>

          <div className="flex justify-center gap-2">
            <input 
              type="text" 
              placeholder="Write ingriedient..." 
              className="border-2 border-gray-700 px-4 py-2 rounded-[30px] font-semibold text-gray-700 min-w-[180px]" 
              value={search}
              onChange={handleInput}   
            />
            <button onClick={handleInputClick} className="sm:text-2xl text-xl border-2 font-bold rounded-[30px] px-4 py-2 transition-all text-gray-700 hover:border-gray-700 hover:scale-105 hover:bg-blue-200">Search</button>
          </div>
        </div>


        <div className="bg-cover bg-[url('/images/background-small.webp')] w-screen h-screen flex flex-col justify-center text-center px-10">
          <h1 className="sm:text-7xl text-3xl sm:mt-0 mt-20 text-[43px] font-bold sm:text-gray-700 text-black max-w-[500px] mx-auto text-shadow-white">Find a perfect recipe for you!</h1>
          <div className="mt-12 text-2xl sm:text-gray-700 text-black font-bold max-w-[850px] mx-auto text-shadow-white">Search for a recipe in less than a second! Type one word in search box and enjoy many tasty recipes. Choose one that looks the best for you and let's see how to cook it.</div>
        </div>

        <div id="recipes" className="w-screen min-h-screen flex flex-wrap flex-3 gap-16 justify-center sm:p-40 p-4 bg-gray-100 text-gray-700  pt-[200px]">
          {recipes[0] == null &&
            <div className='sm:text-7xl text-4xl text-center font-semibold text-gray-900 flex flex-col justify-center'>Choose your dish first</div>
          }
          {recipes.map((recipe, index) => {
            if(index > 10){
              return;
            } else {
              return (
                <div className="border-2 border-black rounded-3xl overflow-hidden w-[300px] max-h-[550px] bg-white transition-all hover:scale-105">
                  <img src={recipe.image} alt="food" className="h-[300px]" />
                  <div className="flex flex-col justify-center text-center mt-10 ">
                    <div className="text-3xl font-semibold text-gray-900">{recipe.name}</div>
                    <div className="mt-4 text-xl font-semibold">{recipe.area}</div>
                    <button onClick={() => handleRecipeClick(index)} className="mt-8 mb-[40px] bg-blue-300 px-4 py-2 rounded-3xl text-gray-800 text-xl font-semibold mx-auto transition-all hover:scale-105 hover:bg-blue-400">Show Recipe</button>
                  </div>
                </div>
              )
            }
          })}
        </div>

        {recipeIndex !== null &&
          <div className='fixed top-0 left-0 w-screen h-screen bg-white opacity-50 z-10' />
        }

        {recipeIndex !== null &&
          <div className='fixed sm:top-[25%] sm:left-[25%] sm:w-[50%] sm:h-[50%] top-[25%] left-[10%] w-[80%] h-[50%] bg-blue-200 p-12 rounded-[40px] overflow-x-hidden z-20'>
            <div className='sm:text-4xl text-2xl text-gray-700 font-bold mb-6'>Ingredients:</div>
            {recipes[recipeIndex].ingredientsList.map((ingredient) => {
              return (
                <div className='sm:text-3xl text-xl text-gray-700 font-semibold mb-[3px]'>{ingredient[0]} ~ {ingredient[1]}</div>
              )
            })}
            <div className='mt-6 sm:text-xl text-lg text-gray-700 font-semibold'>{recipes[recipeIndex].recipeDescription}</div>
            <button onClick={() => {setRecipeIndex(null)}} className='mt-10 text-xl px-6 py-4 bg-gray-700 text-white rounded-3xl transition-all hover:scale-105'>Close</button>
          </div>
        }


      </div>
    </>
  )
}

export default App
