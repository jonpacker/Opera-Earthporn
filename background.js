jQuery.support.cors = true;
window.addEventListener('DOMContentLoaded', function() {

  function updateTile() {
    $.ajax({
      url: 'http://www.reddit.com/r/earthporn/.json', 
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {
      },
      success: function(data) {
        if (!data || !data.data || !data.data.children) return;
        var i = 0;
        var imageRegex = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/;
        while (!data.data.children[i].data.url.match(imageRegex)) i++;
        var firstPost = data.data.children[i].data;
        var imageUrl = firstPost.url;

        if (imageUrl.match(/imgur/)) {
          var formatMatch = imageUrl.match(/\.(?:(jpg|gif|png))/);
          imageUrl = imageUrl.replace(/\.(?:jpg|gif|png)/, 'l.' + formatMatch[1]);
        }

        $('body').css({
          'background-image': 'url(' + firstPost.url + ')'
        });
        opera.contexts.speeddial.title = firstPost.title;
      }
    });
      setTimeout(updateTile, 2000);
  }

  updateTile();

  window.setInterval(updateTile, 60000);

}, false);