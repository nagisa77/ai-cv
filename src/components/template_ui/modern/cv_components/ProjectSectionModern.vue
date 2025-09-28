<template>
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-code.svg" alt="" /> 项目经历
      </div>
      <div class="entry" v-for="(proj, i) in projectList" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ proj.content.title || '您的项目名称' }}</div>
          <div class="entry-right">{{ proj.content.from_time || '您项目的开始时间' }} - {{ proj.content.to_time || '您项目的结束时间' }}</div>
        </div>
        <ul>
          <li v-for="(p, j) in proj.content.content" :key="j">
            <span class="point-title">{{ p.bullet_point || '您的项目经历项目点' }}：</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "ProjectSectionModern",
  props: {
    projectList: {
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
      this.$emit('add-title', 'projectExperience');
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