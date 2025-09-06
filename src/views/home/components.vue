<template>
  <div class="text-base-color-switch">
    <p class="text-xs bg-stone-100 dark:bg-stone-600 px-2 py-1">
      这里列出了个人博客封装使用的组件集合，后续会逐渐扩展成一个UI项目，单独分离出来。
    </p>
    <hr />
    <h4 class="font-semibold">Button 按钮</h4>
    <Button>默认按钮</Button>
    <Button type="primary">主题按钮</Button>
    <Button type="danger">重要按钮</Button>
    <Button type="link">链接按钮</Button>
    <p>小号按钮</p>
    <Button size="small">默认按钮</Button>
    <Button type="primary" size="small">主题按钮</Button>
    <Button type="danger" size="small">重要按钮</Button>
    <Button type="link" size="small">链接按钮</Button>
    <p>大号按钮</p>
    <Button size="large">默认按钮</Button>
    <Button type="primary" size="large">主题按钮</Button>
    <Button type="danger" size="large">重要按钮</Button>
    <Button type="link" size="large">链接按钮</Button>
    <p>按钮形状</p>
    <Button>普通按钮</Button>
    <Button shape="round">圆角按钮</Button>
    <span>图标按钮：</span
    ><Button shape="circle"
      ><svg
        t="1756468524039"
        class="icon w-4 h-4 cursor-pointer"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1582"
        @click="showQRCode = true"
      >
        <path
          d="M966.15104 616.86272c0-130.64448-129.43488-236.07744-273.6288-236.07744-152.13888 0-272.49024 105.43296-272.49024 236.07744 0 130.64256 120.35136 236.06976 272.49024 236.06976 32.92416 0 64.71744-10.31424 97.63968-17.18592l86.29056 49.27488-22.704-82.51392c63.58272-46.99008 112.40256-112.30464 112.40256-185.6448z m-362.19264-42.4128c-15.8976 0-31.78752-14.89728-31.78752-29.7888 0-18.33984 15.8976-33.23136 31.78752-33.23136 23.84832 0 40.87488 14.89728 40.87488 33.23136 0.00192 14.89152-17.02656 29.7888-40.87488 29.7888z m178.26048 0c-17.03232 0-31.79136-14.89728-31.79136-29.7888 0-18.33984 14.76096-33.23136 31.79136-33.23136 22.70592 0 39.73824 14.89728 39.73824 33.23136 0 14.89152-17.03424 29.7888-39.73824 29.7888z"
          fill="#2D333A"
          p-id="1583"
        ></path>
        <path
          d="M673.2224 362.4512c9.0816 0 19.30176 1.14048 30.65664 3.44256-27.24672-132.94656-166.9056-226.91712-323.58336-226.91712-177.11808 0-322.44672 119.18208-322.44672 275.03808 0 88.24704 47.68896 160.44864 128.30208 217.7376l-32.93568 98.56128 114.67392-58.45056c39.73632 11.46816 70.39488 18.33984 112.4064 18.33984 9.0816 0 19.30752 0 28.3872-1.14048-5.67552-22.9248-9.07968-44.70144-9.07968-68.7648 0-140.95872 119.20896-257.8464 273.6192-257.8464z m-173.712-85.95648c24.9792 0 40.87488 14.89728 40.87488 40.1088 0 24.07104-15.89568 40.11072-40.87488 40.11072-23.84256 0-46.55424-16.032-46.55424-40.11072 0-25.21344 22.71168-40.1088 46.55424-40.1088z m-224.80704 80.22528c-23.84256 0-48.82176-16.04544-48.82176-40.1184 0-25.21344 24.9792-40.1088 48.82176-40.1088 22.70976 0 40.87488 14.89728 40.87488 40.1088 0 24.07296-18.16512 40.1184-40.87488 40.1184z"
          fill="#2D333A"
          p-id="1584"
        ></path></svg
    ></Button>
    <Button block type="primary">block 按钮</Button>
    <hr class="mt-1" />
    <h4 class="font-semibold">Tag 标签</h4>
    <Tag>标签1</Tag>
    <Tag type="info">标签2</Tag>
    <Tag type="success">标签3</Tag>
    <Tag type="warning">标签4</Tag>
    <Tag type="danger">标签5</Tag>
    <p>线框标签</p>
    <Tag bordered>标签1</Tag>
    <Tag bordered type="info">标签2</Tag>
    <Tag bordered type="success">标签3</Tag>
    <Tag bordered type="warning">标签4</Tag>
    <Tag bordered type="danger">标签5</Tag>
    <p>标签形状</p>
    <Tag>方角标签</Tag>
    <Tag circle>圆角标签</Tag>
    <Tag circle closable>圆角标签</Tag>
    <p>其他类型</p>
    <Tag closable>带关闭按钮</Tag>
    <Tag checkable>可选标签</Tag>
    <Tag color="orange">自定义颜色</Tag>
    <Tag color="skyblue">自定义颜色</Tag>
    <hr class="mt-1" />
    <h4 class="font-semibold">Switch 切换</h4>
    <span>受控：</span><Switch :checked="check" />
    <Button @click="check = !check">切换</Button>
    <span>非受控：</span><Switch />
    <p>小号切换</p>
    <Switch size="small" />
    <br />
    <span>初始默认值：</span><Switch defaultChecked /> <span>禁用：</span><Switch disabled />
    <hr class="mt-1" />
    <h4 class="font-semibold">Select 下拉选择</h4>
    <span>单选模式：</span><Select v-model:value="value1" :options="options" />
    <span>多选模式：</span><Select v-model:value="value2" mode="multiple" :options="options" />
    <span>标签模式（可添加新选项）：</span
    ><Select v-model:value="value3" mode="tag" :options="options" />
    <span>小号选择器</span>
    <Select v-model:value="value1" :options="options" size="small" />
    <span>大号选择器</span>
    <Select v-model:value="value2" :options="options" mode="multiple" size="large" />
    <hr class="mt-1" />
    <h4 class="font-semibold">Input 输入框</h4>
    <Input />
    <hr class="mt-1" />
    <h4 class="font-semibold">DatePicker 日期选择器</h4>
    <DatePicker v-model:value="date" />
    <hr class="mt-1" />
    <h4 class="font-semibold">Modal 模态框</h4>
    <Modal v-model:open="open" title="标题">这是一个模态框</Modal>
    <Button @click="open = true">open Modal</Button>
    <hr class="mt-1" />
    <h4 class="font-semibold">Form 表单</h4>
    <p>水平布局</p>
    <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <FormItem label="Account">
        <Input v-model:value.trim="loginObj.loginId" autofocus />
      </FormItem>
      <FormItem label="Password">
        <Input v-model:value.trim="loginObj.loginPwd" type="password" />
      </FormItem>
    </Form>
    <p>垂直布局</p>
    <Form layout="vertical" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <FormItem label="Account">
        <Input v-model:value.trim="loginObj.loginId" autofocus />
      </FormItem>
      <FormItem label="Password">
        <Input v-model:value.trim="loginObj.loginPwd" type="password" />
      </FormItem>
    </Form>
    <p>label 对齐位置</p>
    <Form labelAlign="right" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <FormItem label="Account">
        <Input v-model:value.trim="loginObj.loginId" autofocus />
      </FormItem>
      <FormItem label="Password">
        <Input v-model:value.trim="loginObj.loginPwd" type="password" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import DatePicker from "@/components/DatePicker.vue";
import Button from "@/components/uc/Button.vue";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
import Modal from "@/components/uc/Modal.vue";
import Select from "@/components/uc/Select.vue";
import Switch from "@/components/uc/Switch.vue";
import Tag from "@/components/uc/Tag.vue";

const check = ref(true);
const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const options = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
];
const open = ref(false);
const date = ref(null);
const loginObj = reactive({
  loginId: "",
  loginPwd: "",
});
</script>

<style scoped></style>
