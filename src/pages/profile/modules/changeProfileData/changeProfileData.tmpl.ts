export default
`<div class="change-profile-data-container">
        <div class="user-avatar">
            <img src="{{userAvatar}}" class="user-avatar__icon">
        </div>

        
        <div class="change-profile-data__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="change-profile-data__buttons">
                <a class="change-profile-data__save" href="/profile">
                {{{saveChanges}}}
                 </a> 
                <a class="change-profile-data__return" href="/profile">
                {{{return}}}
                </a> 
            </div>
        </div>
        
    </div>`;
