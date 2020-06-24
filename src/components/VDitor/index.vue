<!-- @autor hu-snail -->
<template>
  <div ref="v-ditor" class="v-ditor" />
</template>

<script>
import 'vditor/src/assets/scss/index.scss'
import MixinData from './index'
export default {
  mixins: [MixinData]
}
</script>
<style lang='scss' scoped>
.v-ditor{
    height: 100vh;
    overflow-y: auto;
    border: 0!important;
    &::-webkit-scrollbar {
                width: 0px!important;
            }
    >>> {
        .vditor-toolbar{
            border-bottom-color: #f2f6fc;
        }
    }
}
</style>
