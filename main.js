const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const All = 'filter.php?c=Cocktail'

let form, input, output;
output = document.getElementById('output')
input = document.getElementById('input')
form = document.getElementById('form')


const getAllCocktails = async () => {
    const req = await fetch(API + All)
    const res = await req.json()
    output.innerHTML = ''
    renderAllCocktails(res.drinks)
}

const searchCocktailsByName = async () => {
    const req = await fetch(API + 'search.php?s=' + input.value)
    const res = await req.json()
    output.innerHTML = ''
    renderAllCocktails(res.drinks)
}

const renderAllCocktails = (data) => {
    data.forEach(el => {
        let box = document.createElement('div')
        box.className = 'box'
        let title = document.createElement('h4')
        let image = document.createElement('img')
        image.className = 'image'
        title.innerHTML = el.strDrink
        image.src = el.strDrinkThumb
        output.append(box)
        box.append(image, title,)
        box.addEventListener('click', () => {
            searchById(el.idDrink)
        })
    });
}

const searchById = async (id) => {
    const req = await fetch(API + 'lookup.php?i=' + id)
    const res = await req.json()
    output.innerHTML = ''
    console.log(res.drinks)
    renderById(res.drinks)
}
const renderById = (ing) => {
    let name = document.createElement('p')
    let img = document.createElement('img')
    img.className = 'img'
    let category = document.createElement('p')
    let alco = document.createElement('p')
    let ing1 = document.createElement('p')
    let ing2 = document.createElement('p')
    let ing3 = document.createElement('p')
    let ing4 = document.createElement('p')

    name.innerHTML = ing[0].strDrink
    category.innerHTML = ing[0].strCategory
    alco.innerHTML = ing[0].strAlcoholic
    ing1.innerHTML = ing[0].strIngredient1
    ing2.innerHTML = ing[0].strIngredient2
    ing3.innerHTML = ing[0].strIngredient3
    ing4.innerHTML = ing[0].strIngredient4
    img.src = ing[0].strDrinkThumb
    let box = document.createElement('div')
    box.className = 'box__1'
    output.append(box)

    box.append(img, name, category, alco, ing1, ing2, ing3, ing4, btn_alt)

    ing1.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient1)
    })
    ing2.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient2)
    })
    ing3.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient3)
    })
    ing4.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient4)
    })

}

const btn_alt = document.createElement('button')
btn_alt.className = 'btn_alt'
btn_alt.innerHTML = 'Назад'
btn_alt.addEventListener('click', () => {
    output.innerHTML = ''
    getAllCocktails()
})



const searchIngredient = async (name) => {
    const req = await fetch(API + 'search.php?i=' + name)
    const res = await req.json()
    output.innerHTML = ''
    renderIngredient(res.ingredients)
}
const renderIngredient = (detail) => {
    let abv, alco, type, description
    abv = document.createElement('p')
    alco = document.createElement('p')
    type = document.createElement('p')
    description = document.createElement('p')

    abv.innerHTML = detail[0].strABV
    alco.innerHTML = detail[0].strAlcohol
    type.innerHTML = detail[0].strIngredient
    description.innerHTML = detail[0].strDescription === null ? 'no description' : detail[0].strDescription

    let box = document.createElement('div')
    box.className='box__ing'
    output.append(box)
    box.append(abv, alco, type, description, btn_ing)

}
const btn_ing = document.createElement('button')
btn_ing.className = 'btn_ing'
btn_ing.innerHTML = 'Назад'
btn_ing.addEventListener('click', () => {
    output.innerHTML = ''
    getAllCocktails()
})





form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchCocktailsByName()
})
getAllCocktails()






