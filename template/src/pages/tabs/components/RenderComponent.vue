<script>
import { h } from 'vue';
export default {
  props: ['vnode'],
  setup (props ) {
    return () => [
      h('div', {style: {width: '100%', 'flex-shrink': 0}}, props.vnode)
    ];
  }
};
</script>