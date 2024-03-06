<template>
	<QuillEditor :modules="modules" toolbar="full" @getContents="handleContents" />
</template>

  <script>
  import { ref, defineComponent } from 'vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import BlotFormatter from 'quill-blot-formatter'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  export default defineComponent({
    components: {
      QuillEditor
    },
    setup: () => {
      const modules = {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {/* options */}
      }

      const handleContents = (index, length) => {
            console.log(index, length, 'ghjkl')
        }

      return { modules, handleContents }
    }
  })

  </script>
