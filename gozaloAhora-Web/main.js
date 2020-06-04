let mealState = [];
let ruta = "login"; // login, register, orders

const stringToHtml = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, `text/html`);
  return doc.body.firstChild;
};
const renderItem = (item) => {
  const element = stringToHtml(`<li data-id="${item._id}">${item.name}</li>`);
  element.addEventListener("click", () => {
    const mealsList = document.getElementById("meals-list");
    Array.from(mealsList.children).forEach((x) =>
      x.classList.remove("selected")
    );
    element.classList.add("selected");
    const mealsIdeinput = document.getElementById("meals-id");
    mealsIdeinput.value = item._id;
  });
  return element;
};

const renderOrder = (order, meals) => {
  const meal = meals.find((meal) => meal._id === order.meal_id);

  const element = stringToHtml(
    `<li data-id="${order._id}">${meal.name} - ${order.user_id}</li>`
  );

  return element;
};
const inicilizaForm = () => {
  const orderForm = document.getElementById("order");
  orderForm.onsubmit = (e) => {
    e.preventDefault();
    const submit = document.getElementById("submit");
    submit.setAttribute("disabled", true);
    const mealId = document.getElementById("meals-id");
    const mealIdValue = mealId.value;
    if (!mealIdValue) {
      alert("Disculpe! Debe seleccionar un Plato...");
      return;
    }

    const order = {
      meal_id: mealIdValue,
      user_id: "Daniel Calderon",
    };

    fetch("https://serverless-three-eosin.now.sh/api/orders", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((x) => x.json())
      .then((respuesta) => {
        const renderedOrder = renderOrder(respuesta, mealState);
        const ordersList = document.getElementById("orders-list");
        ordersList.appendChild(renderedOrder); //El método appendChild() inserta un nuevo nodo dentro de la estructura DOM de un documento, y es la segunda parte del proceso central uno-dos, crear-y-añadir
        submit.removeAttribute("disabled");
      });
  };
};
const inicilizaDatos = () => {
  fetch("https://serverless-three-eosin.now.sh/api/meals")
    .then((response) => response.json())
    .then((data) => {
      mealState = data;
      const mealsList = document.getElementById("meals-list");
      const submit = document.getElementById("submit");
      const listItems = data.map(renderItem);
      listItems.forEach((element) => mealsList.appendChild(element));
      mealsList.removeChild(mealsList.firstElementChild);
      submit.removeAttribute("disabled");
      // "removeAttribute" me permite selecionar un atributo de un elemento html y eliminarlo
      //El "método map"() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos."join()" une todos los elementos de un array formando una cadena y separándolos con aquel argumento que definamos.
      fetch("https://serverless-three-eosin.now.sh/api/orders")
        .then((response) => response.json())
        .then((orderData) => {
          const ordersList = document.getElementById("orders-list");

          const listOrders = orderData.map((orderData) =>
            renderOrder(orderData, data)
          );

          ordersList.removeChild(ordersList.firstElementChild);
          listOrders.forEach((element) => ordersList.appendChild(element));
        });
    });
};

const renderApp = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return renderOrders();
  }
  renderLogin();
};

const renderOrders = () => {
  const ordersView = document.getElementById("orders-view");
  document.getElementById("app").innerHTML = ordersView.innerHTML;
  inicilizaForm();
  inicilizaDatos();
};
const renderLogin = () => {
  const loginTemplate = document.getElementById("login-template");
  document.getElementById("app").innerHTML = loginTemplate.innerHTML;

  const loginForm = document.getElementById("login-form");
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://serverless-three-eosin.now.sh/api/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((x) => x.json())
      .then((respuesta) => {
        localStorage.setItem("token", respuesta.token);
        ruta = "orders";
        renderOrders();
      });
  };
};
window.onload = () => {
  renderApp();
};
