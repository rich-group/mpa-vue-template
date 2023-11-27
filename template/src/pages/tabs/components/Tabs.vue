<template>
  <div
    ref="rootRef"
    class="flex flex-col w-full tabs"
  >
    <div class="tab-group">
      <div class="tab-nav">
        <span
          v-for="(tab, index) in tabsProps"
          :key="`${tab.name}_${index}`"
          :ref="(tabRef) => tabRefs[index] = tabRef"
          class="text-[18px] font-[700] text-[#999] cursor-pointer"
          :class="{'ml-[40px]': index, 'selected_tab': tab.name === selectedTabName}"
          @click="changeTab(tab, index, $event)"
        >
          {{ tab.label }}
        </span>
      </div>
      <div
        :style="trackerStyle"
        class="tabs_active_bar"
      />
    </div>
    <div 
      class="tab-content overflow-hidden mt-[33px]"
    >
      <div  
        class="flex flex-row" 
        :style="tabContentStyle"
      >
        <RenderComponent
          v-for="item in childrens"
          :vnode="item"
        />
      </div>
    </div>
  </div>
</template>

{{#if}}
<script lang="ts" setup>
import type { TabProps } from './Tab.vue';
import { useSlots, ref, onMounted, computed } from 'vue';
import RenderComponent from './RenderComponent.vue';
const props = withDefaults(defineProps<{
  animation: boolean,
  duration: number
}>(), {
  animation: false,
  duration: 200
});

const childrens = useSlots()?.default?.() || []; // 传入的 Tab标签
const rootRef = ref();
const tabRefs = ref([]);
const tabsProps = childrens.map(child => child.props as TabProps); // 获取的 Tab标签的props
const selectedTabName = ref(tabsProps[0].name); // 当前选中Tab的名称
const selectedIndex = ref(0); // 当前选中 Tab标签的索引
const tabContentPosition = ref(0); // Tab下content位置
const trackerWidth = ref(0); // 选中下划线宽度
const trackerPosition = ref(0); // 选中下划线的位置
const transitionDuration = ref(0); // 切换动画过渡时间

/**
 * @description 切换Tab标签
 * @param tab 标签对象
 * @param index 当前点击的索引
 * @param e 点击的事件
 */
const changeTab = (tab: TabProps, index: number, e: Event) => {
  const target = e.target as HTMLElement;
  trackerWidth.value = target.getBoundingClientRect().width; // 获取当前点击的tab宽度
  transitionDuration.value = props.animation ? props.duration : 0; // 是否开启动画
  selectedTabName.value = tab.name;
  const direction = (selectedIndex.value > index ? -1 : 1);
  trackerPosition.value = target.getBoundingClientRect().left - rootRef.value.getBoundingClientRect().left; // 获取当前点击的元素在它父元素左边的距离
  tabContentPosition.value -= direction * rootRef.value.getBoundingClientRect().width; // tab对应的内容体移动距离
  selectedIndex.value = index;
};

// 选中项下划线样式
const trackerStyle = computed(() => ({
  width: `${trackerWidth.value}px`,
  transform: `translateX(${trackerPosition.value}px)`,
  'transition-duration': `${transitionDuration.value}ms`
}));

// tab内容当前位置
const tabContentStyle = computed(() => ({
  transform: `translateX(${tabContentPosition.value}px)`,
  'transition-duration': `${transitionDuration.value}ms`
}));

onMounted(() => {
  trackerWidth.value = (tabRefs.value[selectedIndex.value] as HTMLElement)?.getBoundingClientRect?.()?.width;
});

</script>
{{else}}
<script setup>
import type { TabProps } from './Tab.vue';
import { useSlots, ref, onMounted, computed } from 'vue';
import RenderComponent from './RenderComponent.vue';
const props = defineProps({
  animation: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 200
  }
});

const childrens = useSlots()?.default?.() || []; // 传入的 Tab标签
const rootRef = ref();
const tabRefs = ref([]);
const tabsProps = childrens.map(child => child.props); // 获取的 Tab标签的props
const selectedTabName = ref(tabsProps[0].name); // 当前选中Tab的名称
const selectedIndex = ref(0); // 当前选中 Tab标签的索引
const tabContentPosition = ref(0); // Tab下content位置
const trackerWidth = ref(0); // 选中下划线宽度
const trackerPosition = ref(0); // 选中下划线的位置
const transitionDuration = ref(0); // 切换动画过渡时间

/**
 * @description 切换Tab标签
 * @param tab 标签对象
 * @param index 当前点击的索引
 * @param e 点击的事件
 */
const changeTab = (tab, index, e) => {
  const target = e.target;
  trackerWidth.value = target.getBoundingClientRect().width; // 获取当前点击的tab宽度
  transitionDuration.value = props.animation ? props.duration : 0; // 是否开启动画
  selectedTabName.value = tab.name;
  const direction = (selectedIndex.value > index ? -1 : 1);
  trackerPosition.value = target.getBoundingClientRect().left - rootRef.value.getBoundingClientRect().left; // 获取当前点击的元素在它父元素左边的距离
  tabContentPosition.value -= direction * rootRef.value.getBoundingClientRect().width; // tab对应的内容体移动距离
  selectedIndex.value = index;
};

// 选中项下划线样式
const trackerStyle = computed(() => ({
  width: `${trackerWidth.value}px`,
  transform: `translateX(${trackerPosition.value}px)`,
  'transition-duration': `${transitionDuration.value}ms`
}));

// tab内容当前位置
const tabContentStyle = computed(() => ({
  transform: `translateX(${tabContentPosition.value}px)`,
  'transition-duration': `${transitionDuration.value}ms`
}));

onMounted(() => {
  trackerWidth.value = (tabRefs.value[selectedIndex.value])?.getBoundingClientRect?.()?.width;
});

</script>
{{/if}}

<style lang="scss">
.tabs {
  .selected_tab {
    color: #1f1f1f;
  }

  .tabs_active_bar {
    height: 3px;
    background: #1f1f1f;
  }
}

</style>