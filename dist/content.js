window.addEventListener("click", () => {
	const elements = document.querySelectorAll("[data-testid=\"cellInnerDiv\"] article");
	console.log(elements);

	let es = [];

	for (let i = 0; i < elements.length; i += 1 ) {
		let reqElement = elements[i].querySelectorAll("span");

		reqElement.forEach(el => {
			es.push(
				{
					"something": el.innerText
				}
			)
		})

		// es.push({
		// 	"content": elements[i].attributes.length
		// })
	}

	browser.runtime.sendMessage({
		es,
	})
})