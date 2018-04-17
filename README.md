# c-pubsub

simple publish/subscribe mode. 一套发布订阅模式，可快速的订阅及发布事件。

## Insatll

```bash
npm i -S c-pubsub
```

## Usage


- `pubsub.on(EVENT, fn)` 订阅 EVENT 事件。

- `pubsub.one(EVENT, fn)` 只订阅一次 EVENT 事件。

- `pubsub.emit(EVENT, data)` 发布事件 EVENT。

- `pubsub.off(EVENT, fn)` 取消一个事件订阅。fn 与 `pubsub.on(EVENT, fn)` 中的 fn 为同一个函数。

- `pubsub.offAll(EVENT)` 会卸载该事件下的所有事件监听程序。


## Example

### 订阅与发布

```js
import pubsub from 'c-pubsub';

// 订阅事件
pubsub.on('event', (arg) => {
  console.log(arg);
});

// 发布事件
pubsub.emit('event', 'Hello');

// Hello
```

`pubsub.one` 也可以订阅一次性事件，监听到一次事件后就会自动卸载事件。

```js
pubsub.one('event', (arg) => {
  console.log(arg);
});

pubsub.emit('event', 'Hello'); // Hello

pubsub.emit('event', 'Hello'); // 已经自动卸载过事件了，所不会有反应。
```

### 卸载事件订阅

卸载一个事件监听程序。

```js
import pubsub from 'c-pubsub';

const fn1 = () => {
    console.log('fn1 be called');
};
const fn2 = () => {
    console.log('fn2 be called');
};

pubsub.on('event', fn1);
pubsub.on('event', fn2);

pubsub.off('event', fn1);  // 卸载了 fn1 事件监听程序

pubsub.emit('event');

// fn2 be called

```

卸载一个事件下的所有事件监听程序

```js
pubsub.on('event', (arg) => {
  console.log('1', arg);
});

pubsub.on('event', (arg) => {
  console.log('2', arg);
});

pubsub.one('event', (arg) => {
  console.log('3', arg);
});

pubsub.offAll('event'); // 卸载了 event 事件下所有的事件监听程序

pubsub.emit('event', 'Hello'); // 不会有任何反应，因为所有监听 event 的回调函数都被卸载了。
```
