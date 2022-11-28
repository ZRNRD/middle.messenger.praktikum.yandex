export default
`   <div class="user-avatar">
        <img src="{{userAvatar}}" class="user-avatar__icon" id="avatar" alt="user-avatar">
        {{{avatartInput}}}
    </div>

    
    <div class="change-profile-data__form">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        <div class="change-profile-data__buttons">
            {{{saveChanges}}}
        </div>
    </div>`;
