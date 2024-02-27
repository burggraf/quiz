<script lang="ts">
	import IonPage from "$ionpage";
    import { pb } from '$services/backend.service';
	import { onMount } from "svelte"
    import type { Question } from './quiz.interfaces'
    import { initQuestion } from "./quiz.interfaces";
    import { currentUser } from '$services/backend.service';
    import { goto } from '$app/navigation'
	import Login from '$components/Login.svelte'
	import { settingsOutline } from "ionicons/icons"

	const app_version = __APP_VERSION__
	const app_name = __APP_NAME__

    let question: Question = initQuestion();
    let correct: number = 0;
    let total: number = 0;
    const getQuestion = async () => {
        const result = await pb.send("/getquestion", {});
        question = result.result as Question; 
        question.answerMap = ['a', 'b', 'c', 'd'].sort(() => Math.random() - 0.5);
    }
    let vars: any;
    onMount(async () => {
        await getQuestion();
        console.log('vars', vars)
    });
    const ionViewDidEnter = async () => {
        // await getScore();
        vars = await pb.send("/getvars", {});
        // await getScore();
    }
    const getScore = async () => {
        if (!$currentUser) {
            return;
        }
        try {
            const record = await pb.collection('trivia_log_score').getFirstListItem(`id="${$currentUser.id}"`, {});
            if (record) {
                correct = record.correct;
                total = record.total;
            }
        } catch (error) {
            // no data, probably
        }
    }
    currentUser.subscribe(async (user: any) => {
        if (user?.id === $currentUser?.id && total > 0) {
            return; // no need to keep loading the score when this fires multiple times
        }
        if (user) {
            console.log('user changed, calling getScore()')
            await getScore();
        }
    });
    const logQuestion = async (letter: string) => {
        if (!$currentUser) {
            return;
        }
        pb.collection('trivia_log').create({
            question: question.id,
            chosen: letter,
            correct: (letter === 'a'),
            user: $currentUser.id,
        });
    }
    const selectAnswer = (letter: string) => {
        // get position of this letter in the answerMap
        const index = question.answerMap.indexOf(letter);
        const chosenEl: any = document.getElementById(`item-${index}`);
        return () => {
            if (letter === 'a') {
                if (chosenEl) {
                    chosenEl.color = 'success';
                    chosenEl.fill = 'outline';
                }
                correct++;
            } else {
                if (chosenEl) {
                    chosenEl.color = 'danger';
                }
                const correctEl: any = document.getElementById(`item-${question.answerMap.indexOf('a')}`);
                if (correctEl) {
                    correctEl.color = 'success';
                    correctEl.fill = 'outline';
                }
            }
            total++;
            logQuestion(letter);
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    const el: any = document.getElementById(`item-${i}`);
                    if (el) {
                        el.color = '';
                        el.fill = 'clear';
                    }
                }
                getQuestion();
            }, 2000)
        }
    }
</script>
<IonPage {ionViewDidEnter}>
    <ion-header>
        <ion-toolbar color="transparent">
            <!-- <ion-buttons slot="start">
                <ion-menu-button />
            </ion-buttons> -->
            <ion-title>{app_name} {app_version}</ion-title>
            <ion-buttons slot="start">
                <ion-button on:click={() => {
                    goto('/settings')
                }}>
                    <ion-icon slot="icon-only" icon={settingsOutline}></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

        {#if question.id}
        <ion-card>
            <ion-card-header>
              <ion-card-title>{question.category}</ion-card-title>
              <ion-card-subtitle>{question.subcategory}</ion-card-subtitle>
            </ion-card-header>
          
            <ion-card-content>
                {question.question}
            </ion-card-content>
          
            <div class="ion-padding">
            <ion-button class="item-text-wrap" id="item-0" fill="clear" on:click={selectAnswer(question.answerMap[0])}>{question[question.answerMap[0]]}</ion-button>
            <ion-button class="item-text-wrap" id="item-1" fill="clear" on:click={selectAnswer(question.answerMap[1])}>{question[question.answerMap[1]]}</ion-button>
            <ion-button class="item-text-wrap" id="item-2" fill="clear" on:click={selectAnswer(question.answerMap[2])}>{question[question.answerMap[2]]}</ion-button>
            <ion-button class="item-text-wrap" id="item-3" fill="clear" on:click={selectAnswer(question.answerMap[3])}>{question[question.answerMap[3]]}</ion-button>
            </div>
        </ion-card>
        {:else}
        <ion-card>
            <ion-card-header>
              <ion-card-title>Loading question...</ion-card-title>
            </ion-card-header>
            <ion-card-subtitle style="padding-left: 30px;">monkeys returning to typewriters in 1...2...</ion-card-subtitle>
             
                <ion-card-content class="ion-text-center">
                 <ion-spinner />
                </ion-card-content>
        </ion-card>
        {/if}
        

    </ion-content>
    <ion-footer>
        <ion-toolbar color="transparent" class="ion-text-center">
            {#if $currentUser}
            <div style="width: 100%;" on:click={()=>{goto('/account')}}>
                {$currentUser?.name || $currentUser?.email}: 
                {correct} of {total} ({Math.round(correct / Math.max(1, total) * 100)}%)
            </div>
            {:else}
                <div style="padding-left: 20px;padding-right: 20px;">
                    <div style="margin: auto;width: 100%; max-width: 400px;">
                    <Login
                        providers={['google']}
                        onSignOut={() => {
                            localStorage.clear()
                            // goto('/');
                            window.location.href = '/quiz'
                        }}
                        onSignIn={() => {
                            goto('/quiz')
                            // goto('/dashboardwelcome');
                        }}
                    /></div>
                </div>
            {/if}
            <ion-grid style="width: 100%;">
                <ion-row style="width: 100%;">
                    <ion-col size={"4"} class="ion-text-center">
                        <span
                        on:click={() => {
                            goto('/terms')
                        }}
                        class="pointer">Service Terms</span>        
                    </ion-col>
                    <ion-col size={"3"} class="ion-text-center">
                        <span
                            on:click={() => {
                                goto('/privacy')
                            }}
                            class="pointer">Privacy</span
                        >
                    </ion-col>
                    <ion-col size={"3"} class="ion-text-center">
                        <span
                            on:click={() => {
                                goto('/support')
                            }}
                            class="pointer">Support</span
                        >        
                    </ion-col>
                    <ion-col size={"2"} class="ion-text-center">
                        {vars?.FLY_REGION ? vars?.FLY_REGION : "---"}
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-toolbar>

    </ion-footer>
</IonPage>
<style>
  ion-spinner {
    width: 100px;
    height: 100px;
  }    
</style>