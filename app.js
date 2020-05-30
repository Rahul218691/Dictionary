let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = 'da1ed740-7b52-4dd8-af77-62e637008e01';
let notfound = document.querySelector('.not_found');
let desc = document.querySelector('.def');
let audioTag = document.querySelector('.audio');
let loading = document.querySelector('.loading');


searchBtn.addEventListener('click', function(e) {
	e.preventDefault();

	audioTag.innerHTML = '';
	notfound.innerText = '';
	desc.innerText = '';

	let word = input.value;
	if(word === ''){
		return;
	}else{
		getData(word);
	}
});


async function getData(word){
loading.style.display = 'block';
const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
const data = await response.json();

if(!data.length){
	loading.style.display = 'none';
	notfound.innerText = 'No result found';
	return;
}

if(typeof data[0] === 'string'){
	loading.style.display = 'none';
	let heading = document.createElement('h3');
	heading.innerText = 'Did you mean?';
	notfound.appendChild(heading);	
	data.forEach(element =>{
		let suggesstion = document.createElement('span');
		suggesstion.classList.add('suggested');
		suggesstion.innerText = element;
		notfound.appendChild(suggesstion)
	})
	return;
}

loading.style.display = 'none';
let defination = data[0].shortdef[0];
desc.innerText = defination;

const soundName = data[0].hwi.prs[0].sound.audio;
if(soundName){
	renderSound(soundName);
}
}

function renderSound(soundName){
	//https://media.merriam-webster.com/soundc11
	let subfolder = soundName.charAt(0);
	let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
	let audioPlayer = document.createElement('audio');
	audioPlayer.src = soundSrc;
	audioPlayer.controls = true;
	audioTag.appendChild(audioPlayer);
}
