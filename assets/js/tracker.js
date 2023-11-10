function getItems() {
  return JSON.parse(localStorage.getItem("items")) || []
}

function setItems(items) {
  localStorage.setItem("items", JSON.stringify(items))
}

function renderItems() {
  const items = getItems()

  const list = document.getElementById("history")

  list.innerHTML = ""

  items.forEach((item) => {
    const li = document.createElement("li")

    const type = item.amount > 0 ? "income" : "expense"

    li.setAttribute("class", `history__item history__item--${type}`)

    li.innerHTML = `
      <span>${item.name}</span>
      <span>${item.amount}</span>
    `
    list.appendChild(li)
  })
}

/**
 * @param {Event} e
 */
function onSubmit(e) {
  e.preventDefault()

  const formFields = e.target.elements

  const name = formFields.name.value
  const amount = formFields.amount.value

  if (Number(amount) === 0) {
    alert("Amount cannot be empty")
    form.reset()
    return
  }

  const data = {
    name,
    amount,
  }

  const items = getItems()

  items.push(data)

  setItems(items)

  renderItems()
  form.reset()
}

// render initial items from existing data
renderItems()

const form = document.getElementById("form")
form.addEventListener("submit", onSubmit)
