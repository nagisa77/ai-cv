<template>
  <div class="cv-component">
    <div class="cv-page">
      <!-- 名字（非空才显示） -->
      <h1 v-if="resumeData.name">{{ resumeData.name }}</h1>

      <!-- 毕业院校（非空才显示） -->
      <div v-if="resumeData.university" class="university">
        毕业院校: {{ resumeData.university }}
      </div>

      <!-- 教育经历（列表长度 > 0 才显示） -->
      <section v-if="resumeData.education && resumeData.education.length > 0" class="education-section">
        <h2>教育经历</h2>
        <transition-group name="list" tag="div">
          <div
            class="education-item"
            v-for="(edu, index) in resumeData.education"
            :key="index"
          >
            <h3>{{ edu.title }}</h3>
            <p>{{ edu.date }}</p>
            <p>{{ edu.describe }}</p>
          </div>
        </transition-group>
      </section>

      <!-- 工作经历（列表长度 > 0 才显示） -->
      <section v-if="resumeData.work && resumeData.work.length > 0" class="work-section">
        <h2>工作经历</h2>
        <transition-group name="list" tag="div">
          <div
            class="work-item"
            v-for="(job, index) in resumeData.work"
            :key="index"
          >
            <h3>{{ job.title }}</h3>
            <p>{{ job.date }}</p>
            <p>{{ job.describe }}</p>
          </div>
        </transition-group>
      </section>

      <!-- 个人总结（非空才显示） -->
      <section v-if="resumeData.summary" class="summary-section">
        <h2>个人总结</h2>
        <p>{{ resumeData.summary }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "CVComponent",
  props: {
    // 接收包含简历信息的 JSON 对象
    resumeData: {
      type: Object,
      required: true
    }
  },
  watch: {
    resumeData: {
      deep: true,
      handler(newVal) {
        console.log('简历数据改变了', newVal);
        // 可以做一些额外处理
      }
    }
  }
};
</script>

<style scoped>
.cv-component {
  /* 基础布局 */
  height: calc(100vh - 60px);
  width: 62vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cv-page {
  height: 80%;
  aspect-ratio: 3/4;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 12px;
}

.university {
  margin-bottom: 20px;
  font-weight: normal;
}

.education-section,
.work-section,
.summary-section {
  margin-bottom: 24px;
}

.education-item,
.work-item {
  margin-bottom: 12px;
}

.education-item h3,
.work-item h3 {
  margin: 0 0 4px 0;
}

.education-item p,
.work-item p {
  margin: 0 0 4px 0;
}
</style>