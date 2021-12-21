//Get main and buttons
const main = document.querySelector("#main");
const addUser = document.querySelector("#add-user");
const double = document.querySelector("#double");
const showMillionaries = document.querySelector("#show-millionaries");
const sort = document.querySelector("#sort");
const calculateWealth = document.querySelector("#calculate-wealth");

let data = [];

//Fetch Info
async function getRandomUser() {
	let res = await fetch("https://randomuser.me/api");
	let data = await res.json();
	let user = data.results[0];
	const newUser = {
		user: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
}

function addData(obj) {
	data.push(obj);
	updateDOM();
}

//Events
function doubleMoney() {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});
	updateDOM();
}

function showOnlyMillionaries() {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
}

function sortByRichest() {
	data = data.sort((a, b) => b.money - a.money);
	updateDOM();
}

function calculateTotalWealth() {
	const wealth = data.reduce((acc, user) => acc + user.money, 0);
	const wealthEl = document.createElement("div");
	wealthEl.classList.add("wealth");
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
		wealth
	)}</strong></h3>`;
	main.appendChild(wealthEl);
}

//UpdateDOM
function updateDOM(data2 = data) {
	main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
	data2.forEach((user) => {
		const element = document.createElement("div");
		element.classList.add("person");
		element.innerHTML = `<strong>${user.user}</strong> ${formatMoney(
			user.money
		)}`;
		main.appendChild(element);
	});
}

function formatMoney(number) {
	return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

getRandomUser();
getRandomUser();
getRandomUser();

//Event Listeners
addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
showMillionaries.addEventListener("click", showOnlyMillionaries);
sort.addEventListener("click", sortByRichest);
calculateWealth.addEventListener("click", calculateTotalWealth);
