<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="toggle" v-show="isEditing"  ref="inputRef"/>
    <span v-show="!isEditing" @click="toggle" class="text">{{ modelValue }}</span>
</template>

<script>
import { nextTick } from 'vue';
export default {
    name: 'ClickToEdit',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    data () {
        return {
            isEditing: false
        }
    },
    methods: {
        toggle () {
           this.isEditing=!this.isEditing
           if(this.isEditing)
           {
            nextTick(() => {
                this.$refs.inputRef.focus();
            })
           }
        }
        
        
    }
}
</script>
<style scoped>
.text{
    cursor: pointer;
}

input {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}
</style>
