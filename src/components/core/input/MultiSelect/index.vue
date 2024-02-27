<template>
	<Multiselect v-bind="$attrs" :close-on-select="true" :clear-on-select="false" :allow-empty="true">
		<slot />
	</Multiselect>
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
