export default
    `<div class="signin-container">
        <div class="signin">
            <div class="signin__header">
                <span class="signin__header-title">Создание профиля</span>
            </div>
            <div class="signin__form">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="signin__buttons">
                <a href="/notSelectedChat">
                    {{{button}}}
                </a>
                <a class="signin__login-link" href="/login">
                    <span class="signin__login-link-title">{{linkTitle}}</span>
                </a>
            </div>
        </div>
    </div>`;