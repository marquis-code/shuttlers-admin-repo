<template>
	<div class="route" :style="{maxWidth: `${maxWidth}px`}" :class="className || ''" :title="`${pickup} to ${destination}`">
		<div class="route__source">
			<img class="icon" src="@/assets/icons/source/source_point.svg" alt="source">
			<p class="text">
				{{ pickup }}
			</p>
		</div>
		<div class="route__destination">
			<img class="icon" src="@/assets/icons/source/destination_point.svg" alt="destination">
			<p class="text">
				{{ destination }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
  const props = defineProps({
	pickup: { type: String, required: true },
	destination: { type: String, required: true },
	className: { type: String, required: false },
	titleWeight: { type: [String, Number], required: false, default: () => 500 },
	maxWidth: {
      type: Number,
      required: false,
      default: 360
    }
  })
</script>

<style lang="scss" scoped>
.route {
  padding: 0 0.25rem;
  background: transparent;
  font-weight: 400;
  font-size: 12px;
  max-width: 100%;

  &__source {
    position: relative;
    &:before {
      border-left: 1px dashed #a3a3a3;
      position: absolute;
      top: 1.25rem;
      left: 0.28125rem;
      height: 70%;
      content: "";
      z-index: 0;
    }
  }

  &__source, &__destination {
    display: flex;
    flex-wrap: nowrap;
    color: #313533;
    .icon {
      margin-right: 1rem;
      width: 0.625rem;
      z-index: 2;
    }
    .text {
/*      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;*/
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      padding: 0.5rem 0;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
    //  Container has to have a max-width attribute
    }
  }
}
</style>
