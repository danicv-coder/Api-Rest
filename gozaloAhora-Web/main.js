

const stringToHtml = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s,`text/html`)
    return doc.body.firstChild
}
const renderItem = (item) => {
   const element = stringToHtml(`<li data-id="${item._id}">${item.name}</<li>`)
   element.addEventListener('click', () => {
       const mealsList = document.getElementById('meals-list')
       Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
       element.classList.add('selected')
       const mealsIdeinput = document.getElementById('meals-id')
       mealsIdeinput.value = item._id
   })
   return element
}

const renderOrder = (order, meals) => {
    const meal = meals.find(meal => meal._id === order.meal_id)// "find" sirve para buscar elementos en un arreglo
    const element = stringToHtml(`<li data-id="${order._id}">${meal.name} - ${order.user_id}</<li>`)
    return element
    
}

window.onload = () => {
    const orderForm = document.getElementById('order')
    orderForm.onsubmit = (e) => {
        e.preventDefault()
        const mealsId = document.getElementById('meals-id')
        const mealIdvalue = mealsId.value
        if(!mealIdvalue){
            alert("Disculpe! Debe seleccionar un Plato...")
            return
        }

        const order = {
            meal_id: mealIdvalue,
            user_id: 'Daniel Calderon',
        }

        fetch('https://serverless-three-eosin.now.sh/api/orders', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(order)

        }).then(x => console.log(x))
    }

    fetch('https://serverless-three-eosin.now.sh/api/meals')
    .then(response => response.json())
    .then(data => {
        const mealsList = document.getElementById('meals-list')
        const submit = document.getElementById('submit');
        const listItems = data.map(renderItem)
        listItems.forEach(element => mealsList.appendChild(element))
        mealsList.removeChild(mealsList.firstElementChild)
        submit.removeAttribute('disabled')// "removeAttribute" me permite selecionar un atributo de un elemento html y eliminarlo
    })//El "método map"() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos."join()" une todos los elementos de un array formando una cadena y separándolos con aquel argumento que definamos.
    fetch('https://serverless-three-eosin.now.sh/api/orders')
    .then(response => response.json())
    .then(ordersData => {
        const orderslist = document.getElementById('orders-list')
        const listOrders = ordersData.map(ordersData => renderOrder(ordersData, data))
        orderslist.removeChild(orderslist.firstElementChild)
        listOrders.forEach(element => orderslist.appendChild(element))
        console.log(ordersData);
    })

    
}