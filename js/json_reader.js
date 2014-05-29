var dummyMenu = JSON.parse('{"type": "Menus", "restaurant_image" : "teste.jpg", "restaurant_name" : "Teresa Gato", "restaurant_menu" : { "first_plate" : "Feijões com couves", "second_plate" : "Couves com feijões", "third_plate": "sardinhas" }, "restaurant_price" : "2.95" }');
 
var dummyExtra = JSON.parse('{"type": "Extra", "extra_image": "extracurricular.jpg", "extra_title": "Curso de inglês", "extra_date": "2014-05-27", "extra_price": "€250"}');
 
var dummyWorkshop = JSON.parse('{"type": "Workshops", "workshop_image": "workshop_picture.jpg", "workshop_title": "Workshop de tiro com Arco", "workshop_day": "2012-04-25", "workshop_time": "22:30", "workshop_site": "Jardim Biblioteca"}');

var dummyJob = JSON.parse('{"type": "Jobs", "job_image": "job_picture.jpg", "job_title": "Assistente de Segurança", "job_department": "Departamento de Informática"}');
 
var dummyConference = JSON.parse('{"type": "Conference", "conference_title": "Distinguished Lectures", "conference_image": "conference.jpg", "conference_speaker": "Leslie Lamport", "conference_date": "2014-09-17", "conference_site": "Grande Auditório"}');
 
var dummyVideo = JSON.parse('{"type": "Video", "video_title": "Titulo do video", "video_url": "http://www.youtube.com/embed/juVziawQpCU", "video_date": "2014-05-27", "video_site": "Edifício VII"}');
 
var dummyPedagogical = JSON.parse('{"type": "Pedagogical", "pedagogical_title": "NovaSBE vai mudar-se para a caparica", "pedagogical_text": "A escola de economia e gestão da Nova vai mudar-se para o campus da caparica em 2020. Preparem-se para a invasão." }');
 
var dummySolidarity = JSON.parse('{"type": "Solidarity", "solidarity_title": "Colheita de Sangue", "solidarity_image": "job_picture.jpg", "solidarity_site": "Sala Ágora", "solidarity_time": "21 de Maio"}');

var dummyAwards = JSON.parse('{"type": "Awards", "awards_title": "Professora Ana Lobo distinguida pela Royal Society of Chemistry de Londres", "awards_image": "awards_image.jpg"}');
 
var dummyThesis = JSON.parse('{"type": "Thesis", "thesis_title": "Estratégia de comercialização para a tira de teste PaperTrack para o diagnóstico e monitorização de diabetes mellitus", "subject_thesis": "Engenharia Biomédica", "author_thesis": "Miguel de Ataíde Tomás Pina Falcão", "image_thesis": "thesis_picture.jpeg", "date_thesis": "2014-05-26", "site_thesis": "Sala 213 - Edifício I"}');

var array = [dummyMenu, dummyExtra, dummyWorkshop, dummyJob, dummyConference, dummyVideo, dummyPedagogical, dummySolidarity, dummyAwards, dummyThesis];


var footer_news = JSON.parse('{"news": ["Passos deixa mensagem de alento ao PSD para se posicionar para legislativas", "&quot;Fartei-me de rir&quot;, diz Bruno de Carvalho sobre entrevista de Luís Filipe Vieira", "FILIPA PELEJA, ESTUDANTE DE DOUTORAMENTO DA FCT DA NOVA ALCANÇOU O 1º LUGAR NA ÚLTIMA EDIÇÃO DOS ZON DEVDAYS 2015 COM &quot;SOCIAL NOS&quot;.", "Alunos da FCT da NOVA vencem na 5ª edição do NOVA Idea Competition - Prémio BPI", "Estrutura 3D da Aldeído Oxidase Periplásmica PaoABC revelando o seu centro activo de Molibdénio e centros redox", "Costa vai pedir congresso se Seguro não o convocar", "eigth-news", "Apple compra Beats e entra na música por subscrição", "CDS admite resultado &quot;historicamente baixo&quot;"]}');
var s,y;
 
$(document).ready(function() {
	startTime();
    b();
    $("#footer_ticker").easyTicker({
		direction: 'up',
		easing: 'swing',
		speed: 'medium',
		height: '80%',
		interval: 2000,
		visible: 1,
		mousePause: 1,
		controls: {
			up: '',
			down: '',
			toggle: '',
			playText: 'Play',
			stopText: 'Stop'
		}
	});
});

function b(){
	var i=0;
	setInterval(function(){a(i++)}, 5000);
	//a(i);
}

function animate(s,y){
	
	$(s).fadeOut();
	$("#type").empty();

	if(y != null){
		$(y).remove();
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
    // add a zero in front of numbers<10
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    t = setTimeout(function () {
        startTime()
    }, 500);
}



function code(dummyMenuObject){

	if(dummyMenuObject.type == "Menus")
		{		
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append('<div class="general_content" id="menus">'+
						'<div id= "general_image">' +
							'<div id="restaurant_image">'+
							'<img src=' + dummyMenuObject.restaurant_image + ' alt="bla">' +
							'</div>'+
							'<div id= "caseload">' +
								'<div id="restaurant_name">' +
								'<h1>' + dummyMenuObject.restaurant_name +'<h1>' +
								'</div>' +
								'<div id="restaurant_menu">' +
								'<h2 class ="lead">First Plate: ' + dummyMenuObject.restaurant_menu.first_plate +'</h2>' +
								'<h2>Second Plate: ' + dummyMenuObject.restaurant_menu.second_plate + '</h2>' +
								'<h2>Third Plate: ' + dummyMenuObject.restaurant_menu.third_plate + '</h2>' +
								'</div>' +
								'<div id="restaurant_prices">' +
								'<h2>' + dummyMenuObject.restaurant_price +'€</h2>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>');
			
			s="#menus";
			setTimeout(function(){animate(s);},4250);
		}

		else if(dummyMenuObject.type == "Extra")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='extra'>"+
						"<div id='general_extra'>" +
							"<div id='extra_image'>"+
							"<img src=" + dummyMenuObject.extra_image + " alt='bla'>" +
							"</div>" +
							"<div id='extra_title'>"+
							"<span class='text'>" + dummyMenuObject.extra_title + "</span>" +
							"</div>"+
							"<div id='extra_date'>" +
							"<span class='text'>Inscrições até " + dummyMenuObject.extra_date + "</span>" +
							"</div>"+
							"<div id='extra_price'>"+
							"<span class='text'>" + dummyMenuObject.extra_price + "</span>" +
							"</div>" +
						"</div>" +
					"</div>");
			s="#extra";
			setTimeout(function(){animate(s);},4250);
		}

		else if(dummyMenuObject.type == "Workshops")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='workshops'>" +	
					"<div id='workshop_title'>" +
					"<span class='text'>" + dummyMenuObject.workshop_title + "</span>" +
					"</div>" +
					"<div id='workshop_image'>" +
					"<img src=" + dummyMenuObject.workshop_image + " alt='bla'>" +
					"</div>" +
					"<div id='workshop_day'>" +
					"<span class='text'>" + dummyMenuObject.workshop_day + "</span>" +
					"</div>" +
					"<div id='workshop_time'>" +
					"<span class='text'>" + dummyMenuObject.workshop_time + "</span>" +
					"</div>" +
					"<div id='workshop_site'>" +
					"<span class='text'>" + dummyMenuObject.workshop_site + "</span>" +
					"</div>" +
				"</div>");
			s="#workshops";
			setTimeout(function(){animate(s);},4250);
		}

		else if(dummyMenuObject.type == "Jobs")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='jobs'>"+
					"<div id='job_image'>"+
					"<img src=" + dummyMenuObject.job_image+ " alt='bla'>" +
					"</div>" +
					"<div id='job_title'>" +
					"<span class='text'>" + dummyMenuObject.job_title + "</span>" +
					"</div>" +
					"<div id='job_department'>" + 
					"<span class='text'>" + dummyMenuObject.job_department + "</span>" +
					"</div>" +
				"</div>");	
			s="#jobs";
			setTimeout(function(){animate(s);},4250);
		}
		
		else if(dummyMenuObject.type == "Conference")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='conference'>" +	
					"<div id='conference_title'>" +
					"<span class='text'>" + dummyMenuObject.conference_title + "</span>" +
					"</div>" +
					"<div id='conference_speaker'>" +
					"<span class='text'>" + dummyMenuObject.conference_speaker + "</span>" +
					"</div>" +
					"<div id='conference_image'>" +
					"<img src=" + dummyMenuObject.conference_image+ " alt='bla'>" +
					"</div>" +
					"<div id='conference_date'>" +
					"<span class='text'>" + dummyMenuObject.conference_date + "</span>" +
					"</div>" +
					"<div id='conference_site'>" +
					"<span class='text'>" + dummyMenuObject.conference_site + "</span>" +
					"</div>" +
				"</div>");	
			s="#conference";
			setTimeout(function(){animate(s);},4250);
		}
		
		else if(dummyMenuObject.type == "Video")
		{
			$("#type").append(dummyMenuObject.type);

			$("#content").append("<iframe id='video_player' width='100%' height='100%'" +
			 "src=" + dummyMenuObject.video_url + "?autoplay=1&controls=0&showinfo=0&enablejsapi=1 frameborder='0' allowfullscreen>" + 
			 "</iframe>");
			
			/*  FALTA PASAR O VIDEO EM FULL SCREEN  */
			$("#general_container").append("<div id='video'>" +
					"<div id='video_title'>" +
					"<span class='text'>" + dummyMenuObject.video_title + "</span>" +
					"</div>" +
					"<div id='video_footer'>" +
						"<div id='video_date'>" +
						"<span class='text'>" + dummyMenuObject.video_date + "</span>" +
						"</div>" +
						"<div id='video_site'>" +
						"<span class='text'>" + dummyMenuObject.video_site + "</span>" +
						"</div>" +
					"</div>" +
				"</div>");
			s="#video";
			y="#video_player";
			setTimeout(function(){animate(s,y);},4250);
		}
		
		else if(dummyMenuObject.type == "Pedagogical")
		{
			$("#type").append(dummyMenuObject.type);
			$("#general_container").append("<div class='general_content' id='pedagogical'>" +
					"<div id='pedagogical_title'>" +
					"<span class='text'>" + dummyMenuObject.pedagogical_title + "</span>" +
					"</div>" +
					"<div id='pedagogical_text'>" +
					"<span class='text'>" + dummyMenuObject.pedagogical_text + "</span>" +
					"</div>" +
				"</div>");
			s="#pedagogical";
			setTimeout(function(){animate(s);},4250);
		}

		else if(dummyMenuObject.type == "Solidarity")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='solidarity'>" +
					"<div id='solidarity_image'>" +
					"<img src=" + dummyMenuObject.solidarity_image + " alt='bla'>" +
					"</div>" +
					"<div id='solidarity_general'>" +
						"<div id='solidarity_title'>" +
						"<span class='text'><strong>" + dummyMenuObject.solidarity_title + "</strong></span>" +
						"</div>" +
						"<div id='solidarity_site'>" +
						"<span class='text'>" + dummyMenuObject.solidarity_site + "</span>" +
						"</div>" +
						"<div id='solidarity_time'>" +
						"<span class='text'>" + dummyMenuObject.solidarity_time + "</span>" +
						"</div>" +
					"</div>" +
				"</div>");
			s="#solidarity";
			setTimeout(function(){animate(s);},4250);
		}
		
		else if(dummyMenuObject.type == "Awards")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='awards'>" +
					"<div id='awards_title'>" +
					"<span class='text'>" + dummyMenuObject.awards_title + "</span>" +
					"</div>" +
					"<div id='awards_image'>" +
					"<img src=" + dummyMenuObject.awards_image + " alt='bla'>" +
					"</div>" +
				"</div>");
			s="#awards";
			setTimeout(function(){animate(s);},4250);
		}

		else if(dummyMenuObject.type == "Thesis")
		{
			$("#type").append(dummyMenuObject.type);

			$("#general_container").append("<div class='general_content' id='thesis'>" +
					"<div id='title_thesis'>" +
					"<span class='text lead'>" + dummyMenuObject.thesis_title + "</span>" +
					"</div>" +
					"<div id='subject_thesis'>" +
					"<span class='text'>" + dummyMenuObject.subject_thesis + "</span>" +
					"</div>" +
					"<div id='image_thesis'>" +
					"<img src=" + dummyMenuObject.image_thesis + " alt='bla'>" +
					"</div>" +
					"<div id='date_thesis'>" +
					"<span class='text'>" + dummyMenuObject.date_thesis + "</span>" +
					"</div>" +
					"<div id='site_thesis'>" +
					"<span class='text'>" + dummyMenuObject.site_thesis + "</span>" +
					"</div>" +
				"</div>");
			s="#thesis";
			setTimeout(function(){animate(s);},4250);
		}
}

function a(i){
 	if(i<array.length){
 		var dummyMenuObject = array[i];
		code(dummyMenuObject);
 	}	
}