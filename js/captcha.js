let v1= Math.floor(Math.random()*(15-1))+0;
let v2= Math.floor(Math.random()*(15-1))+1;
let ResultadoDeCaptcha= v1 + v2;



let PrimerSpan = document.getElementById("valor1");
PrimerSpan.innerHTML=v1;

let SegundoSpan= document.getElementById("valor2");
SegundoSpan.innerHTML=v2;


function captcha(e){
e.preventDefault()
let ValorInput= document.getElementById("captcha").value;
let respuesta= document.getElementById("btn");
if(ValorInput==ResultadoDeCaptcha){
respuesta.innerHTML="Captcha Correcto";
document.getElementById("enviar").disabled=false;
}
else{respuesta.innerHTML="Responda Nuevamente El Captcha";
document.getElementById("enviar").disabled=true;
}

}
btn.addEventListener('click',captcha)
