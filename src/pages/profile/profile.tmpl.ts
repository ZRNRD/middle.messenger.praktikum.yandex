export default
`<div class="profile-container">
        <div class="user-avatar">
            <img src="{{userAvatar}}" class="user-avatar__icon">
        </div>

        <div class="profile__name">{{profileName}}</div>
        
        <div class="profile__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="profile__buttons">
                <a class="profile__change-data" href="/changeProfileData">
                    <span>{{changeData}}</span>
                </a> 
                <a class="profile__change-password" href="/changeProfilePassword">
                    <span>{{changePassword}}</span>
                </a>
                {{{logout}}} 
            </div>
        </div>
        
    </div>`;
