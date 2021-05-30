<template>
    <div id="topStreamersContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1 class="title">List of Top Streamers</h1>
        <div id="topStreamers">
            <div class="topStreamer" v-for='topStreamer in listOfTopStreamers' :key='topStreamer.id'>
                <div class="topStreamerCon">
                    <a :href="`streamer/${topStreamer.user_name}?streamerID=${topStreamer.user_id}`">
                        <div class="topStreamerLink">
                            <div class="topStreamerThumbnailContainer">
                                <img class="topStreamerThumbnail" :src="`${topStreamer.thumbnail_url}`" alt="">
                            </div>
                            <div class="topStreamerDescription">
                                <span class="streamTitle"><strong>{{ topStreamer.stream_title }}</strong></span>
                                <span class="streamGame">Game: {{ topStreamer.game_name }}</span>
                                <span class="username">Stream Name: {{ topStreamer.user_name }}</span>
                                <span class="streamViewerCount">Viewers: {{ topStreamer.viewer_count }}</span>
                            </div>
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
    name: 'GetTopStreamers',
    components: {
        topNavBarLinks,
        Observer,
    },
    data: function() {
        return {
            listOfTopStreamers: [],
            pagination: '',
        }
    },
    methods: {
        fetchTopStreamers: function(pagination) {
            let fetchLink = 'https://api.twitch.tv/helix/streams?first=30'

            if(pagination) {
                fetchLink = 'https://api.twitch.tv/helix/streams?first=30&after=' + pagination
            }
        
            fetch(fetchLink, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer sw3mh7vbr6cg57707wt9z1tacgxg80',
                    'Client-ID': 'mol6qnk4ve1okoj0bojsmlwgzq7b09'
                })
            })
                .then(
                    function (response) {
                        return response.json();
                    }
                )
                .then(
                    data => {
                        //console.log(data)
                        this.pagination = data.pagination.cursor
                        
                        let dataListOfTopStreamers = []

                        for(var key in data.data) {
                            dataListOfTopStreamers.push({
                                id: data.data[key].id,
                                user_id: data.data[key].user_id,
                                user_name: data.data[key].user_name,
                                game_id: data.data[key].game_id,
                                game_name: data.data[key].game_name,
                                stream_title: data.data[key].title,
                                viewer_count: data.data[key].viewer_count,
                                thumbnail_url: data.data[key].thumbnail_url.replace('{width}', '440').replace('{height}', '248'),
                            })
                        }

                        this.listOfTopStreamers = [...this.listOfTopStreamers, ...dataListOfTopStreamers]
                    }
                );
        },
        intersected: function() {
            this.fetchTopStreamers(this.pagination)
        }
    },
    mounted () {
        //this.fetchTopStreamers()
    }
}
</script>

<style>

.title {
    padding-top: 10px;
    color: #dfdfdf;
    font-weight: 100;
}

#topStreamers {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.topStreamer {
    flex-basis: 100%;
    padding: 10px;
    margin-bottom: 10px;
    overflow:hidden;
}

.topStreamerCon {
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transition: transform .2s; 
    transition: 0.2s;
    background-color: #f4e1f8;
}

.topStreamerCon:hover {
    transform: scale(1.03);
    transition: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.5);
}

.topStreamer a {
    text-decoration: none;
}


.topStreamerDescription .streamTitle {
    padding: 5px 5px 5px 5px;
    color: #131212;
}

.topStreamerDescription .streamGame {
    color: #272727;
    font-weight: 600;
}

.topStreamerDescription .username {
    color: #303030;
}

.topStreamerDescription .streamViewerCount {
    color: #004c63;
    font-size: 1.1em;
    padding-bottom: 5px;
}

.topStreamerThumbnail {
    width: 100%;
    border-radius: 5px 5px 0 0;
}

.topStreamerDescription span{
    display: block;
}

@media only screen and (min-width: 700px) {
    #topStreamers .topStreamer {
        flex-basis: 50%;
    }
}

@media only screen and (min-width: 1000px) {
    #topStreamers .topStreamer {
        flex-basis: 33.33333333333%;
    }
}

@media only screen and (min-width: 1300px) {
    #topStreamers .topStreamer {
        flex-basis: 25%;
    }
}

@media only screen and (min-width: 1600px) {
    #topStreamers .topStreamer {
        flex-basis: 20%;
    }
}
</style>