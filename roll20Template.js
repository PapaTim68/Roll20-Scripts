const tipPost = (function() {	

	const scriptIndex = {"name":"tipPost","version":"v0.01",};

	on("chat:message", function(msg) {

		if (msg.type==="api" && msg.content.toLowerCase().indexOf("!tipPost")==0){
			Chandler(msg);
			return;
		}
	});

	//API CHAT HANDLER
	function Chandler(msg){
		let args = msg.content.split(/\s+/);

		let charid = args[1];

		//MAIN STUFF HERE

	};

	//log stuff
    function logger(logtext){
        log(scriptIndex.name+", "+scriptIndex.version+": "+logtext);
    };

	//chat bullocks
    function chatter(spkAs,slashCom,whisperTo,msgText,options){
		if(slashCom && slashCom.toLowerCase() == "w"){
			if(typeof whisperTo === "string"){
				whisperTo = whisperTo.replace(/\(GM\)/, '').trim();
				slashCom = slashCom.concat(` ${whisperTo}`);
			}
			else if(Array.isArray(whisperTo)){
				if(whisperTo[0].toLowerCase() == "character"){
					switch(whisperTo[1].get("controlledby")){
						//whispering to everyone, DOH! change to public
						case "all":
							slashCom = "";
							whisperTo = "";
							break;
						//whispering to no one, change to GM
						case "":
							whisperTo = "gm";
							slashCom = slashCom.concat(` ${whisperTo}`);
							break;
						//whispering we hope to a name? go ahead
						default:
							whisperTo = `"${whisperTo[1].get("name")}"`;
							slashCom = slashCom.concat(` ${whisperTo}`);
							break;
					}
				}
				else{
					logger("whisper target not recognised as string or tagged array object");
					return;
				}
			}
		}

        let msgContents = "";
        spkAs ? false : spkAs = scriptIndex.name ;
        if(slashCom){
			msgContents = msgContents.concat(`/${slashCom}`);
		}
		//slashCom ? msgContents = msgContents.concat(`/${slashCom}`) : false ;
		//whisperTo && slashCom == "w" ? msgContents = msgContents.concat(` ${whisperTo}`) : false ;
        msgText ? msgContents = msgContents.concat(` ${msgText}`) : logger("chat request but no msgText specified") ;
        options ? options = JSON.parse(options) : false ;
        sendChat(spkAs,msgContents,null,options);
    };

	return scriptIndex;
})();