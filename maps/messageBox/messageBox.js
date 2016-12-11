

loadMessages();


function loadMessages () {
	var HTML = [];
	for (i = 0; i < 3; i++) { 
		HTML.push( "<div class=" + messages[i].type + "><p>" + messages[i].content + "</p></div><br/><br/><br/><br/><br/>" );
		$(HTML[i]).appendTo("#messageBox");
	}
}


function insertMessage(newMessage) {
	var HTML = [];
	HTML.push ( "<div class=outcommingMessage><p>" + newMessage + "</p></div><br/><br/><br/><br/><br/>" );
	$(HTML[0]).appendTo("#messageBox");

}