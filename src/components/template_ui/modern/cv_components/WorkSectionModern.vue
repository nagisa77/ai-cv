<template>
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-work.svg" alt="" /> 工作经历
      </div>
      <div class="entry" v-for="(work, i) in workList" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ work.title || '您公司的名称' }}</div>
          <div class="entry-right">{{ work.content.from_time || '您的入职时间' }} - {{ work.content.to_time || '您的离职时间' }} · {{ work.city || '您的工作城市' }}</div>
        </div>
        <div class="entry-sub">{{ work.content.sub_title || '您的职务' }}</div>
        <ul>
          <li v-for="(p, j) in work.content.content" :key="j">
            <span class="point-title">{{ p.bullet_point + ":" }}</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "WorkSectionModern",
  props: {
    workList: {
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
    workList(newVal, oldVal) {
      console.log('workList changed:', oldVal, '->', newVal);
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
      this.$emit('add-title', 'workExperience');
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