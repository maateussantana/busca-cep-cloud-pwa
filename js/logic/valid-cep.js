
function validCep(tipo){
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
}