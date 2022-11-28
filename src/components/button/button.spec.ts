import { expect } from 'chai';
import Button from './button';
import { TButton } from '../../utils/types';

describe('Проверяем компоненту Button', () => {
  const createButton = (context: TButton) => {
    const btn = new Button(context);
    return btn.transformToString();
  };

  it('Проверяем отрисовку компонента', () => {
    const context = { title: 'Отмена', className: 'back-chat-button' };
    const btn = createButton(context);
    // eslint-disable-next-line no-unused-expressions
    expect(btn).to.not.be.null;
  });
});
