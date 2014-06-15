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
    getContentsFromServer();
    selectContent();
});

var feedNumber = 0;
var feedURL = "";

var foodTimes = 0;
var json_content;

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

function getContentsFromServer() {
       return $.ajax({
        url: 'http://localhost:3000/contents.json',
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                    }
    });
}

function selectContent(){
     var t = getContentsFromServer();
     var i = -1;
    var x = t.success(function(data)
    {
        json_content = JSON.parse(JSON.stringify(data)); 
        setInterval(function(){
            if(i<json_content.length)
            {
                i++;
            }
            else
            {
                i=0;
            }

            if(json_content[i].category_id == 1)
            {
                // Eventos
                // if(json_content[i].video == null)
                // {
                    $("#content_container").html("<div id='event_title'>" +
                                                 json_content[i].title +
                                                "</div>");
                // }
                // else
                // {
                    // var p = json_content[i].video.split("/");
                    // var id = p[p.length-1];
                    // alert(id);
                    // p = id.split("=");
                    // id = p[1]; 
                    // alert(id);
                    // $("#outside_container").html("<iframe id='video' width='1920' height='1080' src=" + 
                    //                                 "http://www.youtube.com/embed/" + id
                    //                                 +
                    //                                   " frameborder='0' allowfullscreen></iframe>")
                // }
            }

            else if(json_content[i].category_id == 2)
            {
                // Noticias FCT
               // if(json_content[i].video == null)
               //  {
                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>");
                // }
                // else
                // {
                    //  var p = json_content[i].video.split("/");
                    // var id = p[p.length-1];
                    // p = id.split("=");
                    // id = p[1]; 
                    // $("#outside_container").html("<iframe id='video' width='1920' height='1080' src=" + p
                    //                                  + "?autoplay=1&controls=0&showinfo=0" +
                    //                                   "frameborder='0' allowfullscreen></iframe>")
                // }
            }

            else if(json_content[i].category_id == 3)
            {
                //Avisos Pedagogicos
                // if(json_content[i].video == null)
                // {
                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='pedagogical_message'>" +
                                                json_content[i].description +
                                                "</div>");
                // }
                // else
                // {
                    // var p = json_content[i].video.split("/");
                    // var id = p[p.length-1];
                    // p = id.split("=");
                    // id = p[length-1]; 
                    // $("#outside_container").html("<iframe id='video' width='1920' height='1080' src=" + p
                    //                                  + "?autoplay=1&controls=0&showinfo=0" +
                    //                                   "frameborder='0' allowfullscreen></iframe>")
                // }
              
            }
            else if(json_content[i].category_id == 4)
            {  
                //Investigçao e trabalho
                // if(json_content[i].video == null)
                // {
                    $("#content_container").html("<div id='work_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='work_limit_date'>" +
                                                "Data Limite: " + json_content[i].limit_date +
                                                "</div>");
                // }
                // else
                // {
                    // var p = json_content[i].video.split("/");
                    // var id = p[p.length-1];
                    // p = id.split("=");
                    // id = p[length-1]; 
                    // $("#outside_container").html("<iframe id='video' width='1920' height='1080' src=" + p
                    //                                  + "?autoplay=1&controls=0&showinfo=0" +
                    //                                   "frameborder='0' allowfullscreen></iframe>")
                // }
            }

            else if(json_content[i].category_id == 5)
            {
                //Reportagens
                // if(json_content[i].video == null)
                // {
                    $("#content_container").html("<div id='pedagogical_title'>" +
                                                 json_content[i].title +
                                                "</div>" +
                                                "<div id='pedagogical_message'>" +
                                                json_content[i].description +
                                                "</div>");
                // }
                // else
                // {
                    //  var p = json_content[i].video.split("/");
                    // var id = p[p.length-1];
                    // p = id.split("=");
                    // id = p[length-1]; 
                    // $("#outside_container").html("<iframe id='video' width='1920' height='1080' src=" + p
                    //                                  + "?autoplay=1&controls=0&showinfo=0" +
                    //                                   "frameborder='0' allowfullscreen></iframe>")
                // }
            }

        },4000);
    });
}

