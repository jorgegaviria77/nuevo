function guardarReg(){
	
	var nom = document.registro.nombre.value;
	//var jaja = document.getElementById('textinput1').value;
	localStorage.setItem('clavenom',nom);	
	var est = document.registro.estatura.value;
	localStorage.setItem('keyest',est);
	
	var pes = document.registro.peso.value;
	localStorage.setItem('keypes',pes);
	if (nom == "juanito" ){
	
	 navigator.notification.alert(
      "Tu estatura es:  " + est,  
      null,         
      "Hola "+nom,            
      "Done");
	 	
	} else {
		callback();
	}
	
}	

function callback(){

var nome= localStorage.getItem('clavenom');
var estatura = localStorage.getItem('keyest');
var peso = localStorage.getItem('keypes');
var imc = Math.round(peso/(estatura/100*estatura/100));
alert ('Hola ' + nome + " tu IMC es: " + imc);

}