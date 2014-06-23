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
    dataContent(-1);

  
});

var feedNumber = 0;
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
     var size = data.length;
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


function publishData(json_content,i){

    if(json_content[i].category_id == 1)
            {
                // Eventos
                if(!json_content[i].video)
                {
                    // $("#content_container").html("<div id='event_title'>" +
                    //                              json_content[i].title +
                    //                             "</div>");

                    // setTimeout(function(){dataContent(i)},4000);
                  //Animacao prezi
                  
                    $("#content_container").html("<div id='impress'>" + 
                            "<div id='type' class='step' data-x='0' data-y='0' data-scale='4' data-duration='2000'>" + 
                            "</div>" + 
                            "<div id='title' class='step' data-x='150' data-y='4000' data-rotate='90' data-scale='5' data-duration='2000'>" + 
                            "</div>" + 
                             "<div id='description' class='step' data-x='4500' data-y='4100' data-rotate='180' data-scale='6' data-duration='2000'>" +
                            "</div>" +
                            "<div id='place' class='step' data-x='4500' data-y='-250' data-rotate='270' data-scale='6' data-duration='2000'>" +
                            "</div>" +
                            "<div id='hour' class='step' data-x='7700' data-y='-800' data-scale='6' data-duration='2000'>" + 
                            "</div>" +
                             "<div id='overview' class='step' data-x='3000' data-y='1500' data-scale='10' data-duration='2000'>" +
                             "</div>" +
                                "</div>");

                    $("#type").html("<h1>EVENTOS</h1>");
                    $("#title").html(json_content[i].title);
                    $("#description").html(json_content[i].description);
                    $("#place").html(json_content[i].event_site);

                    var tmp = json_content[i].event_datetime;
                    var s = tmp.split("T");
                    var h = s[1].split(".");
                    var code = "<p>" + s[0] + "</p><p>" + h[0] +"</p>"
                    $("#hour").html(code);

            
                    $( '#impress' ).jmpress({hash: { use: false }});
                     
                    // setTimeout(function(){$( '#impress' ).jmpress('deinit');
                    //                         dataContent(i);
                    //                     },12000);    

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
                //Noticias FCT
               if(!json_content[i].video)
                {
                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>");
                    setTimeout(function(){
                        dataContent(i)},4000);
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

