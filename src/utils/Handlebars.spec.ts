import 'mocha';
import { assert } from 'chai';
import * as Handlebars from 'handlebars';

describe('Проверяем Handlebars', () => {
  it('Проверяем компиляцию шаблона', () => {
    const template = Handlebars.compile('<div class="{{ className }}">{{ text }}<div>');
    const context = {
      className: 'SomeClass',
      text: 'Some text',
    };
    assert.equal(
      template(context),
      '<div class="SomeClass">Some text<div>',
    );
  });
});
