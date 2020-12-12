<template>
	<view class="page-container" :class="show ? 'show' : ''">
		3
	</view>
</template>

<script>
	export default {
		name: 'third',
		components: {

		},
		data() {
			return {
				
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		display: none;
	}

	.show {
		display: block !important;
	}
</style>
