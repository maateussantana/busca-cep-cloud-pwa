// Inicializando javascript do materialize
$(document).ready(function(){
	$('.tabs').tabs();
	$('.modal').modal();
	$('.sidenav').sidenav();
});


let url = "" // Declarando variavel que vai armazenar a URL montada

// Função que vai buscar o cep ou a rua conforme o tipo passado na função
function buscaCep(tipo) {
	console.log('tipo: ', tipo)
	if(tipo == "cep"){
		const cep = $('#cep').val()
		url = `https://viacep.com.br/ws/${cep}/json/`;
	}else{
		const uf = $('#uf').val() // USANDO JQUERY $ PARA PEGAR VALOR DA UF
		const cidade = $('#cidade').val() // USANDO JQUERY $ PARA PEGAR VALOR DA CIDADE
		const rua = $('#rua').val() // JS PURO VANILLA PEGAR RUA
		url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`
	}

	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			if(tipo == "cep"){
				let li = ""
				li += `<li class="collection-item">CEP: ${data.cep}</li>`
				li += `<li class="collection-item">Logradouro: ${data.logradouro}</li>`
				li += `<li class="collection-item">Bairro: ${data.bairro}</li>`
				li += `<li class="collection-item">Localidade: ${data.localidade}</li>`
			$("#resultado").html(li)
			}else{
				let lis = ""
				for(let rua of data){
					lis += `<li class="collection-item">${rua.logradouro}</li>`
					lis += `<li class="collection-item">${rua.bairro}</li>`
					lis += `<li class="collection-item">${rua.localidade}</li>`
					lis +='<br>'
					lis += '<hr>'
				}
			$("#resultado").html(lis) // JQUERY
			document.getElementById("resultado").innerHTML = lis // JS PURO VANILLA
			}

			
		})
}


document.querySelector("#form-cep").addEventListener("submit", (e) => {
	e.preventDefault()
	console.log('submit',e.target)
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	alert(JSON.stringify(data));
})

document.querySelector("#form-rua").addEventListener("submit", (e) => {
	e.preventDefault()
	console.log('submit',e.target)
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	alert(JSON.stringify(data));
})