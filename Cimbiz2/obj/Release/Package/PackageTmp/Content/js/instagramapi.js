$(function () {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/2965949423/media/recent/?access_token=2965949423.1677ed0.d04cfc1f2ae64390a23b3048910a55eb",
        success: function (data) {
            for (var i = 0; i < 50; i++) {
                $(".instagramapi ul").append("<a data-lightbox='example-set' data-title='" + data.data[i].caption.text + "'  class='example-image-link hvr-grow-rotate' href='" + data.data[i].images.low_resolution.url + "'><img class='instimg ' src='" + data.data[i].images.low_resolution.url + "' alt='' /></a>");
            }
        }
    });
});