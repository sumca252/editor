<template>
    <div class="m-3">
        <EditorItem />
    </div>
</template>

<script>
import EditorItem from "@/components/Editor/Editor.vue";
export default {
    name: "HomeItem",
    components: {
        EditorItem,
    },
};
</script>

<style>
.ql-editor {
    height: 600px;
}
</style>