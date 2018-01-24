$(document).ready(() => {
	console.log('ready');
	$('#meme1').on('click', () => {
		$.ajax({
			type: 'POST',
			url: '/next',
			async: true,
			data: JSON.stringify({
				liked: {
					id: $('#meme1').attr('data-id')
				},
				viewed: {
					id: $('#meme2').attr('data-id')
				}
			}),
			dataType: "json",
			contentType: "application/json",
			success: (data) => {
				console.log(data);
				$('#meme1title').text(data.meme1.title);
				$('#meme2title').text(data.meme2.title);
				$('#meme1').attr('data-id', data.meme1.id).attr('src', data.meme1.url);
				$('#meme2').attr('data-id', data.meme2.id).attr('src', data.meme2.url);	
			},
		});
	});
	$('#meme2').on('click', () => {
		$.ajax({
			type: 'POST',
			url: '/next',
			async: true,
			data: JSON.stringify({
				liked: {
					id: $('#meme2').attr('data-id')
				},
				viewed: {
					id: $('#meme1').attr('data-id')
				}
			}),
			dataType: "json",
			contentType: "application/json",
			success: (data) => {
				console.log(data);
				$('#meme1title').text(data.meme1.title);
				$('#meme2title').text(data.meme2.title);
				$('#meme1').attr('data-id', data.meme1.id).attr('src', data.meme1.url);
				$('#meme2').attr('data-id', data.meme2.id).attr('src', data.meme2.url);	
			},
		});
	});
});


