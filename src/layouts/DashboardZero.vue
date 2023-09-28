<template>
	<div class="px-0 container-fluid root-layout">
		<NuxtLoadingIndicator />
		<LayoutsSidebar />

		<div class="main-content">
			<div class="dashboard-view">
				<div class="">
					<Headers id="header" />
					<div>
						<slot />
					</div>
				</div>
			</div>
		</div>

		<Alert />
		<ModalBase />
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'>
$sidebar-width: 14rem;
$content-area-width: calc(100vw - 14rem);
.main-content {
  background-color: var(--grey);
  min-height: 100vh;
}

.dashboard-view {
  position: relative;
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
    }
  }
}
</style>
