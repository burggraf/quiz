<script lang="ts">
	import IonPage from "$ionpage";
    import { pb, currentUser } from '$services/backend.service';
	import { onMount } from "svelte"
    import type { Question } from './quiz.interfaces'
    import { initQuestion } from "./quiz.interfaces";
    import { goto } from '$app/navigation'
	import Login from '$components/Login.svelte'
	import { settingsOutline } from "ionicons/icons"
	// import { loadingBox } from '$services/loadingMessage'

	const app_version = __APP_VERSION__
	const app_name = __APP_NAME__

    let question: Question = initQuestion();
    let correct: number = 0;
    let total: number = 0;
    let answered = false;
    const getQuestion = async () => {
        const result = await pb.send("/getquestion", {});
        question = result.result as Question; 
        question.answerMap = ['a', 'b', 'c', 'd'].sort(() => Math.random() - 0.5);
    }
    let vars: any;
    onMount(async () => {
        await getQuestion();
        vars = await pb.send("/getvars", {});
    });
    let delay = ($currentUser?.questionDelay || 2) * 1000;
    const getScore = async () => {
        if (!$currentUser) {
            try {
                console.log('load score from localStorage')
                correct = parseInt(localStorage.getItem('correct') || '0');
                total = parseInt(localStorage.getItem('total') || '0');
                console.log('loaded score from localStorage', correct, total)
            } catch (error) {

            }
            return;
        }
        try {
            const record = await pb.collection('trivia_log_score').getFirstListItem(`id="${$currentUser?.id}"`, {});
            if (record) {
                correct = record.correct;
                total = record.total;
            }
        } catch (error) {
            // no data, probably
        }
    }
    currentUser.subscribe(async (user: any) => {
        // if (user?.id === $currentUser?.id && total > 0) {
        //     return; // no need to keep loading the score when this fires multiple times
        // }
        console.log('user changed, calling getScore()')
        await getScore();
    });
    const logQuestion = async (letter: string) => {
        if (!$currentUser) {
            localStorage.setItem('correct', correct.toString());
            localStorage.setItem('total', total.toString());
            return;
        } else {
            pb.collection('trivia_log').create({
                question: question.id,
                chosen: letter,
                correct: (letter === 'a'),
                user: $currentUser.id,
            });
        }
    }
    const updateAnswers = () => {
        for (let i = 0; i < 4; i++) {
            const el: any = document.getElementById(`item-${i}`);
            if (el) {
                el.color = '';
                el.fill = 'outline';
            }
        }
        answered = false;
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
            delay = ($currentUser?.questionDelay || 2) * 1000;
            answered = true;
            if (delay > 0) {
                setTimeout(() => {
                    updateAnswers();
                    getQuestion();
                }, delay);
            } 
        }
    }
</script>
<IonPage>
    <ion-header>
        <ion-toolbar color="transparent">
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

        {#if question?.id}
        <ion-card>
            <ion-card-header>
              <ion-card-title>{question.category}</ion-card-title>
              <ion-card-subtitle>{question.subcategory}</ion-card-subtitle>
            </ion-card-header>
          
            <ion-card-content>
                {question.question}
            </ion-card-content>
          
            <div class="ion-padding">
            <ion-button class="ion-text-wrap" id="item-0" fill="outline" on:click={selectAnswer(question.answerMap[0])}>{question[question.answerMap[0]]}</ion-button>
            <ion-button class="ion-text-wrap" id="item-1" fill="outline" on:click={selectAnswer(question.answerMap[1])}>{question[question.answerMap[1]]}</ion-button>
            <ion-button class="ion-text-wrap" id="item-2" fill="outline" on:click={selectAnswer(question.answerMap[2])}>{question[question.answerMap[2]]}</ion-button>
            <ion-button class="ion-text-wrap" id="item-3" fill="outline" on:click={selectAnswer(question.answerMap[3])}>{question[question.answerMap[3]]}</ion-button>
            </div>
            {#if delay === 0 && answered}
            <ion-card-footer>
                <ion-button expand="block" fill="clear" on:click={()=>{updateAnswers();getQuestion();}}>Next Question</ion-button>
            </ion-card-footer>
            {/if}
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
                {correct} of {total} ({Math.round(correct / Math.max(1, total) * 100)}%)
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