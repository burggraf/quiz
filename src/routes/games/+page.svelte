<script lang="ts">
	import IonPage from "$ionpage";
    import { pb, currentUser } from '$services/backend.service';
	import { onMount } from "svelte"
    import type { Question } from './quiz.interfaces'
    import { initQuestion } from "./quiz.interfaces";
    import { goto } from '$app/navigation'
	import Login from '$components/Login.svelte'
    import { dropdownmenu } from '$components/DropdownMenu'
	import { peopleOutline, personOutline, settingsOutline, trashOutline, ellipseOutline } from "ionicons/icons"
	// import { loadingBox } from '$services/loadingMessage'

	const app_version = __APP_VERSION__
	const app_name = __APP_NAME__
    let name: string = '';
    let games: any[] = [];

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
        // await getQuestion();
        vars = await pb.send("/getvars", {});
        
        // get all games I belong to
        const games = await pb.collection('games').getFullList({
            sort: '-created',
        });
        console.log('games', games)

        // get all players for games I belong to
        const games_users = await pb.collection('games_users').getList(1, 50, {
            // filter: 'gameid = "tao3gww8qzfql20"'
        });
        console.log('games_users', games_users)
        await getMyGames();

    });
    const getMyGames = async () => {
        games = await pb.collection('games').getFullList({
            sort: '-created',
        });
        console.log('games', games)
    }
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
    const createGame = () => {
        console.log('createGame()')
    }
    const joinGame = () => {
        console.log('joinGame()')
    }
    const startGame = async () => {
        console.log('startGame()')
        if (!name) {
            return;
        }
        try {
            const game = await pb.collection('games').create({
                title: name,
                type: 'public',
                status: 'open',
                hostid: $currentUser.id,
            });
            console.log('game', game)
            await pb.collection('games_users').create({
                gameid: game.id,
                userid: $currentUser.id,
                score: 0,
            });
            name = '';
            await getMyGames();

        } catch (error) {
            console.error('error', error)
        }
    
    }

    const changeGameStatus = async (e: any, game: any) => {
        console.log('changeGameStatus()', e)
		let items = [
			{
				text: 'open',
				// icon: { ellipseOutline },
				color: 'primary',
				textcolor: 'dark',
				// handler: async () => {},
			},
			{
				text: 'closed',
				// icon: { trashOutline },
				color: 'danger',
				//textcolor: 'danger',
				// handler: async () => {},
			},

		]
		const result = await dropdownmenu(e, items)
		console.log('changeGameStatus result', result)
        if (result && result.text !== 'open') {
            game.status = result.text;
            await pb.collection('games').update(game.id, {
                status: result.text,
            });
            await getMyGames();
        } 

    }
</script>
<IonPage>
    <ion-header>
        <ion-toolbar color="transparent">
            <ion-title>Quiz Game</ion-title>
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

        <div class="ion-text-center" style="max-width: 500px;margin: auto;">
            <ion-item-divider>
                <ion-label>Games</ion-label>
            </ion-item-divider>
            <ion-list>
                {#each games as game}
                    <ion-item style="cursor: pointer;" lines="full"
                    on:click={() => {
                        goto(`/game/${game.id}`)
                    }}>
                        <ion-label slot="start">{game.title}</ion-label>
                        <ion-button 
                            style="width: 60px;"
                            on:click|stopPropagation={(e)=>{changeGameStatus(e, game)}} 
                            color={game.status === 'closed' ? 'danger' : 'primary'}
                            size="small" slot="end">{game.status}</ion-button>
                    </ion-item>
                {/each}
            </ion-list>
        </div>
        <!-- <div class="ion-text-center" style="max-width: 500px;margin: auto;">
            <ion-button expand="block" color="primary" size="small" on:click={createGame}>
                Create a Game
            </ion-button>
            <div style="height: 20px;">Join a game:</div>
            <ion-button expand="block" color="success" size="small" on:click={joinGame}>
                Join Game XXXX
            </ion-button>

        </div> -->

        <div class="ion-text-center" style="max-width: 500px;margin: auto;">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>New Game</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-label>Game Name:</ion-label>
					<ion-item class="GridItem" lines="none">
						<ion-input
							on:ionInput={(e)=>{ name = e.detail.value || ''; }}
							type="text"
							class="InputBoxWithIcon"
							placeholder="game name"
							style="--padding-start: 10px;"
							value={name}
							debounce={500}
						/>
						<ion-icon
							class="inputIcon"
							icon={peopleOutline}
							size="large"
							color="medium"
							slot="start"
						/>
					</ion-item>
                    <ion-button style="padding-left: 50px;" expand="block" color="primary" size="small" on:click={startGame}>
                        Start Game
                    </ion-button>
        
                </ion-card-content>
            </ion-card>

        </div>


    </ion-content>
    <ion-footer>
        <ion-toolbar color="transparent" class="ion-text-center">
            {#if $currentUser}
                <div class="ion-text-center">
                    score goes here
                </div>
            {:else}
                <div class="ion-text-center">not logged in</div>
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
	.title {
		padding-left: 10px;
	}
	.container {
		width: 150px;
		height: 150px;
		border: 1px solid; /* Optional, just for visibility */
		border-color: var(--ion-color-medium);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container ion-img {
		max-width: 100%;
		max-height: 100%;
	}
	.Grid {
		max-width: 500px;
	}
	.ProvidersGrid {
		max-width: 375px;
	}
	input:-webkit-autofill {
		-webkit-text-fill-color: var(--ion-color-FORCEDARK);
		font-weight: 500px;
	}

	input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--ion-color-FORCEDARK);
		font-weight: 500px;
	}

	.inputIcon {
		margin-left: 10px;
		margin-right: 10px;
	}

	.GridItem {
		--padding-start: 0px;
		--padding-end: 0px;
		--inner-padding-end: 0px;
	}
	.InputBoxWithIcon {
		height: 50px;
		border: 1px solid;
		border-color: var(--ion-color-medium);
		background-color: var(--ion-background-color) !important;
		border-radius: 5px;
	}
	.toast {
		font-weight: bold;
	}
	.flex-container {
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		flex-flow: row wrap;
		-webkit-flex-flow: row wrap;
		-moz-flex-flow: row wrap;
		justify-content: center;
	}
</style>
