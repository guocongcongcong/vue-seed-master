// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // 必须在最开始引入垫片
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueParticles from 'vue-particles'
import i18n from './lang' // Internationalization
import * as utils from '@/utils'
import 'font-awesome/less/font-awesome.less'
// 引入定制标题的指令
import 'directives/customTitle.js'
// 在入口处引入模拟的假数据
import '@/mock'
//glw添加的公共js
import common from './common/common.js'

// 这里只引入了部分饿了么组件
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
    Notification
  } from 'element-ui';
  
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Checkbox);
  Vue.use(CheckboxButton);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
  Vue.use(TimeSelect);
  Vue.use(TimePicker);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Tree);
  Vue.use(Alert);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Progress);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Step);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Cascader);
  Vue.use(ColorPicker);
  Vue.use(Transfer);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Footer);




Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
Vue.use(VueParticles)

//加载公共函数
Vue.prototype.$common = common

// Vue 的全局配置
Vue.config.productionTip = false

// 上线全局请求配置
axios.defaults.baseURL = 'api/v1/'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // 如果本地存储中有token字段， 就为所有请求加上Authorization请求头
        if (localStorage.token) {
            config.headers["Authorization"] = `Bearer ${localStorage.token}`
        }
        return config;
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // 如果后端返回没有权限
                case 401:
                    // 清除token信息并跳转到登录页面
                    localStorage.clear()
                    router.replace("/signin");
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
)

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    template: '<App/>',
    components: { App }
})