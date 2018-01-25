$(document).ready(function () {
    console.log('ready');
    $('#meme1').on('click', function () {
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
    }});
    });
    $('#meme2').on('click', function () {
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
    }});
    });

    $('.pic').on('click', function () {
        var clickedMeme = $(this);
        var memeSrc = clickedMeme.attr("src");
        $("#fullsizeMeme").attr("src", memeSrc);
        $("#overlay").show();
        $("#fullsize").show();
    });

    $('#fullsizeMeme, #overlay').on('click', function () {
        $("#fullsizeMeme").attr("src", "");
        $("#overlay").hide();
        $("#fullsize").hide();
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#top-btn').fadeIn();
        } else {
            $('#top-btn').fadeOut();
        }
    });

    $('#top-btn').click(function(){
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });

});
