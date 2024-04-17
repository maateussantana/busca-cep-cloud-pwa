// Inicializando javascript do materialize
$(document).ready(function() {
	$('.tabs').tabs();
	$('.modal').modal();
	$('.sidenav').sidenav();
	$('.progress').hide()
});

// Aplicando mascara
$('#cep').inputmask("99999-999");

let url = "" // Declarando variavel que vai armazenar a URL montada

// Função que vai buscar o cep ou a rua conforme o tipo passado na função
function buscaCep(tipo) {
	$('.progress').show()
	console.log('tipo: ', tipo)
	if (tipo == "cep") {
		const cep = $('#cep').val()
		let log = {
			date: getDate(),
			log: cep
		}
		saveLog(log)
		url = `https://viacep.com.br/ws/${cep}/json/`;
	} else {
		const siglaUf = $('#ufs-list').val() // USANDO JQUERY $ PARA PEGAR SIGLA DA UF
		const nomeUf = $("input.select-dropdown").val() // USANDO JQUERY $ PARA PEGAR NOME DA UF
		const cidade = $('#cidades-list').val() // USANDO JQUERY $ PARA PEGAR VALOR DA CIDADE
		const rua = $('#rua').val() // JS PURO VANILLA PEGAR RUA

		let log = {
			date: getDate(),
			log: nomeUf + '-' + siglaUf + '-' + cidade + '-' + rua,
		}
		saveLog(log)
		url = `https://viacep.com.br/ws/${siglaUf}/${cidade}/${rua}/json/`
	}

	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			if (tipo == "cep") {
				let li = ""
				li += `<li class="collection-item adjust-list"><i class="material-icons">streetview</i> ${data.logradouro}</li>`
				li += `<li class="collection-item adjust-list"><i class="material-icons">location_on</i> ${data.bairro}</li>`
				li += `<li class="collection-item adjust-list"><i class="material-icons">location_city</i> ${data.localidade}</li>`
				setTimeout(() => {
					$('.progress').hide()
					$("#resultado").html(li)
				}, 1000)
			} else {
				let lis = ""
				for (let rua of data) {
					lis += `<li class="collection-item adjust-list"><i class="material-icons">thumb_up</i> ${rua.cep}</li>`
					lis += `<li class="collection-item adjust-list"><i class="material-icons">streetview</i> ${rua.logradouro}</li>`
					lis += `<li class="collection-item adjust-list"><i class="material-icons">location_on</i> ${rua.bairro}</li>`
					lis += `<li class="collection-item adjust-list"><i class="material-icons">location_city</i> ${rua.localidade}</li>`
					lis += `<li><span style="width: 100%;display: flex;justify-content: center;">● ● ●</span></li>`
				}
				setTimeout(() => {
					$('.progress').hide()
					$("#resultado").html(lis) // JQUERY
				}, 1000)
			}
		})
}

function saveLog(log) {
	let logs = JSON.parse(localStorage.getItem('logs'))
	if (logs == null) {
		logs = []
	}
	logs.push(log)
	localStorage.setItem('logs', JSON.stringify(logs))
}

function mountLog() {
	let logs = JSON.parse(localStorage.getItem('logs'))
	let logsList = ""
	for (let log of logs) {
		logsList += `<li class="collection-item item-log">${log.date} buscou ${log.log}<a href="#"><i style="color:#ee6e73" onclick="logLoad('${log.log.split('buscou ')}')" class="material-icons">visibility</i></a></li>`
	}
	$("#resultado").html(logsList)
}

function getDate() {
	const dataAtual = new Date();
	const options = {
		weekday: 'short',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	const dataFormatada = dataAtual.toLocaleString('pt-BR', options);
	return dataFormatada
}

function logLoad(log) {
	const logs = log.split("-")
	if (logs.length > 2) {
		console.log('tem', logs[0])
		setTimeout(() => {
			$($("div.select-wrapper ul")[0]).find("li").each(function() {
						var spanText = $(this).find("span").text();
						if (spanText == logs[0]) {
								$(this).click();
								return false; // Para sair do loop após o clique
						}
				});
				$('#rua').val(logs[3]); // Define o valor do campo de entrada 'rua'
		}, 300);

		setTimeout(() => {
			document
				.querySelectorAll("div.select-wrapper")[1]
				.querySelector("ul")
				.querySelectorAll("li").forEach((a) => {
					if (a.querySelector("span").innerText == logs[2]) {
						$(a).click()
						buscaCep('rua')
					}
				})
		}, 400)
		$('ul.tabs > li > a')[1].click()
	} else {
		setTimeout(() => {
			$('#cep').val(log)
			buscaCep('cep')
		}, 200)
		console.log('não tem', log)

		$('ul.tabs > li > a')[0].click()
	}
}


document.querySelector("#form-cep").addEventListener("submit", (e) => {
	e.preventDefault()
	console.log('submit', e.target)
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	// alert(JSON.stringify(data));
})

document.querySelector("#form-rua").addEventListener("submit", (e) => {
	e.preventDefault()
	console.log('submit', e.target)
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	// alert(JSON.stringify(data));
})

async function pegarUfs() {
	await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
		.then((res) => { return res.json() })
		.then((ufs) => {
			console.log(ufs)
			let ufList = $("#ufs-list") // peguei o select pra inserir options
			let ufOptions = '<option value="0" disabled selected>Escolha um estado</option>'
			// ler todos estados
			for (let uf of ufs) {
				ufOptions += `<option value="${uf.sigla}">${uf.nome}</option>`
			}

			ufList.html(ufOptions)
			$('select').formSelect();
		})
}

function pegarCidades() {
	let uf = $("#ufs-list").val()
	console.log("uf aqui", uf)
	getCidades(uf)
}

function getCidades(uf) {
	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios")
		.then((res) => { return res.json() })
		.then((cidades) => {
			console.log(cidades)
			let cidadesList = $("#cidades-list") // peguei o select pra inserir options
			let cidadesOptions = '<option value="0" disabled selected>Escolha uma cidade</option>'
			// ler todos estados
			for (let cidade of cidades) {
				cidadesOptions += `<option value="${cidade.nome}">${cidade.nome}</option>`
			}

			cidadesList.html(cidadesOptions)
			$('select').formSelect();
		})
}

function clearTab() {
	console.log("limpando")
	$("#resultado").html("")
	$("#cep").val('')

	pegarUfs()
	$("#cidades-list").html('')
	$("#rua").val('')
}

pegarUfs()


