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