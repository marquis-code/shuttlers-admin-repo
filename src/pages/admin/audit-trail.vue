<template>
	<main class="lg:flex justify-between items-start lg:gap-x-6 space-y-6 lg:space-y-0">
		<!-- {{ formattedAuditList }} -->
		<ModulesAuditTrailAuditList @selectedAudit="handleSelectedAudit" />
		<!-- <Skeleton v-else height="300px" width="700px" /> -->
		<ModulesAuditTrailAuditDetail :audit-details="auditDetails " />
	</main>
</template>

<script setup lang="ts">
// import { useGetAudits } from '@/composables/modules/staffs/fetch'

// const { getAudits, loading, auditList, next, prev, moveTo, ...metaObject } = useGetAudits()
// getAudits()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const auditDetails = ref({}) as Ref<Record<string, any>>

const handleSelectedAudit = (val) => {
   auditDetails.value = val
}

</script>

<style></style>
