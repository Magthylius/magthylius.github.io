var toggle = true;
var replaceWords = "balls";
var originalWords = "";

function onPageLoad() {
	originalWords = document.getElementById("main").innerHTML;
	lerpTransparents("colorTransparent");
}

function LerpColor() {
	toggle = !toggle;
	if (toggle) document.getElementById("main").innerHTML = replaceWords;
	else document.getElementById("main").innerHTML = originalWords;
}

function RefreshPage() {
	location.reload();
}

function lerpTransparents(var id) {
	var elements = document.getElementsByClassName(id);
	for (var i = 0; i < elements.length; i++)
		elements.item[i].color = rgba(1,1,1,1);
}