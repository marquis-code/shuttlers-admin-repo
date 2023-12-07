<template>
	<transformable-image
		:touch-move="touchMove"
		:touch-resize="touchResize"
		:mouse-move="mouseMove"
		:wheel-resize="wheelResize"
		:events-filter="eventsFilter"
		@move="$emit('move', $event)"
		@resize="$emit('resize', $event)"
	>
		<slot />
		<div
			class="cropper-event-notification"
			:class="{ 'cropper-event-notification--visible': notificationVisible }"
		>
			{{
				screenWidth >= 1024
					? "With two fingers, pinch inward to zoom out or pinch outward to zoom in on your trackpad. Click and hold down image, then drag to pan as desired."
					: "With two fingers, pinch inward to zoom out or pinch outward to zoom in on your screen. Touch and hold down image on screen, then drag to pan as desired."
			}}
		</div>
	</transformable-image>
</template>

<script lang="ts" setup>
import debounce from 'debounce'
import { TransformableImage } from 'vue-advanced-cropper'
const props = defineProps([
    'touchMove',
    'mouseMove',
    'touchResize',
    'wheelResize'
])
const notificationVisible = ref(false)
const notificationType = ref()
const hideNotifications = debounce(() => {
    notificationVisible.value = false
}, 3000)
const screenWidth = computed({
    get: () => {
        return window.screen.width
    },
    set: () => {}
})
const eventsFilter = (nativeEvent: any, transforming: any) => {
      if (
        nativeEvent.type === 'touchstart' ||
        nativeEvent.type === 'touchmove'
      ) {
        if (nativeEvent.touches.length === 1 && !transforming) {
          notificationVisible.value = true
          notificationType.value = 'touch'
          hideNotifications()
          return false
        } else {
          notificationVisible.value = false
        }
      } else if (nativeEvent.type === 'wheel') {
        if (!transforming && !nativeEvent.ctrlKey) {
          notificationVisible.value = true
          notificationType.value = 'wheel'
          hideNotifications()
          return false
        } else {
          notificationVisible.value = false
        }
      }
      nativeEvent.preventDefault()
      nativeEvent.stopPropagation()
    }
</script>

<style lang="scss">
.cropper-event-notification {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  transition: opacity 0.5s;
  opacity: 0;
  pointer-events: none;
  padding-left: 5%;
  padding-right: 5%;

  &--visible {
    transition: opacity 0.25s;
    pointer-events: all;
    opacity: 1;
  }
}
</style>
