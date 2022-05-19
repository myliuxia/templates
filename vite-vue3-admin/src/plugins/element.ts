/**
 * @description 按需引入element-plus库
 */
import {
  ElAside,
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElScrollbar,
  ElBreadcrumb,
  ElBreadcrumbItem
} from 'element-plus';

const components = [
  ElAside,
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElScrollbar,
  ElBreadcrumb,
  ElBreadcrumbItem
];

const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification];

export const setupElement = (app: any, options = {}) => {
  // 全局注册组件
  components.forEach((component) => {
    app.component(component.name, component);
  });

  // 注册element-plus services
  plugins.forEach((plugin) => {
    app.use(plugin);
  });

  // 设置全局option，默认 {}
  app.config.globalProperties.$ELEMENT = options;
};