<template>
	<div class="px-0 container-fluid root-layout relative overflow-hidden ">
		<NuxtLoadingIndicator />
		<LayoutsSidebar />

		<div class="main-content z-50 md:h-[95vh] h-[calc(100vh-80px)] flex flex-col">
			<Headers id="header" class="" />
			<section class="px-5  md:p-6 relative bg-transparent overflow-auto h-full">
				<div class="relative h-full">
					<slot />
				</div>
			</section>
		</div>
	</div>

	<Alert />
	<ModalBase />
	<CommandPalette />
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'>
$sidebar-width: 14rem;
$dasboard_margin: 2rem;
$content-area-width: calc(100vw - (14rem + 1rem));
.main-content {
  background-color: #FDFDFD;
  min-height: 90vh;
  margin-left: $dasboard_margin;
  @apply border-2 border-grey9 rounded-3xl fixed md:bottom-5 md:top-5 top-[80px]  w-full;
}

.dashboard-padded {
  padding-top: 60px !important;
}

.root-layout {
  & > .main-content {
    width: 100%;
    margin-left: 0;
    background-color: #FDFDFD;

    @media screen and (min-width: 768px) {
      width: $content-area-width;
      margin-left: $sidebar-width;
	  margin-right: 120rem
    }
  }
}
</style>
