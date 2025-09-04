import { onBeforeUnmount } from "vue";

const allEvents = new Map(); // 事件池

// 事件触发
function eventEmit(eventType, evt) {
  // 判断：事件池中是否有当前类型的事件
  const handlers = allEvents.get(eventType);
  // 事件池中有当前触发事件，则执行该事件的所有hanlder
  if (handlers) {
    handlers.slice().map((handler) => handler(evt));
  }
  // 没有，则不做任何处理
}

// 事件监听
function eventOn(eventType, handler) {
  // 判断：事件池中是否有当前类型的事件
  const handlers = allEvents.get(eventType);
  if (handlers) {
    // 事件池中有当前监听的事件，则向该事件的handlers中添加一个handler
    handlers.push(handler);
  } else {
    // 事件池中没有当前监听的事件，则向事件池中添加该事件及handler集合
    allEvents.set(eventType, [handler]);
  }
}

// 事件移除
function eventOff(eventType, handler) {
  // 判断：事件池中是否有当前类型的事件
  const handlers = allEvents.get(eventType);
  if (handlers) {
    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
  } else {
    //
  }
}

export function useEvent() {
  return {
    all: allEvents, // 可以调用map上的方法
    on: eventOn,
    emit: eventEmit,
  };
}

onBeforeUnmount(() => {
  console.log("unmount");
});
