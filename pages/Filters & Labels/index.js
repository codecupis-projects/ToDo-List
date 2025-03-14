function btn(){
    const div1 = document.getElementById('div1');
    const s = document.getElementById('s1','s2','s3','s4','s5','s6');
    const svg1 = document.getElementById('svg1');
    const svg2 = document.getElementById('svg2');

    if(div1.classList.contains('hidden')){
        s.classList.remove('hidden');
        div1.classList.remove('hidden');
        svg1.classList.remove('hidden');
        svg2.classList.add('hidden');
    }
    else{
        s.classList.add('hidden');
        div1.classList.add('hidden');
        svg1.classList.add('hidden');
        svg2.classList.remove('hidden');
    }
}