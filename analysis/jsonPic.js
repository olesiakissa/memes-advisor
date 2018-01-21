function jsonPic(id, title, url, likes, views) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.likes = likes;
    this.views = views;
    this.stats = this.likes / this.views;
}

module.exports = jsonPic;