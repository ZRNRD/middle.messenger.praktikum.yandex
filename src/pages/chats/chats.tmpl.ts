export default
`<div class="chat-page">
        <div class="chat-page__container">
            <div class="chat-list-container">
                <div class="profile">
                    <a class="profile__link" href="/profile">
                        <span class="profile__link-title">{{profileTitle}}</span>
                    </a>
                </div>
                <div class="search-input">
                    {{{searchInput}}}
                </div>
                {{{createChat}}}
                <div class="chat-form hidden" id="chat-form">
                    <div class="chat-form-title">{{newChatTitle}}</div>
                    {{{chatForm}}}
                </div>
                
                <ul class="chat-list">
                    {{#each dialogs}}
                        {{{this}}}
                    {{/each}}
                </ul>
            </div>
            {{{currentChat}}}
        </div>
    </div>`;
