<template>
     <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-star.svg" alt="" /> 其他经历
      </div>
      <div class="entry" v-for="(other, i) in otherExperienceList" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ other.content.title || '其他经历标题' }}</div>
          <div class="entry-right">{{ other.content.from_time || '其他经历的开始时间' }} - {{ other.content.to_time || '其他经历的结束时间' }}</div>
        </div>
        <div class="entry-sub">{{ other.content.des || '其他经历的描述' }}</div>
        <ul v-if="other.content.length > 0">
          <li v-for="(p, j) in other.content" :key="j">
            <span class="point-title">{{ p.bullet_point }}：</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "OtherExperienceSectionModern",
  props: {
    otherExperienceList: {
      type: Array,
      required: true
    },
    highlightTitle: {
      type: String,
      default: ''
    },
    enableHover: {  
      type: Boolean,
      default: true
    }
  },
  watch: {
    otherExperienceList(newVal, oldVal) {
      console.log('otherExperienceList changed:', oldVal, '->', newVal);
    },
    highlightTitle(newVal, oldVal) {
      console.log('highlightTitle changed:', oldVal, '->', newVal);
    }
  },
  data() {
    return {
      hoverIndex: null, // 记录当前鼠标悬停在哪个项目上
      titleHover: false
    }
  },
  methods: {
    onTitleClick(type, title) {
      this.$emit('selected-module-changed', { type, title });
    },

    onEditClick(type, title) {
      this.$emit('edit-title', type, title);
    },

    onTitleDelete(type, title) {
      this.$emit('delete-title', type, title);
    },

    onAddTitleClick() {
      this.$emit('add-title', 'otherExperience');
    },

    handleMouseEnter(index) {
      if (this.enableHover) {
        this.hoverIndex = index;
      }
    },

    handleMouseLeave() {
      if (this.enableHover) {
        this.hoverIndex = null;
      }
    }
  }
};
</script>