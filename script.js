// cartoon -> çizgi film.

var cartoon = [
    {
        name   : "Bugs Bunny",
        image  : "bugs_bunny.jpeg",
        text   : "Bugs Bunny, Warner Bros.‘un Looney Tunes ve Merrie Melodies serilerinde yer alan, dünya çapında ünlü bir çizgi film karakteridir. 27 Temmuz 1940’ta ilk kez A Wild Hare adlı kısa filmde görünmüştür. Bugs Bunny, zekası, esprili kişiliği ve “Eh, n’aber dostum?” (“Eh, what’s up, doc?”) repliğiyle tanınır.",
        link   : "https://www.youtube.com/watch?v=45eMRyhLX-4"
    }, 
    {
        name  : "Şirinler",
        image : "gargamel.jpeg",
        text  : "Şirinler (The Smurfs), Belçikalı sanatçı Peyo (Pierre Culliford) tarafından 1958 yılında yaratılan mavi tenli, küçük yaratıklardır. İlk kez bir çizgi roman serisi olarak ortaya çıkmış, daha sonra dünya çapında popüler bir çizgi filme dönüşmüştür.",
        link  : "https://www.youtube.com/watch?v=XHld8_LlJiU"
    }, 
    {
        name  : "Pembe Panter",
        image : "pembe_panter.jpeg",
        text  : "Pembe Panter (The Pink Panther), 1963 yılında Blake Edwards’ın yönettiği The Pink Panther adlı komedi filminde yaratılan ve sonrasında bağımsız bir çizgi film karakteri haline gelen ikoniktir.a",
        link  : "https://www.youtube.com/watch?v=AvE2QXrVVow"
    }, 
    {
        name   : "Pepe",
        image  : "pepe.jpg",
        text   : "Pepe, Türkiye’de TRT Çocuk kanalında yayımlanan, çocuklara yönelik eğitici bir çizgi dizidir. 2008 yılında yapımına başlanmış ve kısa sürede Türkiye’nin en popüler çocuk yapımlarından biri haline gelmiştir. Dizinin yaratıcısı Ayşe Şule Bilgiç, yapımcı şirketi ise Düşyeri Animasyondur.",
        link   : "https://www.youtube.com/watch?v=Rv6rR5xOBDE"
    }, 
    {
        name  : "Taş Devri",
        image : "tas_devri.jpeg",
        text  : "Taş Devri (The Flintstones), Hanna-Barbera yapım şirketi tarafından üretilen, tarih öncesi çağlarda geçen bir Amerikan animasyon dizisidir. İlk olarak 1960-1966 yılları arasında yayımlanmıştır ve dünya çapında büyük bir popülerlik kazanmıştır.", 
        link  : "https://www.youtube.com/watch?v=aWCNmW3gYEw"
    }, 

];

// interval-> aralık, prev -> önceki , init = başlangıç,


var index = 0;
var cartoonCount = cartoon.length;
var interval;

var settings={
    duration : 3000,     //duration -> süre
    random : false
};
showSlide(index);
init(settings);

document.querySelector('.fa-arrow-circle-left').addEventListener('click',function(){
    index--;
    showSlide(index);
    console.log(index);
});

document.querySelector('.fa-arrow-circle-right').addEventListener('click',function(){
    index++;
    showSlide(index);
    console.log(index);
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    })
})

function init(settings){
    clearInterval(interval); // Önceki interval temizlenir
    var prev;
    interval = setInterval(function(){
        if(settings.random){
            do{
                index = Math.floor(Math.random() * cartoonCount);
            } while(index == prev);
            prev = index;
        } else {
            if(cartoonCount == index + 1){
                index = -1;
            }
            showSlide(index);
            index++;
        }
    }, settings.duration);
}


function showSlide(i){
    index = i;

    if (i < 0 ){
        index = cartoonCount - 1;
    }
    if(i >= cartoonCount){
        index = 0;
    }
    document.querySelector('.card-title').textContent = cartoon[index].name;
    document.querySelector('.card-img-top').setAttribute('src', 'img/' + cartoon[index].image); // img/ eklenmeli
    document.querySelector('.card-text').textContent=(cartoon[index]).text;
    document.querySelector('.card-link').setAttribute('href',cartoon[index].link);
}


 // kullanıcı form kısmı

 const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

function error(input, message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input) {
    input.className = 'form-control is-valid';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(re.test(input.value)) {
        success(input);
    } else {
        error(input, 'hatalı bir mail adresi');
    }
}

function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value === '') {
            error(input, `${input.id} is required.`);
        } else {
            success(input);
        }
    });  
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır`);
    }else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır`);
    }else {
        success(input);
    }
}

function checkPasswords(input1,input2) {
    if(input1.value !== input2.value) {
        error(input2, 'Parolalar eşleşmiyor');
    }
}

function checkPhone(input) {
    var exp = /^\d{10}$/;   
    if(!exp.test(input.value)) 
        error(input, 'Telefon 10 karakterli olmalıdır.');
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username,email,password,repassword,phone]);
    checkEmail(email);
    checkLength(username,7,15);
    checkLength(password,7,12);
    checkPasswords(password,repassword);
    checkPhone(phone);
});