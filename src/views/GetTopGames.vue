<template>
    <div id="GetTopGamesContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1 class="title">List of Top Games</h1>
        <div id="topGames">
            <div class="topGame" v-for='topGame in listOfTopGames' :key='topGame.gameID'>
                <div class="topGameCon">
                    <a href="" v-on:click="goToSpecificGameStreamPage(topGame.gameID, topGame.gameName)">
                        <div class="topGameThumbnailContainer">
                            <img class="topGameThumbnail" :src="`${topGame.gameBoxArtURL}`" alt="">
                        </div>
                        <div class="topGameDescription">
                            {{ topGame.gameName }}
                        </div>
                    </a>
                </div>
            </div>
           
        </div>
         <Observer v-on:intersect="intersected"></Observer>
    </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks'
import Observer from '../components/Observer'

export default {
    name: 'GetTopGames',
    data: function() {
        return {
            listOfTopGames: [],
            pagination: '',
        }
    },
    components: {
        topNavBarLinks,
        Observer,
    },
    methods: {
        fetchTopGames: function(pagination) {
            let fetchLink = 'https://api.twitch.tv/helix/games/top?first=30'

            if(pagination) {
                fetchLink = 'https://api.twitch.tv/helix/games/top?first=30&after=' + pagination
            }

            fetch(fetchLink, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer sw3mh7vbr6cg57707wt9z1tacgxg80',
                    'Client-ID': 'mol6qnk4ve1okoj0bojsmlwgzq7b09'
                })
            })
                .then(
                    function(response) {
                        return response.json();
                    }
                )
                .then(
                    data => {
                        //console.log(data)
                        this.pagination = data.pagination.cursor

                        let dataListOfTopGames = []

                        for(var key in data.data) {
                            dataListOfTopGames.push({
                                gameID: data.data[key].id,
                                gameName: data.data[key].name,
                                gameBoxArtURL: data.data[key].box_art_url.replace('{width}', '213').replace('{height}', '285'),
                            })
                        }

                        this.listOfTopGames = [...this.listOfTopGames, ...dataListOfTopGames]
                    }
                );
        },
        goToSpecificGameStreamPage: function(gameID, gameName)  {
            this.$router.push({
                name: 'StreamersForGame',
                params: {
                    game_name: gameName,
                },
                query: {
                    gameID: gameID,
                }
            })
        },
        intersected: function() {
            this.fetchTopGames(this.pagination)
        }

        // OAuth code - st04x477izxjmq4475yvec0sca6lwt

    },
    mounted () {
        //this.fetchTopGames()
    }
}
</script>

<style>

.title {
    padding-top: 10px;
    color: #dfdfdf;
    font-weight: 100;
}

#topGames {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.topGame {
    flex-basis: 100%;
    padding: 7px;
    margin-bottom: 20px;
}

.topGameCon {
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transition: transform .2s; 
    transition: 0.2s;
    background-color: #f4e1f8;
}

.topGameDescription {
    padding: 10px;
}

.topGameCon a {
    font-size: 18px;
    color: rgb(26, 26, 26);
    text-decoration: none;
}

.topGameCon:hover {
    transform: scale(1.03);
    transition: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.5);
}

.topGame img {
    border-radius: 5px 5px 0 0;
}

.topGameThumbnail {
    width: 100%;
}

@media only screen and (min-width: 350px){
    .topGame {
        flex-basis: 50%;
    }
}
@media only screen and (min-width: 650px){
    .topGame {
        flex-basis: 33.33333333333333%;
    }
}
@media only screen and (min-width: 950px){
    .topGame {
        flex-basis: 25%;
    }
}
@media only screen and (min-width: 1250px){
    .topGame {
        flex-basis: 20%;
    }
}
@media only screen and (min-width: 1550px){
    .topGame {
        flex-basis: 16.66666666667%;
    }
}
@media only screen and (min-width: 1850px){
    .topGame {
        flex-basis: 14.2857142857%;
    }
}

</style>