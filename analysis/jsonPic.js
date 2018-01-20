function jsonPic(id, title, url, likes, views) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.likes = likes;
    this.views = views;
    this.stats = likes/views;
}

module.exports = jsonPic;