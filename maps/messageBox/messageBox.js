

loadMessages();


function loadMessages () {
	var HTML = [];
	for (i = 0; i < 3; i++) { 
		HTML.push( "<div class=" + messages[i].type + "><p>" + messages[i].content + "</p></div>" );
		$(HTML[i]).appendTo("#messageBox");
	}
}


function insertMessage(newMessage) {
	var HTML = [];
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var HH = today.getHours();
	var MM = today.getMinutes();
	if(dd<10) {
	    dd='0'+dd
	} 
	if(mm<10) {
	    mm='0'+mm
	} 
	if (HH<10) {
		HH='0' + HH
	}
	if (MM<10) {
		MM='0' + MM
	}

	today = HH + ':' + MM + ', '+ dd+'. '+ mm +'. '+yyyy;
	
	HTML.push ("<div class=outcommingMessage><p class=messageInfo><span class=sender>David Hasselhof</span><span class=messageDate>" + today + "</span></p><p>" + newMessage + "</p></div>");
	$(HTML[0]).appendTo("#messageBox");

}