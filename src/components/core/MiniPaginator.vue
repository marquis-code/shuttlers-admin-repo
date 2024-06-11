<template>
	<div class="flex justify-center space-x-2 mt-4">
		<button
			:disabled="currentPage === 1"
			class="px-4 py-2 bg-blue-500 text-white rounded-md"
			@click="goToPage(1)"
		>
			First
		</button>
		<button
			:disabled="currentPage === 1"
			class="px-4 py-2 bg-blue-500 text-white rounded-md"
			@click="goToPage(currentPage - 1)"
		>
			Prev
		</button>

		<div v-for="page in totalPages" :key="page">
			<button
				:class="{'px-4 py-2 bg-blue-500 text-white rounded-md': currentPage !== page, 'px-4 py-2 bg-gray-300 text-gray-600 cursor-default': currentPage === page }"
				@click="goToPage(page)"
			>
				{{ page }}
			</button>
		</div>

		<button
			:disabled="currentPage === totalPages"
			class="px-4 py-2 bg-blue-500 text-white rounded-md"
			@click="goToPage(currentPage + 1)"
		>
			Next
		</button>
		<button
			:disabled="currentPage === totalPages"
			class="px-4 py-2 bg-blue-500 text-white rounded-md"
			@click="goToPage(totalPages)"
		>
			Last
		</button>
	</div>
</template>

  <script>
  export default {
    props: {
		  currentPage: {
			type: Number,
		required: true
	  },
		totalPages: {
	type: Number,
		required: true
	  }
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-changed', page)
        }
      }
    }
  }
  </script>

  <style scoped>
  /* Add your custom styles here */
  </style>
