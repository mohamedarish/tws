window.addEventListener("click", () => {
	const elements = document.querySelectorAll("[data-testid=\"cellInnerDiv\"]");
	console.log(elements);

	let es = [];

	for (let i = 0; i < elements.length; i += 1 ) {
		es.push({
			"content": elements[i].attributes.length
		})
	}

	browser.runtime.sendMessage({
		es,
	})
})