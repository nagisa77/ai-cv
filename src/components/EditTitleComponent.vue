<template>
    <div class="edit-title-component">
        <div class="edit-title-component-title">
            您正在编辑的是 <span class="title-highlight">{{ currentEditingTitle }}</span>
        </div>

        <div class="session-edit-title">基础信息</div>

        {{ currentContent }}
        <div class="session-edit" v-if="currentEditingType === 'education'">
            <div class="form-line">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        :value="currentContent.content.from_time" />
                    <label class="form-label">开始时间</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        :value="currentContent.content.to_time" />
                    <label class="form-label">结束时间</label>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-input" placeholder=" " required />
                <label class="form-label">专业</label>
            </div>
            <div class="form-line">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required />
                    <label class="form-label">学历</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " />
                    <label class="form-label">GPA (选填)</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required />
                    <label class="form-label">城市</label>
                </div>
            </div>

            <div class="session-edit-title">Bullet Points</div>
            <div v-for="(point, index) in currentContent.content.content" :key="index">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required :value="point.bullet_point" />
                    <label class="form-label">Bullet Point</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required :value="point.content" />
                    <label class="form-label">内容</label>
                </div>
            </div>

            <button class="add-button" type="button" @click="addEducationExperience">
                + 新增Bullet Point
            </button>
        </div>
        <div v-if="currentEditingType === 'workExperience'">
            workExperience
        </div>
        <div v-if="currentEditingType === 'projectExperience'">
            projectExperience
        </div>

        <div class="edit-title-component-footer">
            <div class="edit-cancel-btn">
                取消
            </div>
            <div class="edit-submit-btn">
                提交
            </div>
        </div>
    </div>

</template>

<script>
import metadataInstance from '@/models/metadata_model.js'

export default {
    name: 'EditTitleComponent',
    props: {
        currentEditingTitle: {
            type: String,
            default: ''
        },
        currentEditingType: {
            type: String,
            default: ''
        }
    },
    computed: {
        currentContent() {
            return metadataInstance.contentForType(this.currentEditingType, this.currentEditingTitle);
        }
    }
}
</script>

<style scoped>
.edit-title-component {
    padding: 100px 20px;
    background-color: var(--color-background);

    height: calc(100vh - 60px - 200px);
    width: calc(38vw - 40px);
}

.edit-title-component-title {
    font-size: 20px;
    font-weight: bold;
}

.session-edit {}

.title-highlight {
    color: var(--color-primary);
}

.session-edit-title {
    margin-top: 20px;
    font-size: 14px;
    margin-bottom: 10px;
    opacity: 0.6;
}

.edit-title-component-footer {
    display: flex;
    justify-content: flex-end;
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
</style>