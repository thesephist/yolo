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
