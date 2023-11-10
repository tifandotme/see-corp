function formatToIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(amount)
}

function getItems() {
  return JSON.parse(localStorage.getItem("history")) || []
}

function setItems(items) {
  localStorage.setItem("history", JSON.stringify(items))
}

function render() {
  const items = getItems()

  const historyEl = document.getElementById("history")

  historyEl.innerHTML = ""

  items.forEach((item) => {
    const li = document.createElement("li")

    const type = item.amount > 0 ? "income" : "expense"

    li.setAttribute("class", `history__item history__item--${type}`)

    li.innerHTML = `
      <span>${item.name}</span>
      <span>${item.amount}</span>
    `
    historyEl.appendChild(li)
  })

  const balance = items.reduce((acc, { amount }) => acc + Number(amount), 0)
  const income = items.reduce(
    (acc, { amount }) => (amount > 0 ? acc + Number(amount) : acc),
    0
  )
  const expense = items.reduce(
    (acc, { amount }) => (amount < 0 ? acc + Number(amount) : acc),
    0
  )

  const balanceEl = document.getElementById("balance")
  balanceEl.innerHTML = formatToIDR(balance)
  const incomeEl = document.getElementById("income")
  incomeEl.innerHTML = formatToIDR(income)
  const expenseEl = document.getElementById("expense")
  expenseEl.innerHTML = formatToIDR(expense)
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
    formEl.reset()
    return
  }

  const data = {
    name,
    amount,
  }

  const history = getItems()

  history.push(data)

  setItems(history)

  render()
  formEl.reset()
}

// render initial items from existing data
render()

const formEl = document.getElementById("form")
formEl.addEventListener("submit", onSubmit)
