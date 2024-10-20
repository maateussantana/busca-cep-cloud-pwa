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