export default
`<div class="login-container">
    <div class="login">
        <div class="login__header">
            <span class="login__header-title">Вход</span>
        </div>
        <div class="login__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="login__buttons">
                {{{button}}}
            <a class="signin-link" href="/signin">
                <span class="signin-link__title">{{linkTitle}}</span>
            </a>
        </div>
    </div>
</div>
`;
