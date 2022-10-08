export default
    `<div class="login-container">
        <div class="login">
            <div class="login__header">
                <span class="login__header-title">Вход</span>
            </div>
            <div class="login__form">
                {{{loginInput}}}
                {{{passwordInput}}}
            </div>
            <div class="login__buttons-panel">
                <a href="/notSelectedChat">
                    {{{button}}}
                </a>
                <a class="signin-link" href="/signin">
                    <span class="signin-link-title">{{linkTitle}}</span>
                </a>
            </div>
        </div>
    </div>
    `;