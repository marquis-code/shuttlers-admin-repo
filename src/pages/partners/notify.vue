<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<div class="grid grid-cols-2 gap-8 pt-12">
			<ModulesPartnersNotifySectionOne />
			<ModulesPartnersNotifySectionTwo />
		</div>
	</main>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
  title: 'Notify Partners',
  preTitle: 'OVERVIEW'
})

</script>

<style>
input[type=checkbox][disabled]{
  outline:1px solid black;
  background-color: black;
  cursor: not-allowed;
}
</style>

<style lang="scss" scoped>
.selected-users {
  height: 100%;
  .card-header {
    max-height: 3.75rem;
  }

  .notificationArea {
    resize: none;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}

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
