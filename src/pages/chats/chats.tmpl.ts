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
                        <a class="profile__link" href="/selectedChat">
                            <li class="chat-list__item">
                                <div class="chat-list__item-image">
                                    <img src="{{userAvatar}}" class="chat-list__item-icon">
                                </div>
                                <div class="chat-list__item-data">
                                    <div class="chat-list__item-name">{{this.name}}</div>
                                    <div class="chat-list__item-message">{{this.message}}</div>
                                </div>
                            </li>
                        </a>
                    {{/each}}
                </ul>
            </div>
            {{{currentChat}}}
        </div>
    </div>`;
