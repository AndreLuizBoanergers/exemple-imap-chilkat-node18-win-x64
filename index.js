//const os = require('os');
//modulo para winX64
//para outras arquiteturas http://www.example-code.com/nodejs/default.asp
const chilkat = require('@chilkat/ck-node18-win64');
//const fs = require('fs');
const EventEmitter = require('events');
/*
//Descomente se por alguma caso a leitura for muito grande
//somente por preucasao evitar estouro memoria V8

const emitter = new EventEmitter();
emitter.setMaxListeners(0);


*/
const  colors = require('colors');
//user acess//
const credenciais = `user@exemplo.com.br:abc123`;
//=========//
function delay(ms){
	return new Promise( resolve => {
		setTimeout(()=>{resolve('')},ms);
	})
}
async  function chilkatImap(credenciais){
	
    	let host = credenciais.split(":")[0].split("@")[1];
    	let usuario = credenciais.split(":")[0];
    	let senha = credenciais.split(":")[1];
        console.log("Estabelendo Conexao: ".green + `imap.${host}` + " Porta: " + "993".blue);
        var imap = new chilkat.Imap();
	    imap.Ssl = true;	    
	    imap.Port = 993;
	    var connected = imap.Connect(`imap.${host}`);
	    // verifica  servidor esta Online
	    if (success !== true) {
	    	//for debung
	        //console.log("[ERROR CONNECT SERVER] ".red + `${imap.LastErrorText.split("Connect_Imap:")[1].split("--Connect_Imap")[0]}`);
	        console.log("Serviço offline!");
	        return;
	    }
	    console.log("Servidor Online! Iniciando login.".green);
	    success = imap.Login(`${usuario}`,`${senha}`);
	    // fazer login
	    if (success !== true) {
	    	//for debug
	        //console.log("[LOGIN FAILLED] ".red + `${imap.LastErrorText.split("Connect_Imap:")[1].split("--Connect_Imap")[0]}`);
	        console.log("Usuario ou senha invalido!");
	        return;
	    }
	    console.log("Selecionando INBOX!".green);
	    success = imap.SelectMailbox("Inbox");
	    //acessando Caixa entrada
	    if (success !== true) {
	    	//for debug
	        //console.log("[ERROR MESSAGE] ".yellow + `${imap.LastErrorText.split("Connect_Imap:")[1].split("--Connect_Imap")[0]}`);
	        console.log("Erro acesso a caixa entrada!");
	        return;
	    }
	    var fetchUids = true;
	    var messageSet = imap.Search("ALL",fetchUids);
	    console.log("Verificando mensagens!".green)
	    if (imap.LastMethodSuccess == false) {
	    	//for debug
	        //console.log("[ERROR OPEM MESSAGE] ".yellow + `${imap.LastErrorText.split("Connect_Imap:")[1].split("--Connect_Imap")[0]}`);
	        console.log("Erro ao abrir menssagens!");
	        return;
	    }
	    var bundle = imap.FetchBundle(messageSet);
	    console.log("Buscando Emails!".green)
	    if (imap.LastMethodSuccess == false) {
	    	//for debug
	        //console.log("[ERROR SEARCH MAIL] ".yellow + `${imap.LastErrorText.split("Connect_Imap:")[1].split("--Connect_Imap")[0]}`);
	        console.log("Erro leitura dos emails!")
	        return;
	    }	    
	    var numEmails = bundle.MessageCount;
	    console.log("Verificando assunto!".green);
	    console.log("Total mensagens: ".green + `${numEmails}`.blue);
	    console.log("Lendo menssagens aguarde...".green);
	    await delay(3000);
	    //Imprime todas mensagens
	    //ainda nao  li toda  documentacao, mas  e posivel listar somente as nao lidas ou as  3 ultimas
	    while (i < numEmails) {
	        var email = bundle.GetEmail(i);
	        console.log(email.From);
	        console.log(email.Subject);
	        i = i+1;
	    }
	    console.log("Encerando conexao!".red);
	    success = imap.Disconnect();


    }

async function init(){
	var glob = new chilkat.Global();
    var success = glob.UnlockBundle("30-day trial");
    if (success !== true) {
        console.log(glob.LastErrorText);
        return;
    }
	    console.log("[===============================]");
	    console.log()
        var status = glob.UnlockStatus;
    if (status == 2) {
        console.log("Trial 30 day exipered");
    }else{
    	chilkatImap(`${credenciais}`);
    }
}

init();

