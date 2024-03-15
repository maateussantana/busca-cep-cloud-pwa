
function buscaCep() {
	const cep = document.getElementById('cep').value
	const url = `https://viacep.com.br/ws/${cep}/json/`;
	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			document.getElementById('logradouro').value = data.logradouro;

			document.getElementById('bairro').value = data.bairro;
		})
}


document.querySelector("button").addEventListener("mouseout", (e) => {
	console.log('passei',e)
})

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault()
	console.log('submit',e.target)
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	alert(JSON.stringify(data));
})