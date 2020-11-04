// Feel free to add phrases to the useless button up here!
const phrases = ["This is the Useless Button.", "Why click on me?", "Ow!", "UwU", "Join Hack Club!", "ORB", "...", "Are you happy now?", "Thank you for agreeing to our ToS", "Thank you for your donation!", "Your IP has been logged and reported to the FBI", "You just bought a washing machine. Awesome!"];

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md#lcg-lehmer-rng
const LCG = (a) => {
    return function() {
      a = Math.imul(48271, a) | 0 % 2147483647;
      return (a & 2147483647) / 2147483648;
    }
}
Math.random = LCG(Date.now());

async function fetchAvatarURL(username) {
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const jsonResp = await resp.json();
    return jsonResp.avatar_url;
}

class GitHubAuthor extends HTMLElement {
    constructor() {
        super();
        this.avatarURL = this.getAttribute('avatar') || null;
        this.username = this.getAttribute('username');
        this.href = this.getAttribute('href') || `https://github.com/${this.username}`;
        this.render();
    }
    connectedCallback() {
        if (!this.avatarURL) {
            fetchAvatarURL(this.username).then(avatarURL => {
                this.avatarURL = avatarURL;
                this.render();
            });
        }
    }
    render() {
        this.innerHTML = `<a href="${this.href}" style="
            color: #000;
            text-decoration: none;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            font-size: .75em;
            width: 7em;
        " target="_blank" noreferer noopener>
            <img src="${this.avatarURL}"
                style="
                    height: 46px;
                    width: 46px;
                    border-radius: 25px;
                    background: rgba(0, 0, 0, .1);
                "
            />
            <p style="
                width: 100%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
            ">@${this.username}</p>
        </a>`;
    }
}
window.customElements.define('github-author', GitHubAuthor);

// here's some s**tty code to pull last-updated

fetch("https://api.github.com/repos/thesephist/yolo/commits")
    .then((d) => d.json())
    .then((data) => {
        document.getElementById("commit").innerHTML =
            `<a href="${data[0].author.html_url}" target="_blank">@${data[0].author.login}</a> 
            &ndash; ${data[0].commit.message} (<a href="https://github.com/thesephist/yolo/commit/${data[0].sha}" target="_blank">${data[0].sha.substring(0, 7)}</a>)`
    })

let currentButtonText = 0;
const uselessFunction = uselessButton => {
    let randPhrase = Math.floor(Math.random() * (phrases.length-1));
    randPhrase += randPhrase >= currentButtonText ? 1 : 0;
    currentButtonText = randPhrase;
    uselessButton.value = phrases[randPhrase];
}

// grab a random dad joke
fetch("https://icanhazdadjoke.com/", {
        headers: { 'Accept': 'application/json' }
    })
    .then(d => d.json())
    .then(d => {
        if (d.status === 200) {
            document.getElementById("dad_joke_container").innerHTML = d.joke
        } else {
            document.getElementById("dad_joke_container").innerHTML = "can't fetch dad joke :(("
        }
    })

// Sets cursor to an emoji. Only visible on desktop (or wherever else a regular cursor is visible).
// https://dev.to/kyleakelly/use-emojis-as-cursors-3di0
const animals = ["🦑", "🦊", "🐤", "🐲", "🦋", "🐟", "🦄"]
const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
document.body.style.cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>${randomAnimal}</text></svg>") 16 0,auto`

const barrelRoll = () => {
  document.body.style.cssText += `
        -moz-animation-name: roll;
        -moz-animation-duration: 4s;
        -moz-animation-iteration-count: 1;
        -webkit-animation-name: roll;
        -webkit-animation-duration: 4s;
        -webkit-animation-iteration-count: 1;
      `;

  document.getElementById("barrel_button").style.display = "none";
  document.getElementById("out_of_tokens").style.display = "inline";
};

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark-mode');
};

// cool trickery checkbox https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/
let f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'],
    d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    m = 0;

function loop() {
    let s = '', x = 0;
    checc = document.getElementById('cool-check')
    if (checc.checked) {
        if (!m) {
            while (d[x] == 4) {
                x++;
            }
            if (x >= d.length) m = 1;
            else {
                d[x]++;
            }
        } else {
            while (d[x] == 0) {
                x++;
            }
            if (x >= d.length) m = 0;
            else {
                d[x]++;
                if (d[x] == 8) d[x] = 0;
            }
        }
        d.forEach(function (n) {
            s += f[n];
        });
        location.hash = s;
    }
    setTimeout(loop, 50);
}

loop();

const showSpideyDancing = () => {
    document.getElementById("spideyAudio").play()
    document.getElementById("spidey").style.display = "inline";
    document.getElementById("spidey_button").innerHTML = "You're welcome";
    document.getElementById("spidey_button").style.backgroundColor = "gray";
}

// Rickrolled 
let rick = document.getElementById('rickroll');
let sike = ["AHAAAA!", "ALMOSTT", "BEAT THAT!", "SIKEEE", "TRY ME"]

rick.addEventListener('mouseover', function(event){
    let newtext = Math.floor(Math.random() * (sike.length-1))
    event.target.style.left = Math.random()*70 + "%"
    event.target.style.top = Math.random()*20 + "%"
    event.target.textContent = sike[newtext]
})

const toggleBG = () => {
    let elem = document.getElementById("notice-peter").style; 
    if (elem['background'] != 'url("img/grid.gif")') {
        elem.setProperty('background', "url('img/grid.gif')");
    } else {
        elem.setProperty('background', "rgba(0, 0, 0, .08)");
    }
}
