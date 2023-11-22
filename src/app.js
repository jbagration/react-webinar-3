import React from 'react';
import './styles.css';

function getHighlightText(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if ((lastTwoDigits >= 11 && lastTwoDigits <= 19) || lastDigit === 0 || (lastDigit >= 5 && lastDigit <= 9)) {
    return 'раз';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'раза';
  } else {
    return 'раз';
  }
}

function App({ store }) {
  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map(item => (
            <div key={item.code} className={`List-item Item${item.selected ? ' Item_selected' : ''}`} onClick={() => store.selectItem(item.code)}>
              <div className='Item-code'>{item.code}</div>
              <div className='Item-title'>
                {item.title} {item.highlightCount > 0 && `| Выделяли ${item.highlightCount} ${getHighlightText(item.highlightCount)}`}
              </div>
              <div className='Item-actions'>
                <button onClick={() => store.deleteItem(item.code)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;