// Função que vai buscar o cep ou a rua conforme o tipo passado na função
function buscaCep(tipo) {
	$('.progress').show()
	console.log('tipo: ', tipo)
	validCep(tipo)

	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			if (tipo == "cep") {
				let li = ""
				li += `<li class="collection-item adjust-list item-top"><i class="material-icons">streetview</i> ${data.logradouro}</li>`
				li += `<li class="collection-item adjust-list item-middle"><i class="material-icons">location_on</i> ${data.bairro}</li>`
				li += `<li class="collection-item adjust-list item-bottom"><i class="material-icons">location_city</i> ${data.localidade}</li>`
				setTimeout(() => {
					$('.progress').hide()
					$("#resultado").html(li)
				}, 1000)
			} else {
				let lis = ""
				for (let rua of data) {
					lis += `<li class="collection-item adjust-list item-top"><i class="material-icons">thumb_up</i> ${rua.cep}</li>`
					lis += `<li class="collection-item adjust-list item-middle"><i class="material-icons">streetview</i> ${rua.logradouro}</li>`
					lis += `<li class="collection-item adjust-list item-middle"><i class="material-icons">location_on</i> ${rua.bairro}</li>`
					lis += `<li class="collection-item adjust-list item-bottom"><i class="material-icons">location_city</i> ${rua.localidade}</li>`
					lis += `<li><span style="width: 100%;display: flex;justify-content: center;">● ● ●</span></li>`
				}
				setTimeout(() => {
					$('.progress').hide()
					$("#resultado").html(lis) // JQUERY
				}, 1000)
			}
		})
}
