# Memes Advisor

*Memes advisor is a service that allows you to pick the best meme among two that are taken from Reddit and randomly shown on the main page. You can not only choose the best but also see a statistics of most popular memes on a specific page.*

**You can check project [here](http://52.15.225.70:8080/)**

Memes are taken from Reddit using RedditAPI. After the first portion of memes has been loaded from server, they are randomly shown on the page. 

When user chooses the best one via ajax request 'like' is sent to meme property and increments it. Next pair of memes is loaded after the previous best one has been chosen. 

Memes are stored in the RAM of server and periodically are written to the file in JSON format. 
The  popularity of meme is defined by 'like' number divided by number of all 'views' of particular meme.

## Index page
*This is where you can pick the best meme*
![index](https://user-images.githubusercontent.com/15348166/35354899-3dfd93b0-0154-11e8-8186-47463faa63a0.PNG)

## Statistics page
*This is the page where you can view all memes sorted in descending order by popularity*
![stats](https://user-images.githubusercontent.com/15348166/35354924-59a6f9e4-0154-11e8-9a44-452f89a0af4a.PNG)
![stats2](https://user-images.githubusercontent.com/15348166/35355064-ca918930-0154-11e8-8b7b-66d8052b7479.PNG)
