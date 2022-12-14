import { Dictionary } from '../utils/types';

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

const render = (block: any) => {
  const root: HTMLElement | null = document.getElementById('root');
  if (root) root.innerHTML = block.transformToString();
};

export class Route {
  _pathname: string;

  _blockClass: any;

  _block: null | Dictionary;

  _props: Dictionary;

  constructor(pathname: string, view: Dictionary, props: Dictionary) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(this._props.context);
    render(this._block);
  }
}
