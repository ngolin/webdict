import { h, render, Component } from 'preact';
import get from './locales';
import tree from 'hife/tree';
import { BGWindow } from '../background';
import { OptionProps } from '.';
import './style.scss';
const locale = get(chrome.i18n.getUILanguage());
interface AppState extends OptionProps {
  loading: boolean;
}
class App extends Component<any, AppState> {
  private bgpage: BGWindow;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      on: false,
      zh: false,
      en: false,
      jp: false,
    };
  }
  componentDidMount() {
    document.title = locale.title;
    chrome.runtime.getBackgroundPage((bgpage: BGWindow) => {
      this.setState({ ...bgpage.getOptions(), loading: false });
      this.bgpage = bgpage;
    });
  }
  onChange = ({ target: { name, checked } }) => {
    if (this.state.loading) return;
    this.setState({ [name]: checked } as any, () => {
      this.bgpage.setOptions(name, checked);
    });
  };
  render() {
    return (
      <div className={tree({ options: { loading: this.state.loading } })}>
        {locale.options.map(({ desc, opts, head }) => (
          <Item
            desc={desc}
            opts={opts}
            head={head}
            state={this.state}
            onChange={this.onChange}
          />
        ))}
      </div>
    );
  }
}

function Item({ desc, opts, head, state, onChange }) {
  const disabled = opts[0].name !== 'on' && !state.on;
  const sopt = opts.map(sopt => (
    <div class="options-item-form-item">
      <Label
        {...sopt}
        value={state[sopt.name]}
        disabled={disabled || (sopt.name === 'jp' && !state.zh)}
        onChange={onChange}
      />
    </div>
  ));

  return (
    <div class={tree(['options-item', { disabled }])}>
      <h4>{opts.length > 1 ? head : sopt}</h4>
      <p>{desc}</p>
      {opts.length > 1 && <div class="options-item-form">{sopt}</div>}
    </div>
  );
}

function Label({ name, title, value, onChange, disabled }) {
  return (
    <label for={name} className={tree({ disabled })}>
      <input
        style={{ cursor: 'pointer' }}
        type="checkbox"
        disabled={disabled}
        name={name}
        id={name}
        checked={value}
        onChange={onChange}
      />{' '}
      {title}
    </label>
  );
}

render(<App />, document.getElementById('root'));
