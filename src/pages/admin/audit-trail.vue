<template>
	<main class="lg:flex justify-between items-start lg:gap-x-6 space-y-6 lg:space-y-0">
		<LazyModulesAuditTrailAuditList @selectedAudit="handleSelectedAudit" />
		<ModulesAuditTrailAuditDetail :audit-details="auditDetails " />
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const auditDetails = ref(null)

const handleSelectedAudit = (val) => {
   auditDetails.value = val
}

</script>

<style></style>
