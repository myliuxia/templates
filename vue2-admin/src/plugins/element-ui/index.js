import {
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  ColorPicker,
  Alert,
  Cascader,
  Form,
  FormItem,
  Input,
  Button,
  ButtonGroup,
  Notification,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tooltip,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  RadioButton,
  Dialog,
  Drawer,
  MessageBox,
  Row,
  Col,
  Table,
  TableColumn,
  Loading,
  Pagination,
  Popover,
  Checkbox,
  CheckboxGroup,
  Tree,
  Switch,
  Select,
  Option,
  InputNumber,
  Message,
  Upload,
  DatePicker,
  TimePicker,
  TimeSelect,
  Progress,
  Tag,
  Autocomplete,
  Breadcrumb,
  BreadcrumbItem,
  Steps,
  Step,
  Badge,
} from 'element-ui'

Tooltip.props.hideAfter.default = 0
export default Vue => {
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)
  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(Carousel.name, Carousel)
  Vue.component(CarouselItem.name, CarouselItem)
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapseItem.name, CollapseItem)
  Vue.component(ColorPicker.name, ColorPicker)
  Vue.component(Alert.name, Alert)
  Vue.component(Cascader.name, Cascader)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Input.name, Input)
  Vue.component(Button.name, Button)
  Vue.component(ButtonGroup.name, ButtonGroup)
  Vue.component(Menu.name, Menu)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(MenuItemGroup.name, MenuItemGroup)
  Vue.component(Submenu.name, Submenu)
  Vue.component(Tooltip.name, Tooltip)
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabPane.name, TabPane)
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownItem.name, DropdownItem)
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(RadioButton.name, RadioButton)
  Vue.component(Dialog.name, Dialog)
  Vue.component(Drawer.name, Drawer)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Popover.name, Popover)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Tree.name, Tree)
  Vue.component(Switch.name, Switch)
  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
  Vue.component(InputNumber.name, InputNumber)
  Vue.component(Radio.name, Radio)
  Vue.component(Upload.name, Upload)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(TimePicker.name, TimePicker)
  Vue.component(TimeSelect.name, TimeSelect)
  Vue.component(Progress.name, Progress)
  Vue.component(Tag.name, Tag)
  Vue.component(Autocomplete.name, Autocomplete)

  Vue.component(Steps.name, Steps)
  Vue.component(Step.name, Step)
  Vue.component(Badge.name, Badge)

  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = (...args) => MessageBox(...args)
  Vue.prototype.$confirm = (...args) => MessageBox.confirm(...args)
  Vue.prototype.$alert = (...args) => MessageBox.alert(...args)
  Vue.prototype.$prompt = (...args) => MessageBox.prompt(...args)
  Vue.prototype.$message = (...args) => Message(...args)
  Vue.prototype.$success = message =>
    Message({
      message,
      type: 'success',
    })
  Vue.prototype.$warning = message =>
    Message({
      message,
      type: 'warning',
    })
  Vue.prototype.$error = message =>
    Message({
      message,
      type: 'error',
    })
  Vue.prototype.$info = message =>
    Message({
      message,
      type: 'info',
    })

  Vue.prototype.$notify = Notification
}
