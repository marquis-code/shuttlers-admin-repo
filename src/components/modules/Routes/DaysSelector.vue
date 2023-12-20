<template>
	<div class="flex flex-wrap gap-3">
		<div v-for="itm in daysOfWeek" :key="itm.id">
			<input
				:id="itm.short"
				type="checkbox"
				:name="itm.short"
				:value="itm.short"
				class="peer hidden"
				:checked="itm.selected"
			>

			<label
				:for="itm.short"
				class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
			>
				<p class="text-sm font-medium">{{ itm.short }}</p>
			</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['on-change', 'selected', 'deselected'])
const daysOfWeek = reactive([
        { id: 1, value: 'sunday', short: 'Sun', selected: false },
        { id: 2, value: 'monday', short: 'Mon', selected: false },
        { id: 3, value: 'tuesday', short: 'Tue', selected: false },
        { id: 4, value: 'wednesday', short: 'Wed', selected: false },
        { id: 5, value: 'thursday', short: 'Thu', selected: false },
        { id: 6, value: 'friday', short: 'Fri', selected: false },
        { id: 7, value: 'saturday', short: 'Sat', selected: false }
      ])
      const props = defineProps({
        activeDays: {
      type: Array,
      required: true
    }
      })

      onMounted(() => {
        if (props.activeDays && props.activeDays.length) {
         updateSelectionState(props.activeDays)
    }
      })
      const selectedDays = computed(() => {
      return daysOfWeek.reduce((a, b) => {
        if (b.selected) {
          a.push(b.value)
        }
        return a
      }, [])
    })

    const updateSelection = (day) => {
      day.selected = !day.selected
      emit(day.selected ? 'selected' : 'deselected', day)
      emit('on-change', selectedDays.value)
    }

    const updateSelectionState = (selectedDayKeys) => {
      daysOfWeek.forEach((day) => {
        if (selectedDayKeys.includes(day.value)) {
          day.selected = true
        }
      })
    }
</script>

<style lang="scss" scoped>
.dow-wrapper {
  display: flex;
  flex-wrap: wrap;
  .dow {
    box-sizing: border-box;
    border-radius: 8px;
    padding: 0.75rem 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
    font-size: 0.75rem;
    border: 1px solid #E5E9F2;
    background: #ffffff;
    color: #060606;
    cursor: pointer;
    margin: 0.25rem 0.25rem 0.25rem 0;
    min-width: 3rem;
    justify-content: center;
    display: flex;

    &:last-of-type{
      margin-right: 0;
    }
    &__selected {
      background: #EDFDF5;
      border: 1px solid #20E682;
    }
  }
}

.font-sm {
  font-size: 0.75rem;
}
</style>
