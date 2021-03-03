export default class Darkmode{
    constructor({$target}){
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        const darkmodeBtn = document.createElement('span');
        darkmodeBtn.className = 'darkmode-btn';
        darkmodeBtn.innerText = '';
        darkmodeBtn.addEventListener('click', function(){
            if(prefersDarkScheme.matches){
                document.body.classList.toggle("light-theme");
                var theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            }else{
                document.body.classList.toggle("dark-theme");
                var theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            }

            darkmodeBtn.innerText = theme === 'dark' ? '🌕' : '🌑';
            localStorage.setItem('theme', theme);
        })

        const currentTheme = localStorage.getItem('theme');
        if(prefersDarkScheme.matches){
            if(currentTheme === 'dark' || !currentTheme){
                document.body.classList.remove('light-theme');
                darkmodeBtn.innerText = '🌕';
            }else{
                document.body.classList.add('light-theme');
                darkmodeBtn.innerText = '🌑';
            }
        }else{
            if(currentTheme === 'light' || !currentTheme){
                document.body.classList.remove('dark-theme');
                darkmodeBtn.innerText = '🌑';
            }else{
                document.body.classList.add('dark-theme');
                darkmodeBtn.innerText = '🌕';
            }
        }

        $target.appendChild(darkmodeBtn);
    }
}