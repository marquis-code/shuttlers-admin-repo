<template>
	<div>
		<label class="w-full tracking-wide cursor-pointer">
			<p class="flex justify-center items-center gap-x-2">
				<img src="@/assets/icons/source/upload.svg" alt="preview icon" class="rounded-full border p-2 h-10 w-10">
				Upload Batch booking CSV File</p>
			<input id="image" class="hidden" type="file" accept=".csv" @change="handleFileChange">
		</label>
		<div v-if="errorMessage" class="error">
			{{ errorMessage }}
		</div>
		<ul>
			<li v-for="email in userEmails" :key="email">
				{{ email }}
			</li>
		</ul>
	</div>
</template>

  <script setup lang="ts">
  import { useAlert } from '@/composables/core/notification'
  const errorMessage = ref(null) as any
  const userEmails = ref([])
  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      errorMessage.value = 'No file selected'
      return
    }

    if (!isCSV(file)) {
      errorMessage.value = 'Invalid file type. Please select a CSV file.'
      return
    }

    validateCSV(file)
  }

  const isCSV = (file) => file.type === 'text/csv'

  const validateCSV = (file) => {
    const reader = new FileReader()

    reader.onload = (e: any) => {
      const csvData = e.target.result
      // Implement your email validation logic here
      // For simplicity, let's check if the CSV contains an "Email" column
      // if (csvData.includes('Email')) {
      //   errorMessage.value = null
      //   useAlert().openAlert({ type: 'SUCCESS', msg: 'Batch booking CSV file was uploaded successfully.' })
      //   // You can process the CSV data or emit an event to notify the parent component
      // } else {
      //   errorMessage.value = 'CSV file must contain an "Email" column'
      // }
      if (hasEmailColumn(csvData)) {
      errorMessage.value = null
      userEmails.value = extractUserEmails(csvData)
      useAlert().openAlert({ type: 'SUCCESS', msg: 'Batch booking CSV file was uploaded successfully.' })
      // You can process the CSV data or emit an event to notify the parent component
    } else {
      errorMessage.value = 'CSV file must contain an "Email" column'
    }
    }

    reader.readAsText(file)
  }

  const hasEmailColumn = (csvData) => {
  const rows = csvData.split('\n')
  const headers = rows[0].split(',')

  return headers.some((header) => header.trim().toLowerCase() === 'email')
}
const emits = defineEmits(['emails'])

const extractUserEmails = (csvData) => {
  const rows = csvData.split('\n')
  const emailIndex = rows[0].split(',').findIndex((header) => header.trim().toLowerCase() === 'email')

  if (emailIndex === -1) {
    return []
  }
  const userEmails = rows.slice(1).map((row) => row.split(',')[emailIndex].trim())
 emits('emails', userEmails)
  return userEmails
}
  </script>

  <style scoped>
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
