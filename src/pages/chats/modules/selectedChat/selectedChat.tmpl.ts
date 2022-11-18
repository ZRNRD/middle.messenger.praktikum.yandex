export default
`<div class="current-chat__selected">
        <header class="current-chat__header">
            <div class="user-avatar-container">
                <img class="user-avatar-icon" src="{{userAvatar}}" alt="user-avatar">
            </div>
            <div class="current-chat-title">{{chatTitle}}</div>
            <div class="current-chat-settings">
                <img class="current-chat-settings__icon" src="{{chatSettingsIcon}}" alt="settings-icon">
                {{{showMenu}}}
            </div>
            <div class="current-chat-settings__menu hidden">
                {{{addNewUser}}}
                {{{deleteUser}}}
                {{{deleteChatButton}}}
            </div>
            
        </header>
        <div class="users-list">
                {{#each users}}
                    <div class="user-item">
                        {{{this}}}
                    </div>
                {{/each}}
            </div>
        <div class="add-user-form hidden" id="add-user-form">
            {{{addUserForm}}}
        </div>
        <div class="delete-user-form hidden" id="delete-user-form">
            {{{deleteUserForm}}}
        </div>
        <div class="delete-chat-form hidden" id="delete-chat-form">
            {{{deleteChatForm}}}
        </div>
        <div class="current-chat__main"></div>
        <footer class="current-chat__footer">
            <div class="add-file">
                <img class="add-file__icon" src="{{addFileIcon}}" alt="add-file-icon">
            </div>
            <div class="message-input">
                {{{message}}}
            </div>
            <div class="send-message">
                <img class="send-message__icon" src="{{sendMessageIcon}}" alt="send-message-icon">
            </div>
        </footer>
        
    </div>`;
