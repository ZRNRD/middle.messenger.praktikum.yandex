export default
`<div class="password-container">
        <div class="user-avatar">
            <img src="{{userAvatar}}" class="user-avatar__icon">
        </div>

        
        <div class="password__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="password__buttons">
                <a class="password__save" href="/profile">
                {{{saveChanges}}}
                 </a> 
                <a class="password__return" href="/profile">
                {{{return}}}
                </a> 
            </div>
        </div>
        
    </div>`;
