
var impress = impress();

impress.init();

document.addEventListener('impress:stepenter', function(e){
if (typeof timing !== 'undefined') clearInterval(timing);
var duration = (e.target.getAttribute('data-transition-duration') ? e.target.getAttribute('data-transition-duration') : 2000); // use the set duration or fallback to 2000ms
if (e.target.id !== 'overview') {
timing = setInterval(impress.next, duration);
}
if(e.target.id == 'overview'){ 
 setTimeout(function(){
 	$("#impress").css("visibility", "hidden");
 	dataContent(i);},2000);
 	document.getElementById("impress_js").remove();
 	document.getElementById("impress_calling").remove();
} 
});