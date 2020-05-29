const stringToHtml = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s,`text/html`)
    return doc.body.firstChild
    console.log(doc);
}
const renderItem = (item) => {
   const element = stringToHtml(`<li data-id="${item._id}">${item.name}</<li>`)
   return element
}

window.onload = () => {
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
    
}