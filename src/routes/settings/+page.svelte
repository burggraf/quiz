<script lang="ts">
	import { goto } from '$app/navigation'
	import { IonPage } from 'ionic-svelte'
	import { closeOutline } from 'ionicons/icons'
    
</script>

<IonPage>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button on:click={()=>{goto("/quiz")}}>
					<ion-icon slot="icon-only" icon={closeOutline} />
				</ion-button>
			</ion-buttons>
			<ion-title>Quiz Settings</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<h1>Quiz Settings</h1>
	</ion-content>
</IonPage>
