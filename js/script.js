// Aplicando mascara
$('#cep').inputmask("99999-999");

let url = "" // Declarando variavel que vai armazenar a URL montada

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
		logsList += `<li class="collection-item item-log">${log.date} <br>buscou ${log.log}<a href="#"><i style="color: #ee6e73;
    font-size: 33px;
    margin-left: -6px;
    margin-right: 2px;" onclick="logLoad('${log.log.split('buscou ')}')" class="material-icons">visibility</i></a></li>`
	}
	$("#resultado").html(logsList)
}

function getDate() {
	const dataAtual = new Date();
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	const dataFormatada = dataAtual.toLocaleString('pt-BR', options);
	return dataFormatada
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


