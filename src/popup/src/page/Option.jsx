import React, {useState} from 'react';
import SwitchView from '../view/SwitchView';
export default function Option({isDisabled, setWebdict, setYuelang, contxt}) {
  const [webdictDisabled, yuelangDisabled] = isDisabled();
  const [count, setCount] = useState(0);
  console.log('count', count);
  return (
    <div>
      <SwitchView
        text="启用网词快查"
        disabled={webdictDisabled}
        onClick={() => {
          setWebdict(!webdictDisabled);
          setCount(count + 1);
        }}
      />
      <SwitchView
        text="显示粤语拼音"
        disabled={yuelangDisabled}
        onClick={() => {
          setYuelang(!yuelangDisabled);
          setCount(count + 1);
        }}
      />
    </div>
  );
}
