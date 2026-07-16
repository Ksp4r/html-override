function Assault(){
	document.getElementById('form-download').submit();
	StingerOverlay.style.display = 'none';
	document.head.removeChild(StingerIcon);
}

if (document.getElementById('form-download') != null){
	let tStart = new Date().valueOf();
	document.head.append(StingerIcon);
	document.body.append(StingerOverlay);
	let tint = setInterval(()=>{
		if (new Date().valueOf() / 1000 - document.querySelector('input[name="time"]').value > 8){
			clearInterval(tint);
			Assault();
		}
	}, 100);
}