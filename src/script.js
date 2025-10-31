document.addEventListener('DOMContentLoaded', () => {
	const name = document.getElementById('name');
	const price = document.getElementById('price');
	const list = document.getElementById('list');
	const addButton = document.getElementById('addButton');
	const totalPrice = document.getElementById('totalPrice');
	let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

	function renderExpenses() {
		list.innerHTML = '';
		expenses.forEach(exp => {
			const listItem = document.createElement('li');
			listItem.textContent = `${exp.name}: $${exp.price.toFixed(2)}`;
			listItem.classList.add('flex', 'items-center', 'justify-center', 'p-2', 'list-none', 'text-4xl');

			const deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';
			deleteButton.classList.add('ml-5', 'border-2', 'border-white', 'px-3', 'py-1', 'rounded', 'cursor-pointer');
			deleteButton.addEventListener('click', () => {
				expenses = expenses.filter(e => e.id !== exp.id);
				saveListToLocalStorage();
				renderExpenses();
				sumTotal();
			});

			listItem.appendChild(deleteButton);
			list.appendChild(listItem);
		});
	}

	function saveListToLocalStorage() {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}

	function sumTotal() {
		const total = expenses.reduce((acc, expense) => acc + expense.price, 0);
		totalPrice.textContent = `Total: $${total.toFixed(2)}`;
	}

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
			saveListToLocalStorage();
			renderExpenses();
			sumTotal();

			name.value = '';
			price.value = '';
		}
	});

	renderExpenses();
	sumTotal();
});

