export default
    `<div class="{{inputContainerClassName}}">
        {{#if label}}
            <label for="{{name}}" class="input__label">{{label}}</label>
        {{/if}}
        
        <input class="{{inputClassName}}" 
            type="{{type}}" name="{{name}}" 
            value="{{value}}" placeholder="{{placeholder}}" 
            required={{required}} 
            {{#if disabledInput }}disabled{{/if}}
        />
        <div class="error-message hidden">
            {{errorMessage}}
        </div>
    </div>`;