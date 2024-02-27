<script lang="ts">
	import IonPage from '$ionpage'
	import '$styles/grid-styles.css'
	import * as allIonicIcons from 'ionicons/icons'

	import { currentUser } from '$services/backend.service'
	import { goto } from '$app/navigation'
	// import * as allIonicIcons from 'ionicons/icons';
	import LoginModal from '$components/LoginModal.svelte'
	import { modalController } from '$ionic/svelte'
	// import { page } from '$app/stores';
	import { onMount } from 'svelte'
	import { currentState } from '$services/state.service'

	//export let providers: Provider[] = [];
	export const providers: string[] = []
	export const onSignIn: Function = () => {}

	const app_version = __APP_VERSION__
	const app_name = __APP_NAME__

	onMount(() => {
		goto('/quiz')
	})

	const openLoginBox = async () => {
		const openLoginModalController = await modalController.create({
			component: LoginModal,
			componentProps: {
				providers: ['google'],
				onSignIn: () => {
					console.log('*** onSignIn')
					goto('/quiz')
				},
			},
			showBackdrop: true,
			backdropDismiss: true,
		})

		await openLoginModalController.present()
	}
</script>

<IonPage>
	Redirecting...
</IonPage>

<style>
	.padded {
		padding-left: 5px;
		padding-right: 5px;
	}
	.center {
		text-align: center;
		font-size: 1.2em;
	}
	.width-400 {
		text-align: center;
		max-width: 400px;
		margin: auto;
	}
	h3 {
		text-align: center;
	}

	.flex-item-no-border {
		max-width: 400px;
		width: 400px;
		cursor: pointer;
	}
	.flex-item {
		max-width: 400px;
		width: 400px;
		/* border: 1pt solid; */
		cursor: pointer;
		margin: 10px;
		padding-top: 0px;
		padding-bottom: 10px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.primary {
		color: var(--ion-color-primary-contrast);
		background-color: var(--ion-color-primary);
	}
	.secondary {
		color: var(--ion-color-secondary-contrast);
		background-color: var(--ion-color-secondary);
	}
	.tertiary {
		color: var(--ion-color-tertiary-contrast);
		background-color: var(--ion-color-tertiary);
	}

	.flex-container {
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		flex-flow: row nwrap;
		-webkit-flex-flow: row wrap;
		-moz-flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
	.pointer {
		cursor: pointer;
	}
	.landing-property {
		width: 300px;
		max-width: 300px;
		margin: 10px;
		cursor: pointer;
		text-align: center;
	}
</style>
