<template>
	<main class="lg:flex justify-between items-start lg:gap-x-6 space-y-6 lg:space-y-0">
		<!-- {{ formattedAuditList }} -->
		<ModulesAuditTrailAuditList v-if="!loading" :audits-list="formattedAuditList" @selectedAudit="handleSelectedAudit" />
		<Skeleton v-else height="300px" width="700px" />
		<ModulesAuditTrailAuditDetail :audit-details="auditDetails " />
	</main>
</template>

<script setup lang="ts">
import { useGetAudits } from '@/composables/modules/staffs/fetch'

const { getAudits, loading, auditList, next, prev, moveTo, ...metaObject } = useGetAudits()
getAudits()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const auditDetails = ref({}) as any

const handleSelectedAudit = (val) => {
   auditDetails.value = val
}

const formattedAuditList = computed(() =>
auditList.value.map((i) => {
         return {
             ...i,
             eventDate: getTimeDifference(i.eventDate)
         }
    })
)

//    const getTimeDifference = (createdAt:any) => {
//       const now = new Date() as any
//       const difference = now - new Date(createdAt)
//       return formatTimeDifference(difference)
//     }

//     const formatTimeDifference = (difference:any) => {
//       const minutes = Math.floor(difference / (1000 * 60))
//       return `${minutes} minutes ago`
//     }
   // Function to calculate time difference for a given created_at date
   const getTimeDifference = (createdAt) => {
      const now = new Date() as any
      const difference = now - new Date(createdAt)
      return formatTimeDifference(difference)
    }

    // Function to format the time difference
    const formatTimeDifference = (difference) => {
      // Customize this function based on your formatting needs
      const seconds = Math.floor(difference / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return `${days} days ago`
      } else if (hours > 0) {
        return `${hours} hours ago`
      } else if (minutes > 0) {
        return `${minutes} minutes ago`
      } else {
        return 'Just now'
      }
    }
</script>

<style></style>
