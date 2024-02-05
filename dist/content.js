window.addEventListener("click", async () => {
	const pause = await browser.storage.local.get("pause");

	if (pause && pause.pause) {
		return;
	}

	const elements = document.querySelectorAll(
		'[data-testid="cellInnerDiv"] article'
	);

	const searchBox = document.querySelector("input");

	const searchKey = searchBox.getAttribute("value");

	let es = [];

	for (let i = 0; i < elements.length; i += 1) {
		let container = elements[i].querySelector(
			"div > div > div.r-18u37iz > div.r-kzbkwu"
		);

		let nameContainer = container.children[0];
		let contentContainer = container.children[1];

		if (contentContainer.innerText.startsWith("Replying to")) {
			contentContainer = container.children[2];
		}

		let names = nameContainer.innerText.split("\n");

		let username = names[0];
		let tag = names[1];
		let timeElement = nameContainer.querySelector("time");

		let time = timeElement.getAttribute("datetime");

		// console.table({
		// 	name: username,
		// 	tag,
		// 	time,
		// 	content: contentContainer.innerText,
		// });

		es.push({
			name: username,
			tag,
			time,
			content: contentContainer.innerText,
		});
	}

	browser.runtime.sendMessage({
		es,
		searchKey,
	});
});
