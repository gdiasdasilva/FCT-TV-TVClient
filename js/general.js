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

    $.simpleWeather({
        location: 'Lisbon, Portugal',
        woeid: '',
        unit: 'c',
        success: function(weather) {
          html = '<i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;';
          $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
    }); 

    getFeeds();

    // setTimeout(function(){
    //     $("#sidebar").fadeIn(3000);
    // }, 2000);

    setTimeout(fillFoods, 5000); 
    
     // getContentsFromServer();
     // selectContent();
    shuffle(data);
    dataContent(-1);

});

var feedNumber = 0;
var animationNumber = 0;
var feedURL = "";

var foodTimes = 0;
var json_content;
var i;

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

function fillFoods(){
    var items = [{"dish": ["Arroz de Polvo Salada - 689,6 Kcal  ; Alho Franc\u00eas \u00e0 Braz -649,2 Kcal "], "soup": ["Creme de Legumes C/ vegetais"], "diet": ["Alm\u00f4ndegas Estuf/ Simp/ c/ Espargu/ -580.3 Kcal"]}];
    
    $("#soup").html("<strong>Sopa: </strong>" + items[0].soup + "<br>");
    $("#dish").html("<strong>Prato: </strong>" + items[0].dish + "<br>");
    $("#diet").html("<strong>Dieta: </strong>" + items[0].diet);

    $("#cantina").collapse('toggle');

    setTimeout(function(){
        $("#cantina").collapse('toggle');
        $("#sidebar").fadeOut("slow");
    }, 10000)
}

function dataContent(n){
     var size = 4;
    if(i<size-1)
    {
        i= n+1;
    }
    else
    {
        i=0;
    }
    publishData(data,i);
}


function publishData(json_content,i)
{
    if(json_content[i].category_id == 1)
            {
                $("#content_type_container").html("Eventos");

                // Eventos
                if(!json_content[i].video)
                {                  
                    $("#content_container").html("<div id='impress'>" + 
                            "<div id='title' class='step' data-x='150' data-y='6000' data-scale='7' data-rotate='90' data-duration='5000'>" + 
                            "</div>" +
                            "<div id='place' class='step' data-x='500' data-y='2000' data-z='-3000' data-rotate='-150' data-scale='1' data-duration='5000'>" +
                            "</div>" +
                            "<div id='hour' class='step' data-x='5000' data-y='4000' data-rotate='300' data-scale='7' data-duration='5000'>" + 
                            "</div>" +                            
                        "</div>"
                    );

                    $("#title").html(json_content[i].title);
                    $("#final_title").html(json_content[i].title);
                    $("#place").html("<img src='img/map_icon3 copy.png' width='100px'>" + "<br>" + json_content[i].event_site);

                    var tmp = json_content[i].event_datetime;
                    var s = tmp.split("T");
                    var h = s[1].split(".");
                    var time = h[0].split(":");
                    var code = "<br><img src='img/time-8-512 copy.png' width='150px'>" + "<br>" + "<p>" + "<b class='scaling'>" + s[0] + "</b>" + "</p><p>" + time[0] + "h" + time[1] + "</p>";
                    $("#hour").append(code);

                    $('#impress').jmpress({hash: { use: false }});

                    

                     
                    setTimeout(function(){$( '#impress' ).jmpress('deinit');
                                             dataContent(i);
                                         },17000);    

                }
                else
                {
                    var divide = json_content[i].video.split(".");
                    var extension = divide[divide.length-1];
                   $("#content_container").html("<video width='1920'controls autoplay id='myvideo'>" + 
                                                    "<source src='bin/videos_client/" + json_content[i].video +"' type='video/" + extension + "'>" +
                                                "</video>");

                   var video = document.getElementById("myvideo");   

                    video.onended = function(e) {

                         dataContent(i);
                        // code to navigate page
                        } 
                }
            }

            else if(json_content[i].category_id == 2)
            {
                $("#content_type_container").html("Notícias");

                //Noticias FCT
               if(!json_content[i].video)
                {
                    $("#content_container").html("<div id='news_title'>" + json_content[i].title + "</div>");
                    
 
                    $('#news_title').textillate({  
                        in:
                        {
                            effect: 'fadeInLeftBig',
                        }  
                    }); 

                    setTimeout(function()
                    {
                        $("#news_title").fadeOut(1000);
                        dataContent(i);
                    }, 7500);  
                }
                else
                {
                     var divide = json_content[i].video.split(".");
                    var extension = divide[divide.length-1];
                   $("#content_container").html("<video width='1920'controls autoplay id='myvideo'>" + 
                                                    "<source src='bin/videos_client/" + json_content[i].video +"' type='video/" + extension + "'>" +
                                                "</video>");

                   var video = document.getElementById("myvideo");   

                    video.onended = function(e) {

                        dataContent(i);
                        // code to navigate page
                        } 
                }
            }

            else if(json_content[i].category_id == 3)
            {
                //Avisos Pedagogicos
                if(!json_content[i].video)
                {
                    var description = json_content[i].description;

                    var shortText = jQuery.trim(description).substring(0, 180)
                        .split(" ").slice(0, -1).join(" ") + "...";

                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='pedagogical_message'>" +
                                                shortText +
                                                "</div>");

                    setTimeout(function(){dataContent(i)},4000);

                }
                else
                {
                    var divide = json_content[i].video.split(".");
                    var extension = divide[divide.length-1];
                   $("#content_container").html("<video width='1920'controls autoplay id='myvideo'>" + 
                                                    "<source src='bin/videos_client/" + json_content[i].video +"' type='video/" + extension + "'>" +
                                                "</video>");

                   var video = document.getElementById("myvideo");   

                    video.onended = function(e) {

                        dataContent(i);
                        // code to navigate page
                        } 
                }
              
            }
            else if(json_content[i].category_id == 4)
            {  
                //Investigçao e trabalho
                if(!json_content[i].video)
                {
                    $("#content_container").html("<div id='work_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='work_limit_date'>" +
                                                "Data Limite: " + json_content[i].limit_date +
                                                "</div>");
                    setTimeout(function(){dataContent(i)},4000);
                }
                else
                {
                    var divide = json_content[i].video.split(".");
                    var extension = divide[divide.length-1];
                   $("#content_container").html("<video width='1920'controls autoplay id='myvideo'>" + 
                                                    "<source src='bin/videos_client/" + json_content[i].video +"' type='video/" + extension + "'>" +
                                                "</video>");

                   var video = document.getElementById("myvideo");   

                    video.onended = function(e) {

                        dataContent(i);
                        // code to navigate page
                        } 
                }
            }

            else if(json_content[i].category_id == 5)
            {
                //Reportagens
                if(!json_content[i].video)
                {
                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='pedagogical_message'>" +
                                                json_content[i].description +
                                                "</div>");
                    setTimeout(function(){dataContent(i)},4000);
                }
                else
                {
                     var divide = json_content[i].video.split(".");
                    var extension = divide[divide.length-1];
                   $("#content_container").html("<video width='1920'controls autoplay id='myvideo'>" + 
                                                    "<source src='bin/videos_client/" + json_content[i].video +"' type='video/" + extension + "'>" +
                                                "</video>");

                   var video = document.getElementById("myvideo");   

                    video.onended = function(e) {

                        dataContent(i);
                        // code to navigate page
                        } 
                }
            }
}

function shuffle(sourceArray)
{
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}

