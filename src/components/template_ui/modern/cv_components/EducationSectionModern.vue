<template>
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-graduation-cap.svg" alt="" /> 教育经历
      </div>
      <div class="entry" v-for="(edu, i) in educationList" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ edu.title || "您的大学名称"}} · {{ edu.content.degree ||"您的学历"}}</div>
          <div class="entry-right">{{ edu.content.from_time || "您的入学时间" }} - {{edu.content.to_time || "您的毕业时间"}} · {{ edu.content.city || "您的城市" }}</div>
        </div>
        <div class="entry-sub">{{ 'GPA:'+edu.content.gpa || "您的GPA" }} · {{ '专业:'+edu.content.major || "您的专业" }}</div>
        <div class="honors">
          {{ edu.content.honors || "您的荣誉奖项" }}
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "EducationSection",
  props: {
    educationList: {
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
      this.$emit('add-title', 'education');
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