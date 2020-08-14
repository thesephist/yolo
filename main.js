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
            font-size: .8em;
            width: 8em;
        " target="_blank" noreferer noopener>
            <img src="${this.avatarURL}"
                style="
                    height: 50px;
                    width: 50px;
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

for(let i = 0; i<10; i++){
  alert(`${9-i} more to go!`)
}