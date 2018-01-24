function jsonPic(id, title, url, likes, views) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.likes = likes;
    this.views = views;
    Object.defineProperty(this, 'stats', {
        get: function() {
			if (this.views > 0)
				return (this.likes / this.views);
			else
				return 0;
        },
        set: function(value) {
            this.stats = value;
        },
        enumerable: true
    });
}

module.exports = jsonPic;