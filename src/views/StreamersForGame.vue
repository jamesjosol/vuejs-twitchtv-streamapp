<template>
    <div id="streamersForGameContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1 class="title">Streamers For {{ $route.params.game_name }}</h1>
        <div id="topStreamersForSpecificGames">
            <div class="topStreamersForSpecificGame" v-for='topStreamersForSpecificGame in listOfTopStreamersForSpecificGame' :key='topStreamersForSpecificGame.id'>
                <div class="specificGameCon">
                    <a class="specificGameLink" :href='`../streamer/${topStreamersForSpecificGame.user_name}?streamerID=${topStreamersForSpecificGame.user_id}`'>
                        <div class="specificGameThumbnailContainer">
                            <img class="specificGameThumbnail" :src="`${topStreamersForSpecificGame.stream_thumbnail_url}`" alt="">
                        </div>

                        <div class="specificGameDescription">
                            <div class="username">{{ topStreamersForSpecificGame.user_name }}</div>
                            <div class="viewerCount">Viewers: {{ topStreamersForSpecificGame.streamer_viewer_count }}</div>
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
    name: 'StreamersForGame',
    components: {
        topNavBarLinks,
        Observer,
    },
    data: function() {
        return {
            listOfTopStreamersForSpecificGame: [],
            pagination: '',
        }
    },
    methods: {
        fetchTopStreamersForSpecificGame: function(pagination) {
            let fetchLink = 'https://api.twitch.tv/helix/streams?first=30&game_id=' + this.$route.query.gameID;

            if(pagination) {
                fetchLink = 'https://api.twitch.tv/helix/streams?first=30&game_id=' + this.$route.query.gameID + '&after=' + pagination;
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
                        let dataListOfTopStreamersForSpecificGame = []

                        for(var key in data.data) {
                            dataListOfTopStreamersForSpecificGame.push({
                                id: data.data[key].id,
                                user_id: data.data[key].user_id,
                                user_name: data.data[key].user_name,
                                title: data.data[key].title,
                                stream_thumbnail_url: data.data[key].thumbnail_url.replace('{width}', '440').replace('{height}', '248'),
                                streamer_viewer_count: data.data[key].viewer_count,
                            })
                        }

                        this.listOfTopStreamersForSpecificGame = [...this.listOfTopStreamersForSpecificGame, ...dataListOfTopStreamersForSpecificGame]
                    }
                );
        },
        intersected: function() {
            this.fetchTopStreamersForSpecificGame(this.pagination)
        }
    },
    mounted() {
        //this.fetchTopStreamersForSpecificGame()
    }
}
</script>

<style>
.title {
    padding-top: 10px;
    color: #dfdfdf;
    font-weight: 100;
}

#topStreamersForSpecificGames {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
}

.topStreamersForSpecificGame {
    flex-basis: 100%;
    padding: 7px;
    margin-bottom: 7px;
}

.specificGameCon {
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transition: transform .2s; 
    transition: 0.2s;
    background-color: #f4e1f8;
}

.specificGameCon:hover {
    transform: scale(1.03);
    transition: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.5);
}

.specificGameCon img {
    border-radius: 5px 5px 0 0;
}

.specificGameCon a {
    text-decoration: none;
}

.specificGameDescription div{
    padding: 5px;
}

.specificGameDescription .username {
    font-size: 1.5em;
    color: #1d1d1d;
}

.specificGameDescription .viewerCount {
    font-size: 1.1em;
    color: #004c63;;
}

.specificGameThumbnail {
    width: 100%;
}

@media only screen and (min-width: 600px) {
    .topStreamersForSpecificGame {
        flex-basis: 50%;
    }
}

@media only screen and (min-width: 900px) {
    .topStreamersForSpecificGame {
        flex-basis: 33.3333333333%;
    }
}

@media only screen and (min-width: 1200px) {
    .topStreamersForSpecificGame {
        flex-basis: 25%;
    }
}

@media only screen and (min-width: 1500px) {
    .topStreamersForSpecificGame {
        flex-basis: 20%;
    }
}

</style>