# `snack-bar`

### 注：

- 该组件全局只允许存在一个，创建新的时，会强制销毁上一个（无动画）

- 组件实现方式为 `Vue.extend`， 挂载在 `body` 元素上

## 引用

- 方式一

```typescript
// 直接获取实例
import SnackBar, { IOptions } from '@mfelibs/aio-snack-bar';

SnackBar.show(...)
```

- 方式二

```typescript
import SnackBar, { IOptions } from '@mfelibs/aio-snack-bar';
// 可以使用 Vue.use(SnackBar) 全局注册
Vue.use(SnackBar)

// 子组件使用
this.$SnackBar.show(...)
```

## 方法

- 展示组件

```typescript
SnackBar.show(<IOptions>{
  content: '测试的content', // SnackBar 的文案
  btnText: '关注', // 按钮文案
  icon:
    'https://img2.baidu.com/it/u=1954131356,3549453457&fm=26&fmt=auto&gp=0.jpg', // 使用线上地址或者   require(‘相对路径’)
  distance: 200, // 弹起的距离单位 px
  duration: 2000, // 显示多长时间（ms） 默认为 3000，传 0 则不消失
  transitionDuration: 500, // 动画执行时间（ms）默认 500
  iconBorderRadius: '10px', // icon 的圆角，会透传到行内样式
  commentBarHeight: 75, // 因为 ios 和 android webview 不一样 需要通过该参数纠正
  onClickButton: () => {
    // 点击按钮回调
    console.log(`[SnackBar] onClickButton cb`);
  },
  onClose: () => {
    // snackbar 消失回调
    console.log(`[SnackBar] onClose cb`);
  },
  onUserClickClose: () => {
    // 用户点击关闭 snackBar 回调
    console.log(`[SnackBar] onUserClickClose cb`);
  }
});
```

- 关闭组件

```typescript
SnackBar.close();
```

- 检测页面是否存在显示的 `snackBar`

```typescript
SnackBar.checkExist();
```
