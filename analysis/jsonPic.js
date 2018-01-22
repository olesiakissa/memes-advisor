function jsonPic(id, title, url, likes, views) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.likes = likes;
    this.views = views;
    Object.defineProperty(this, 'stats', {
        get: function() {
            return (this.likes / this.views);
        },
        set: function(value) {
            this.stats = value;
        },
        enumerable: true
    });
}

module.exports = jsonPic;