export default
    `<div class="current-chat__selected">
        <header class="current-chat__header">
            <div class="user-avatar-container">
                <img class="user-avatar-icon" src="{{userAvatar}}">
            </div>
            <div class="current-chat-title">{{chatTitle}}</div>
            <div class="current-chat-settings">
                <img class="current-chat-settings__icon" src="{{chatSettingsIcon}}">
            </div>
        </header>
        <div class="current-chat__main"></div>
        <footer class="current-chat__footer">
            <div class="add-file">
                <img class="add-file__icon" src="{{addFileIcon}}">
            </div>
            <div class="message-input">
                {{{message}}}
            </div>
            <div class="send-message">
                <img class="send-message__icon" src="{{sendMessageIcon}}">
            </div>
        </footer>
    </div>`;