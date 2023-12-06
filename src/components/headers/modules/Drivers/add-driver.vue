<template>
	<HeadersHeaderSlot :title="$route.fullPath.includes('notify') ? 'Notify Drivers' : $route.fullPath.includes('edit') ? 'Edit Drivers' : 'Add Drivers'" pre-title="Overview" />
</template>
<script setup lang="ts">
</script>
<style scoped></style>
