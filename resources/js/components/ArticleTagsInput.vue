<template>
    <div>
        <vue3-tags-input
            v-model="tag"
            :tags="tags"
            :autocomplete-items="filteredItems"
            @tags-changed="(newTags) => (tags = newTags)"
            @before-adding-tag="checkValidTag"
            :existing-tags="existingTags"
            :name="name"
            placeholder="タグを追加"
        />
        <input type="hidden" :name="name" :value="tagsValue" />
        <div v-if="errorText" class="error-text">{{ errorText }}</div>
    </div>
</template>

<script>
import Vue3TagsInput from "vue3-tags-input";

export default {
    components: {
        Vue3TagsInput,
    },
    props: {
        // 既存のタグたち
        existingTags: {
            type: Array,
            default: () => [],
        },
        // タグの初期値
        defaultTags: {
            type: Array,
            default: () => [],
        },
        // inputのname属性
        name: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            // 入力中のタグ文字列
            inputTag: "",
            // 選択されたタグ
            selectedTags: [],
            // エラー文言
            errorText: "",
        };
    },
    computed: {
        filteredItems() {
            return this.existingTags.filter((tag) => {
                return (
                    tag.text
                        .toLowerCase()
                        .indexOf(this.inputTag.toLowerCase()) !== -1
                );
            });
        },
        tagsValue() {
            return this.selectedTags
                .map(function (tag) {
                    return tag["text"];
                })
                .join(",");
        },
    },
    methods: {
        /**
         * タグの形式をチェックする
         * @param obj
         */
        checkValidTag(obj) {
            if (obj.tag.text.length > 30) {
                this.errorText = "タグは30文字以内で入力してください";
            } else {
                this.errorText = "";
                obj.addTag();
            }
        },
    },
};
</script>
<style lang="css" scoped>
.vue-tags-input {
    max-width: inherit;
}
</style>
<style lang="css">
.vue-tags-input .ti-tag {
    background: transparent;
    border: 1px solid #747373;
    color: #747373;
    margin-right: 4px;
    border-radius: 0px;
    font-size: 13px;
}
</style>
