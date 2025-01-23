<template>
    <div class="edit-title-component" v-if="localContent">
        <div class="edit-title-component-title">
            您正在编辑的是 <span class="title-highlight">{{ currentEditingTitle }}</span>
        </div>

        <div class="session-edit-title">基础信息</div>
        <div class="session-edit" v-if="currentEditingType === 'education'">
            <div class="form-line">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        v-model="localContent.content.from_time" />
                    <label class="form-label">开始时间</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        v-model="localContent.content.to_time" />
                    <label class="form-label">结束时间</label>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-input" placeholder=" " required v-model="localContent.content.major" />
                <label class="form-label">专业</label>
            </div>
            <div class="form-line">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        v-model="localContent.content.degree" />
                    <label class="form-label">学历</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " v-model="localContent.content.gpa" />
                    <label class="form-label">GPA (选填)</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required
                        v-model="localContent.content.city" />
                    <label class="form-label">城市</label>
                </div>
            </div>

            <div class="session-edit-title">Bullet Points</div>
            <div class="bullet-point-container" v-for="(point, index) in localContent.content.content" :key="index" >
                <div class="button-container">
                    <button v-on:mouseenter="handleMouseEnter(index)" v-on:mouseleave="handleMouseLeave"
                        type="button" class="remove-button" @click="removeBulletPoint(index)">
                        x
                    </button>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required v-model="point.bullet_point" />
                    <label class="form-label">Bullet Point</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder=" " required v-model="point.content" />
                    <label class="form-label">内容</label>
                </div>
                <!-- Remove bullet point button -->
            </div>

            <button class="add-button" type="button" @click="addEducationBulletPoint">
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
            <div class="edit-cancel-btn" @click="cancelChanges">
                取消
            </div>
            <div class="edit-submit-btn" @click="submitChanges">
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
    data() {
        return {
            // 在本地创建一个副本对象，用于编辑
            localContent: null,
            mouseHoverIndex: null
        };
    },
    created() {
        // 深拷贝 metadataInstance 原始数据，赋值给 localContent
        const originalContent = metadataInstance.contentForType(
            this.currentEditingType,
            this.currentEditingTitle
        );
        this.localContent = JSON.parse(JSON.stringify(originalContent));
    },
    methods: {
        // 新增 Bullet Point
        addEducationBulletPoint() {
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
            // 根据自身业务需要，把本地修改写回 metadataInstance
            // 假设模型里有类似 updateContentForType 的方法，可以把数据写回去
            metadataInstance.setContentForTitle(this.currentEditingTitle, this.localContent.content)
        },
        // “取消”按钮：还原 localContent
        cancelChanges() {
            this.$emit("cancel-changes")
        },
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

.session-edit {
    /* Custom styling */
}

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

.add-button {
    margin-top: 10px;
    cursor: pointer;
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

.button-container {
    display: flex;
    justify-content: flex-end;
}

.bullet-point-container {
    margin-bottom: 10px;
    border-radius: 10px;
}

.bullet-point-container:hover {
    transition: background-color 0.3s ease;
}

</style>
