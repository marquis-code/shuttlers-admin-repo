<template>
	<div class="px-0 container-fluid root-layout overflow-hidden">
		<NuxtLoadingIndicator />
		<LayoutsSidebar />

		<div class="main-content">
			<Headers id="header" />
			<div class=" overflow-auto relative  h-[87.5vh]">
				<slot />
			</div>
		</div>
	</div>

	<Alert />
	<ModalBase />
	<CommandPalette />
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'>
$sidebar-width: 17rem;
$dasboard_margin: 2rem;
$content-area-width: calc(100vw - (17rem + 1rem));
.main-content {
  background-color: var(--grey);
  min-height: 90vh;
  margin-left: $dasboard_margin;
  @apply border-2 border-grey9 rounded-3xl fixed bottom-5 top-5   w-full;
}

.dashboard-padded {
  padding-top: 60px !important;
}

.root-layout {
  & > .main-content {
    width: 100%;
    margin-left: 0;
    background-color: var(--grey);

    @media screen and (min-width: 768px) {
      width: $content-area-width;
      margin-left: $sidebar-width;
	  margin-right: 120rem
    }
  }
}
</style>
