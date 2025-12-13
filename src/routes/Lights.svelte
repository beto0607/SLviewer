<script lang="ts">
	import { toggleLights as toggleLightsApi } from '../utils/ligths-api.utils';
	function toggleLights() {
		toggleLightsApi().then(() => {
			console.log('yay');
		});
	}
</script>

<button class="lights" onclick={toggleLights}>💡</button>

<style lang="scss">
	button.lights {
		height: 48px;
		width: 48px;
		font-size: 32px;
	}
</style>
