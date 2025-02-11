<template>
    <div class="edit-title-component" v-if="localContent">
        <div v-if="isNewTitle" class="edit-title-component-title">
            您正在添加一个新的<span class="title-highlight">{{ currentEditingType }}</span>项目
        </div>
        <div v-else class="edit-title-component-title">
            您正在编辑的是 <span class="title-highlight">{{ currentEditingTitle }}</span>
        </div>

        <!-- ================== Education ================== -->
        <div v-if="currentEditingType === 'education'">
            <div class="session-edit-title">基础信息</div>
            <div class="session-edit">
                <AppleStyleInput v-if="isNewTitle" id="edu-title" labelText="主题" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.title" />

                <div class="form-line">
                    <AppleStyleInput id="edu-from" labelText="开始时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.from_time" />
                    <AppleStyleInput id="edu-to" labelText="结束时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.to_time" />
                </div>

                <AppleStyleInput id="edu-major" labelText="专业" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.major" />

                <div class="form-line">
                    <AppleStyleInput id="edu-degree" labelText="学历" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.degree" />
                    <AppleStyleInput id="edu-gpa" labelText="GPA (选填)" inputType="text" :required="false"
                        v-model:modelValue="localContent.content.gpa" />
                    <AppleStyleInput id="edu-city" labelText="城市" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.city" />
                </div>

                <AppleStyleInput id="edu-honors" labelText="荣誉奖项 (选填)" inputType="text" :required="false"
                    v-model:modelValue="localContent.content.honors" />

                <AppleStyleInput id="edu-courses" labelText="相关课程 (选填)" inputType="text" :required="false"
                    v-model:modelValue="localContent.content.courses" />
            </div>
        </div>

        <!-- ================== Work Experience ================== -->
        <div v-if="currentEditingType === 'workExperience'">
            <div class="session-edit-title">基础信息</div>
            <div class="session-edit">
                <AppleStyleInput v-if="isNewTitle" id="work-title" labelText="主题" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.title" />

                <div class="form-line">
                    <AppleStyleInput id="work-from" labelText="开始时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.from_time" />
                    <AppleStyleInput id="work-to" labelText="结束时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.to_time" />
                </div>

                <div class="form-line">
                    <AppleStyleInput id="work-company" labelText="公司" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.title" />
                    <AppleStyleInput id="work-position" labelText="职位" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.sub_title" />
                    <AppleStyleInput id="work-city" labelText="城市" inputType="text" :required="false"
                        v-model:modelValue="localContent.content.city" />
                </div>
            </div>

            <div class="session-edit-title">Bullet Points</div>
            <div class="bullet-point-container" v-for="(point, index) in localContent.content.content" :key="index">
                <div class="button-container">
                    <button v-on:mouseenter="handleMouseEnter(index)" v-on:mouseleave="handleMouseLeave" type="button"
                        class="remove-button" @click="removeBulletPoint(index)">
                        x
                    </button>
                </div>
                <AppleStyleInput :id="`bullet-point-${index}`" labelText="Bullet Point" inputType="text"
                    :required="true" v-model:modelValue="point.bullet_point" />
                <AppleStyleInput :id="`bullet-content-${index}`" labelText="内容" inputType="text" :required="true"
                    v-model:modelValue="point.content" />
            </div>
            <button class="add-button" type="button" @click="addBulletPoint">
                + 新增Bullet Point
            </button>
        </div>

        <!-- ================== Project Experience ================== -->
        <div v-if="currentEditingType === 'projectExperience'">
            <div class="session-edit-title">基础信息</div>
            <div class="session-edit">
                <AppleStyleInput v-if="isNewTitle" id="project-title" labelText="主题" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.title" />

                <div class="form-line">
                    <AppleStyleInput id="project-from" labelText="开始时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.from_time" />
                    <AppleStyleInput id="project-to" labelText="结束时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.to_time" />
                </div>

                <AppleStyleInput id="project-role" labelText="职位/角色" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.role" />
            </div>

            <div class="session-edit-title">Bullet Points</div>
            <div class="bullet-point-container" v-for="(point, index) in localContent.content.content" :key="index">
                <div class="button-container">
                    <button v-on:mouseenter="handleMouseEnter(index)" v-on:mouseleave="handleMouseLeave" type="button"
                        class="remove-button" @click="removeBulletPoint(index)">
                        x
                    </button>
                </div>
                <AppleStyleInput :id="`proj-bullet-${index}`" labelText="Bullet Point" inputType="text" :required="true"
                    v-model:modelValue="point.bullet_point" />
                <AppleStyleInput :id="`proj-content-${index}`" labelText="内容" inputType="text" :required="true"
                    v-model:modelValue="point.content" />
            </div>
            <button class="add-button" type="button" @click="addBulletPoint">
                + 新增Bullet Point
            </button>
        </div>

        <!-- ================== Footer 操作按钮 ================== -->
        <div class="edit-title-component-footer">
            <div class="edit-cancel-btn" @click="cancelChanges">取消</div>
            <div class="edit-submit-btn" @click="submitChanges">提交</div>
        </div>
    </div>
</template>

<script>
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue'; // 确保路径正确
import metadataInstance from '@/models/metadata_model.js';

export default {
    components: {
        AppleStyleInput
    },
    name: 'EditTitleComponent',
    props: {
        currentEditingTitle: {
            type: String,
            default: ''
        },
        currentEditingType: {
            type: String,
            default: ''
        },
        isNewTitle: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 在本地创建一个副本对象，用于编辑
            localContent: null,
            mouseHoverIndex: null
        };
    },
    mounted() {
        if (this.isNewTitle) {
            if (this.currentEditingType === 'education') {
                this.localContent = {
                    title: '',
                    content: {
                        from_time: '',
                        to_time: '',
                        major: '',
                        degree: '',
                        gpa: '',
                        city: '',
                        content: []
                    }
                }
            } else if (this.currentEditingType === 'workExperience') {
                this.localContent = {
                    title: '',
                    content: {
                        from_time: '',
                        to_time: '',
                        title: '',
                        sub_title: '',
                        city: '',
                        content: []
                    }
                }
            } else if (this.currentEditingType === 'projectExperience') {
                this.localContent = {
                    title: '',
                    content: {
                        from_time: '',
                        to_time: '',
                        title: '',
                        content: []
                    }
                }
            }
        } else {
            // 深拷贝 metadataInstance 原始数据，赋值给 localContent
            // 注意：ResumeForm.vue 中 setContentForType 时，把真正要存的结构都放在 content 里了
            // 比如： { from_time: '', to_time: '', content: [] } 等等
            // 因此这里需要根据 ResumeForm.vue 实际写入的结构来匹配
            const originalContent = metadataInstance.contentForType(
                this.currentEditingType,
                this.currentEditingTitle
            );
            // 深拷贝
            this.localContent = JSON.parse(JSON.stringify(originalContent));
        }
    },
    methods: {
        // 新增 Bullet Point：各类型共用
        addBulletPoint() {
            this.localContent.content.content.push({
                bullet_point: '',
                content: ''
            });
        },
        // 移除对应下标的 Bullet Point
        removeBulletPoint(index) {
            this.localContent.content.content.splice(index, 1);
        },
        // “提交”按钮：此时才更新 metadataInstance 的数据
        submitChanges() {
            // 将本地修改内容写回 metadataInstance
            metadataInstance.setContentForType(
                this.currentEditingType,
                this.localContent.content,
                this.localContent.content.title,
            )
            // 提交后可根据需要进行其他跳转或提示等操作
            this.$emit("changes-submitted");
        },
        // “取消”按钮：还原 or 关闭编辑
        cancelChanges() {
            // 可以根据需要进行更多处理，这里仅做关闭编辑的示例
            this.$emit("cancel-changes");
        },
        // Hover 效果（若有定制化需求）
        handleMouseEnter(index) {
            this.mouseHoverIndex = index;
        },
        handleMouseLeave() {
            this.mouseHoverIndex = null;
        }
    }
};
</script>

<style scoped>
.edit-title-component {
    padding: 100px 20px;
    background-color: var(--color-background);
    height: calc(100vh - 60px - 200px);
    width: calc(38vw - 40px);
    overflow-y: auto;
}

.edit-title-component-title {
    font-size: 20px;
    font-weight: bold;
}

.session-edit-title {
    margin-top: 20px;
    font-size: 14px;
    margin-bottom: 10px;
    opacity: 0.6;
}

.form-line {
    display: flex;
    gap: 10px;
}

.title-highlight {
    color: var(--color-primary);
}

.edit-title-component-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.edit-cancel-btn {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    padding: 10px 20px;
    border: 1px solid var(--color-primary);
    border-radius: 20px;
    margin-right: 10px;
    cursor: pointer;
}

.edit-cancel-btn:hover {
    background-color: var(--color-gray);
    transition: background-color 0.3s ease;
}

.edit-submit-btn {
    color: var(--color-secondary);
    background-color: var(--color-primary);
    padding: 10px 20px;
    border-radius: 20px;
    margin-right: 10px;
    cursor: pointer;
}

.edit-submit-btn:hover {
    background-color: var(--color-primary-hover);
    transition: background-color 0.3s ease;
}

.add-button {
    margin-top: 10px;
    cursor: pointer;
    color: var(--color-primary);
    background-color: transparent;
    border: none;
    font-size: 14px;
    padding: 5px 0;
}

.bullet-point-container {
    margin-bottom: 10px;
    border-radius: 10px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
}

.remove-button {
    margin-top: 5px;
    color: red;
    border: none;
    background-color: transparent;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}
</style>