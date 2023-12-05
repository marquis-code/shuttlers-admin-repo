<template>
	<main class="card">
		<h1>Fund Credit Wallet For Select Staff</h1>
		<div>
			<label class="text-gray-700">How much credit do you want to apply?</label>
			<input class="w-full rounded-md py-2.5 px-4 outline-none border" type="number">
		</div>
		<div>
			<label class="text-gray-700">Narration for this credit</label>
			<textarea class="w-full rounded-md py-2.5 px-4 resize-none outline-none border" rows="4" cols="4" />
		</div>
		<div>
			<label>Which employees do you want to give this credit to?</label>
			<div class="flex items-center gap-x-6">
				<label for="dropdown_select">
					<input id="dropdown_select" type="radio">
					Select from drop down
				</label>
				<label for="csvupload">
					<input id="csvupload" type="radio">
					Select from csv document
				</label>
			</div>
		</div>
		<div>
			<label>
				<label>
					<input type="checkbox">
					Schedule to apply later</label>
			</label>
		</div>
		<div>
			<label>
				<label>
					<input type="checkbox">
					Clear previous balance</label>
			</label>
		</div>
	</main>
</template>

<script>
export default {

}
</script>

<style>

</style>
