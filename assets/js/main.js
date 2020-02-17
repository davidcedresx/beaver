window.onload = function() {
	var href = window.location.href;
	console.log(window.location);

	if (href.startsWith('http://localhost:1337/dns/')) {
		var links = this.document.getElementsByClassName('nav-link');

		for (var link of links) {
			var chunks = link.href.split('/');
			var path = chunks[chunks.length-1];
			link.setAttribute('href', 'http://localhost:1337/dns/quickfood.io/' + path);
		}
	}
	

	document.getElementById('create-website-form').onsubmit = async function(e) {
		e.preventDefault();
		
		// domain name is ready

		// email address is ready

		// file must be processed
		var blob = document.getElementById('format').files[0];

		var text = await blob.text();

		var static_ids = [
			'company-name',
			'logo-image-url',
			'header-title',
			'header-description',
			'footer-text',
			'relevant-information-column-1-title',
			'relevant-information-column-1-text',
			'relevant-information-column-2-title',
			'relevant-information-column-2-text',
			'relevant-description-column-1-title',
			'relevant-description-column-1-text',
			'relevant-description-column-2-title',
			'relevant-description-column-2-text',
			'services-title',
			'services-text'
		];

		var partial_data = static_ids.map(function (id) {
			const regex = new RegExp(`(?<=${id}: ")(.*)(?=")`, 'i');
			const match = regex.exec(text);

			return {
				field: id,
				value: match ? match[0] : null
			};
		});

		var cards = {
			titles: text.match(/(?<=home-card-title: ")(.*)(?=")/g) || [],
			'image-urls': text.match(/(?<=home-card-image-url: ")(.*)(?=")/g) || [],
			texts: text.match(/(?<=home-card-text: ")(.*)(?=")/g) || []
		};

		var inputs = text.match(/(?<=contact-form-input: ")(.*)(?=")/g) || [];

		var complement_data =  [
			{
				field: 'home-cards',
				value: JSON.stringify(
					cards.titles.map(function (title, index) {
						return {
							title,
							'image_url': cards['image-urls'][index],
							text: cards.texts[index]
						};
					})
				)
			},
			{
				field: 'inputs',
				value: JSON.stringify(inputs)
			}
		];


		var data = [...partial_data, ...complement_data]

		data.forEach(function(item) {
			var input = document.createElement('input');
			input.setAttribute('name', item.field);
			input.setAttribute('value', item.value);
			input.setAttribute('type', 'hidden');
			document.getElementById('create-website-form').appendChild(input);
		})

		document.getElementById('create-website-form').submit();

	}
}

