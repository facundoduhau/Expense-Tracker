document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM fully loaded and parsed');
	const name = document.getElementById('name');
	const price = document.getElementById('price');
	const list = document.getElementById('list');
	const addButton = document.getElementById('addButton');
	const totalPrice = document.getElementById('totalPrice');
var total = 0;
	var expenses = [];

	//	var total = sumTotal();

	addButton.addEventListener('click', (e) => {
		if (name.value !== '' && price.value !== '' && !isNaN(price.value) && expenses.length < 8) {
			e.preventDefault();
			const expenseName = name.value.trim();
			const expensePrice = parseFloat(price.value.trim());

			const addedExpense = {
				id: Date.now(),
				name: expenseName,
				price: expensePrice
			};
			expenses.push(addedExpense);
			const listItem = document.createElement('li');
			listItem.textContent = `${addedExpense.name}: $${addedExpense.price.toFixed(2)}`;
			listItem.classList.add('p-2')
			listItem.classList.add('list-none')
			listItem.classList.add('text-4xl')
			list.appendChild(listItem);
			name.value = '';
			price.value = '';
			saveListToLocalStorage();
			sumTotal();
		}
	});
	function sumTotal() {
		total = expenses.reduce((acc, expense) => acc + expense.price, 0);
		totalPrice.textContent = `Total: $${total.toFixed(2)}`;
		return total;
	}


	function saveListToLocalStorage() {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}
})
