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

    setTimeout(function(){
        $("#sidebar").fadeIn(3000);
    }, 2000);

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
    // $("#content_container").empty();
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

function callback(){
    alert();
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
                  
                    
                    $("#title").html("<h1>EVENTOS</h1>");
                    $("#its").html(json_content[i].title);
                    $("#big").html(json_content[i].description);
                    $("#ing").html(json_content[i].event_site);
                    $("#imagination").html(json_content[i].event_datetime);
                    // $("#impress").css("visibility","visible");

                    // $("#impress").jmpress();

                    $( '#impress' ).jmpress();
                    // $('#overview').on(function(){alert("callback");}, function(enterStep,e){});


                        // $('#overview').on('enterStep', function(event) {
                        //         // jQuery event triggered when entering a specific step
                        //         console.log('Hello step #home!');
                        //         dataContent(i);
                        //     });

                    

                    $('#overview').on('leaveStep', function(event) {
                    $("#impress").hide();
                });

                     setTimeout(function(){dataContent(i)},14000);
                    //   $("#overview").on('enterStep', function(){
                    // alert("entrei");
                    // dataContent(i);
                    // });

                // var script1 = document.createElement("script");
                // script1.setAttribute("id", "impress_js");
                // script1.setAttribute("type", "text/javascript");
                // script1.setAttribute("src", "js/impress.js");
                // document.body.appendChild(script1);

                // var script2 = document.createElement("script");
                // script2.setAttribute("id", "impress_calling");
                // script2.setAttribute("type", "text/javascript");
                // script2.setAttribute("src", "js/impress_1.js");
                // document.body.appendChild(script2);


            
                   
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

