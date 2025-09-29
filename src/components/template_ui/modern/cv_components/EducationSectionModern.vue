<template>
    <div class="section">
      <div class="session-title with-add-btn">
        <img class="icon" src="/icons/fa-graduation-cap.svg" alt="" /> 教育经历
        <span class="add-btn" @click="onAddTitleClick">+</span>
      </div>
      <div class="entry"  v-for="(edu, i) in educationList" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ edu.title || "您的大学名称"}} · {{ edu.content.degree ||"您的学历"}}</div>
          <div class="entry-right">{{ edu.content.from_time || "您的入学时间" }} - {{edu.content.to_time || "您的毕业时间"}} · {{ edu.content.city }}</div>
        </div>
        <div class="entry-actions" v-if="enableHover">
          <button class="action-btn" @click.stop="onEditClick('education', edu.title)">编辑</button>
          <button class="action-btn delete" @click.stop="onTitleDelete('education', edu.title)">删除</button>
        </div>
        <div class="entry-sub">{{ 'GPA:'+(edu.content.gpa || "您的GPA") }} · {{ edu.content.major || "您的专业" }}</div>
        <div class="honors">
          {{ edu.content.honors }}
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "EducationSectionModern",
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
  }
};
</script>