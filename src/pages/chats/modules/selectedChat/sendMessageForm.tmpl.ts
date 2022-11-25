export default
`<div class="add-file">
    <img class="add-file__icon" src="{{addFileIcon}}" alt="add-file-icon">
    {{{addFileButton}}}
  </div>
  <div class="message-input">
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  <div class="send-message">
    <img class="send-message__icon" src="{{sendMessageIcon}}" alt="send-message-icon">
    {{{buttons.sendMessageButton}}}
  </div>
</div>`;
