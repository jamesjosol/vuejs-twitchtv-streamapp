<template>
    <div id="StreamerContainer">
        <topNavBarLinks></topNavBarLinks>
        <div class="stream-con">
            <h1 class="title">{{ this.streamTitle }}</h1>
            <div class="con">
                <div id="twitch-embed"></div>
                <div class="streamerInfoContainer">
                    <h2 class="streamerName">{{ $route.params.streamer_user_name }}</h2>
                    <h3 class="viewerCount">Viewers: {{ streamViewerCount }}</h3>
                </div>

                <div id="twitch_embed_script_link"></div>
            </div>
            
        </div>
        <div class="notice">
            <h5>If video stream doesn't appear click this button: </h5>
            <a class="refresh-btn" onclick="location.reload()"><i class="fas fa-sync"></i></a>
        </div>
    </div>
</template>

<script></script>
<script>
import topNavBarLinks from '../components/topNavBarLinks'

export default {
    name: 'Streamer',
    data: function() {
        return {
            streamerID: 0,
            streamerName: '',
            gameID: '',
            gameName: '',
            streamTitle: '',
            streamViewerCount: 0,
        }
    },
    components: {
        topNavBarLinks,
    },
    methods: {
        fetchStreamInfo: function() {
            let fetchLink = 'https://api.twitch.tv/helix/channels?broadcaster_id=' + this.$route.query.streamerID;
            
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
                        this.streamerID = data.data[0].broadcaster_id
                        this.streamerName = data.data[0].broadcaster_name
                        this.gameID = data.data[0].game_id
                        this.gameName = data.data[0].game_name
                        this.streamTitle = data.data[0].title
        
                    }
                );
        },
        
        insertTwitchEmbedScript: function() {
            let twitchEmbedDiv = document.querySelector('#twitch_embed_script_link')
            let twitch_embed_script = document.createElement('script')
            twitch_embed_script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js')
            
            twitchEmbedDiv.appendChild(twitch_embed_script)
        },

        runTwitchEmbed: function() {
            var embed = new Twitch.Embed("twitch-embed", {
                width: '100%',
                height: 500,
                channel: this.$route.params.streamer_user_name,
                layout: 'vide-with-chat'
            });

            
            embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
                var player = embed.getPlayer()
                player.play()
            })
        },

        fetchStreamViewerCount: function() {
            fetch('https://api.twitch.tv/helix/streams?user_id=' + this.$route.query.streamerID, {
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
                        this.streamViewerCount = data.data[0].viewer_count
                    }
                );
        },

        fetchStreamViewerCountSetInterval: function() {
            setInterval(() => {
                this.fetchStreamViewerCount()
            }, 120000)
        }

    },
    mounted () {
        this.fetchStreamInfo()
        this.insertTwitchEmbedScript()
        setTimeout(() => this.runTwitchEmbed(), 500)
        this.fetchStreamViewerCount()
        this.fetchStreamViewerCountSetInterval()
    }
}
</script>

<style>

.title {
    padding-top: 10px;
    color: #dfdfdf;
    font-weight: 100;
}

.con {
    padding: 2% 5% 3% 5%;
}

.streamerInfoContainer {
    padding-left: 5%;
    text-align: left;
}

.streamerInfoContainer .streamerName,
.streamerInfoContainer .viewerCount{
    padding-top: 5px;
    color: #dfdfdf;
    font-weight: 100;
}


.stream-con {
    margin: 20px;
    box-shadow: 1px 1px 4px 4px rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background-color: #100013;
}
.notice {
    padding: auto;
    padding-bottom: 25px;
}

.notice h5{
    padding: 10px 0 10px 10px;
    color: #f4e1f8;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: inline;
    background-color: #1b0220;  
    border-radius: 5px 0 0 5px;
}

.refresh-btn {
    padding: 10px;
    background-color: #1b0220;  
    color: #f8aeff;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
}

.refresh-btn:hover {
    color: #f9d8fc;
    transition: 0.2s;
    text-shadow: 0px 0px 8px rgb(255, 255, 255);
    
}

</style>