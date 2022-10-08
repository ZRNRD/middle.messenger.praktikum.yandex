export default
    `<div class="current-chat__selected">
        <header class="current-chat__header">
            <div class="current-chat__header-image">
                <img src="{{userAvatar}}" class="current-chat__header-icon">
            </div>
            <div class="current-chat-name">{{chatTitle}}</div>
            <div class="chat-settings">
                <img src="{{chatSettingsIcon}}" class="chat-settings__icon">
            </div>
        </header>
        <div class="current-chat__main"></div>
        <footer class="current-chat__footer">
            <div class="add-file-button">
                <img src="{{addFileIcon}}" class="add-file-button__icon">
            </div>
            <div class="message-input">
                {{{message}}}
            </div>
            <div class="send-message">
                <img src="{{sendMessageIcon}}" class="send-button__icon">
            </div>
        </footer>
    </div>`;