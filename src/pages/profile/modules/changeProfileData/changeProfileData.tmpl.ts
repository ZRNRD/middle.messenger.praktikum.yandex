export default
`<div class="change-profile-data-container">
        <div class="user-avatar">
            <img src="{{userAvatar}}" class="user-avatar__icon" id="avatar">
            {{{avatartInput}}}
        </div>

        
        <div class="change-profile-data__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="change-profile-data__buttons">
                {{{saveChanges}}}
                {{{return}}}
            </div>
        </div>
        
    </div>`;
