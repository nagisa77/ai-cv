<template>
    <div class="edit-title-component" v-if="localContent">
        <div v-if="isNewTitle" class="edit-title-component-title">
            您正在添加一个新的<span class="title-highlight">{{ currentEditingTypeComputed }}</span>
        </div>
        <div v-else class="edit-title-component-title">
            您正在编辑的是 <span class="title-highlight"><ClickToEdit :modelValue="localContent.content.title" @update:modelValue="newValue => localContent.content.title = newValue" /></span>
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
                <AppleStyleInput :id="`bullet-combined-${index}`" labelText="要点" inputType="text" rows="3"
                    :required="true" v-model:modelValue="point.combined" />
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
                <AppleStyleInput :id="`proj-bullet-${index}`" labelText="要点" inputType="text" rows="3" :required="true" v-model:modelValue="point.combined" />
            </div>
            <button class="add-button" type="button" @click="addBulletPoint">
                + 新增Bullet Point
            </button>
        </div>

        <!-- ================== Other Experience ================== -->
        <div v-if="currentEditingType === 'otherExperience'">
            <div class="session-edit-title">基础信息</div>
            <div class="session-edit">
                <AppleStyleInput v-if="isNewTitle" id="other-title" labelText="主题/名称" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.title" />
                <div class="form-line">
                    <AppleStyleInput id="other-from" labelText="开始时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.from_time" />
                    <AppleStyleInput id="other-to" labelText="结束时间" inputType="text" :required="true"
                        v-model:modelValue="localContent.content.to_time" />
                </div>
                <AppleStyleInput id="other-desc" labelText="描述" inputType="text" :required="true"
                    v-model:modelValue="localContent.content.desc" />
            </div>
            <div class="session-edit-title">Bullet Points</div>
            <div class="bullet-point-container" v-for="(point, index) in localContent.content.content" :key="index">
                <div class="button-container">
                    <button v-on:mouseenter="handleMouseEnter(index)" v-on:mouseleave="handleMouseLeave" type="button"
                        class="remove-button" @click="removeBulletPoint(index)">
                        x
                    </button>
                </div>
                <AppleStyleInput :id="`other-bullet-${index}`" labelText="要点" inputType="text" rows="3" :required="true" v-model:modelValue="point.combined" />
            </div>
            <button class="add-button" type="button" @click="addBulletPoint">
                + 新增Bullet Point
            </button>
        </div>

        <!-- ================== Footer 操作按钮 ================== -->
        <div class="edit-title-component-footer">
            <div class="edit-cancel-btn" @click="cancelChanges">取消</div>
            <div
                class="edit-submit-btn"
                :class="{ 'loading-state': isSubmitting }"
                @click="submitChanges"
            >
                <span>提交</span>
                <i v-if="isSubmitting" class="fas fa-spinner fa-spin loading-icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue'; // 确保路径正确
import metadataInstance from '@/models/metadata_model.js';
import ChatgptModel from '@/models/chatgpt_model.js';
import ClickToEdit from '@/components/basic_ui/ClickToEdit.vue';

const chatgptInstance = ChatgptModel.getInstance();

export default {
    components: {
        AppleStyleInput,
        ClickToEdit
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
    computed: {
        currentEditingTypeComputed() {
            if (this.currentEditingType === 'education') {
                return '教育经历';
            } else if (this.currentEditingType === 'workExperience') {
                return '工作经历';
            } else if (this.currentEditingType === 'projectExperience') {
                return '项目经历';
            } else  {
                return '其他经历';
            }
        }
    },
    data() {
        return {
            // 在本地创建一个副本对象，用于编辑
            localContent: null,
            mouseHoverIndex: null,
            isSubmitting: false
        };
    },
    watch: {
        // 监听 currentEditingTitle 和 currentEditingType 的变化
        currentEditingTitle: {
            handler() {
                this.initializeLocalContent();
            },
            immediate: true
        },
        currentEditingType: {
            handler() {
                this.initializeLocalContent();
            },
            immediate: true
        }
    },
    mounted() {
        // 初始化逻辑已移至 watch 中
    },
    methods: {
        // 将原来的 mounted 逻辑移到这里作为一个方法
        initializeLocalContent() {
            if (this.isNewTitle) {
                if (this.currentEditingType === 'education') {
                    this.localContent = {
                        title: '',
                        content: {
                            title: '',
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
                }else if (this.currentEditingType === 'otherExperience') {
                    this.localContent = {
                        title: '',
                        content: {
                            from_time: '',
                            to_time: '',
                            title: '',
                            desc: '',
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
                console.log(this.localContent);
            }
            // 初始化每个 bullet point 的 combined 字符串
            if (this.localContent && this.localContent.content && Array.isArray(this.localContent.content.content)) {
                this.localContent.content.content = this.localContent.content.content.map(point => {
                    const prefix = point.bullet_point ? point.bullet_point : '';
                    const suffix = point.content ? `: ${point.content}` : '';
                    return { ...point, combined: `${prefix}${suffix}`.trim() };
                });
            }
        },
        // 新增 Bullet Point：各类型共用
        addBulletPoint() {
            this.localContent.content.content.push({
                bullet_point: '',
                content: '',
                combined: ''
            });
        },
        // 移除对应下标的 Bullet Point
        removeBulletPoint(index) {
            this.localContent.content.content.splice(index, 1);
        },
        // “提交”按钮：此时才更新 metadataInstance 的数据
        async submitChanges() {
            this.isSubmitting = true;
            try {
                const finalContent = [];
                for (const point of this.localContent.content.content) {
                let value = point.combined || '';

                // 如果包含中文冒号但没有英文冒号，先替换
                if (!value.includes(':') && value.includes('：')) {
                    value = value.replace(/：/g, ':');
                }

                let idx = value.indexOf(':');

                // 若仍无冒号，调用 GPT 协助转换
                if (idx === -1) {
                    try {
                        chatgptInstance.getMessagesForTitle(
                            this.currentEditingType,
                            this.localContent.content.title || ''
                        );
                        const gptValue = await chatgptInstance.fetchGptResponse(
                            this.currentEditingType,
                            this.localContent.content.title || '',
                            `请将以下句子转换为“主题: 内容”格式，只返回转换后的句子：${value}`
                        );
                        if (typeof gptValue === 'string') {
                            value = gptValue.trim();
                        }
                    } catch (e) {
                        console.error('fetchGptResponse error:', e);
                    }
                    // 再次检查冒号位置
                    if (!value.includes(':') && value.includes('：')) {
                        value = value.replace(/：/g, ':');
                    }
                    idx = value.indexOf(':');
                }

                if (idx !== -1) {
                    finalContent.push({
                        bullet_point: value.slice(0, idx).trim(),
                        content: value.slice(idx + 1).trim(),
                    });
                } else {
                    finalContent.push({
                        bullet_point: value.trim(),
                        content: '',
                    });
                }
            }
                const dataToSave = {
                    ...this.localContent.content,
                    content: finalContent,
                };
                metadataInstance.updateTitle(
                    this.currentEditingType,
                    this.localContent.content.title,
                    this.currentEditingTitle
                )
                metadataInstance.setContentForType(
                    this.currentEditingType,
                    dataToSave,
                    this.localContent.content.title,
                )
                // 提交后可根据需要进行其他跳转或提示等操作
                this.$emit("changes-submitted");
            } finally {
                this.isSubmitting = false;
            }
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
    padding: 75px 20px;
    height: calc(100vh - 200px);
    width: calc(47vw - 80px);
    overflow-y: auto;
}

.edit-title-component-title {
    font-size: 30px;
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

.loading-icon {
    margin-left: 10px;
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

.edit-submit-btn.loading-state {
    cursor: not-allowed;
    opacity: 0.8;
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