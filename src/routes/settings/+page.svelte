<script lang="ts">
	import { goto } from '$app/navigation'
	import { dropdownmenu } from '$components/DropdownMenu'
	import { IonPage } from 'ionic-svelte'
	import { closeOutline, timeOutline } from 'ionicons/icons'
	import { pb, currentUser } from '$services/backend.service'
	import { onMount } from 'svelte'
	console.log('currentUser', $currentUser)
	let questionDelay =
		typeof $currentUser?.questionDelay === 'string' ? parseInt($currentUser?.questionDelay || 2) : 2
	console.log('questionDelay', questionDelay)
	let questionDelayText = questionDelay === 0 ? 'Manually' : 'after ' + questionDelay + ' seconds'
	console.log('questionDelayText', questionDelayText)
	const delays = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10]
	console.log('delays', delays)
	const chooseDelay = async (e: any) => {
		let items = [
			{
				text: 'Manually',
				value: 0,
				icon: { timeOutline },
				color: 'primary',
				textcolor: 'dark',
				handler: async () => {},
			},
		]
		for (let i = 0; i < delays.length; i++) {
			const delay = delays[i]
			items.push({
				text: delay + ' seconds',
				value: delay,
				icon: { timeOutline },
				color: 'primary',
				textcolor: 'dark',
				handler: async () => {},
			})
		}
		const result = await dropdownmenu(e, items)
		console.log('chooseDelay result', result)
		if (result) {
			// pb_version = result.text
			questionDelay = result.value
			questionDelayText = result.value === 0 ? 'Manually' : 'after ' + result.value + ' seconds'
			if ($currentUser) {
				await pb.collection('users').update($currentUser.id, {
					questionDelay: questionDelay.toString(),
				})
			}
		}
	}
	console.log('ready to subscribe')
	onMount(async () => {
		console.log('onMount')
		currentUser.subscribe((user: any) => {
			if (user && user?.questionDelay !== questionDelay) {
				console.log('user changed')
				console.log('user.questionDelay', user.questionDelay, typeof user.questionDelay)
				if (user.questionDelay === '') user.questionDelay = '2';
				if (typeof user.questionDelay === 'string') {
					try {
						questionDelay = parseInt(user.questionDelay)
					} catch (error) {
						questionDelay = 2
					}
					questionDelayText =
						questionDelay === 0 ? 'Manually' : 'after ' + questionDelay + ' seconds'
				} else {
					questionDelay = 2
					questionDelayText = 'after 2 seconds'
				}
			}
		})
	})
</script>

<IonPage>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button
					on:click={() => {
						goto('/quiz')
					}}
				>
					<ion-icon slot="icon-only" icon={closeOutline} />
				</ion-button>
			</ion-buttons>
			<ion-title>Quiz Settings</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		{#if $currentUser}
			<ion-list>
				<ion-item>
					<ion-label>Advance Question</ion-label>
					<ion-button expand="block" slot="end" on:click={chooseDelay}
						>{questionDelayText || ''}</ion-button
					>
				</ion-item>
			</ion-list>
		{:else}
			<div>You must be logged in to set custom settings.</div>
		{/if}
	</ion-content>
</IonPage>
