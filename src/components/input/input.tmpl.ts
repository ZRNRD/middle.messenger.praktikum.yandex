export default
`<div class="{{inputContainerClassName}}">
        {{#if label}}
            <label for="{{name}}" class="input__label">{{label}}</label>
        {{/if}}
        
        <input class="{{inputClassName}}" 
            type="{{type}}" name="{{name}}" 
            value="{{value}}" placeholder="{{placeholder}}" 
            {{#if required}}
                required={{required}}
            {{/if}}
            {{#if disabledInput }}disabled{{/if}}
            data-id="{{id}}"
            data-type="{{dataType}}"
        />
        <div class="error-message hidden-error">
            {{errorMessage}}
        </div>
    </div>`;
