# c-pubsub

simple publish/subscribe mode. 一套发布订阅模式，可快速的订阅及发布事件。

## Insatll

```bash
npm i -S c-pubsub
```

## Usage

`pubsub.on` 订阅事件， `pubsub.emit` 发布事件

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

`pubsub.off` 可以卸载事件，会卸载该事件下的所有回调。

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

pubsub.off('event'); // 卸载了 event 事件

pubsub.emit('event', 'Hello'); // 不会有任何反应，因为所有监听 event 的回调函数都被卸载了。
```
