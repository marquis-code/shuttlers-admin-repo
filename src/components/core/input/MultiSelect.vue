<template>
	<Multiselect v-bind="$attrs" :close-on-select="false" :clear-on-select="false" />
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
