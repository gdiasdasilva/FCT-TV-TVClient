$(document).ready(function() {
	startTime();

    $("#footer_ticker").easyTicker({
        direction: 'up',
        easing: 'swing',
        speed: 'medium',
        height: '80px',
        interval: 5000,
        visible: 1,
        mousePause: 1
    });

    getFeeds();    
    
});

var feedNumber = 0;
var feedURL = "";

function getFeeds()
{
    jQuery.browser = {};
    
    (function ()
    {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./))
        {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();

    feedNumber++;

    if((feedNumber % 3) == 1)
    {
        jQuery.getFeed({
            url: 'http://feeds.dn.pt/DN-Ciencia',
            success: function(feed)
            {
                $("#footer_news_type").html("Ciência");
                $("#footer_news_type").css("background-color", "#A60000");
                $("#feed_list").html("");
                for(var i = 0; i < feed.items.length; i++)
                {
                    if(feed.items[i].title.length < 55)
                        $("#feed_list").append("<li>" + feed.items[i].title + "</li>");
                } 

                setTimeout(getFeeds, 60000);
            }
        });
    }
    else if (feedNumber % 3 == 2)
    {
        jQuery.getFeed({
            url: 'http://feeds.dn.pt/DN-Desporto',
            success: function(feed)
            {
                $("#footer_news_type").html("Desporto");
                $("#footer_news_type").css("background-color", "#0772A1");
                $("#feed_list").html("");
                for(var i = 0; i < feed.items.length; i++)
                {
                    if(feed.items[i].title.length < 55)
                        $("#feed_list").append("<li>" + feed.items[i].title + "</li>");
                }  

                setTimeout(getFeeds, 60000);
            }
        });
    }
    else
    {
        jQuery.getFeed({
            url: 'http://feeds.dn.pt/DN-Portugal',
            success: function(feed)
            {
                $("#footer_news_type").html("Portugal");
                $("#footer_news_type").css("background-color", "#008500");
                $("#feed_list").html("");
                for(var i = 0; i < feed.items.length; i++)
                {
                    if(feed.items[i].title.length < 55)
                        $("#feed_list").append("<li>" + feed.items[i].title + "</li>");
                }  

                setTimeout(getFeeds, 60000);
            }
        });   
    }
    
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // add a zero in front of numbers < 10
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    t = setTimeout(function () {
        startTime()
    }, 500);
}