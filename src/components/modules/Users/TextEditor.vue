<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const form = ref({
  notification: ''
})

const onEditorChange = (e) => {

}
</script>
<template>
	<div>
		<ClientOnly>
			<QuillEditor v-model:content="form.notification" theme="snow" @change="onEditorChange($event)" />
		</ClientOnly>
	</div>
</template>
<style scoped lang="css">
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
