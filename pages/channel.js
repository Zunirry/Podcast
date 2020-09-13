import Error from 'next/error'

import Layout from '../components/Layout'
import Serie from '../components/Serie'
import UltimosPodcast from '../components/UltimosPodcast'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {
    constructor(props){
        super (props)
        this.state = { openPodcast: null}
    }

    static async getInitialProps({ query, res }) {
        const idChannel = query.id
        try{
            let [requestChannel, requestAudio, requestSeries] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
            ])

            if(requestChannel.status >= 400){
                return {
                    channel: null, 
                    audios: null, 
                    series: null, 
                    statusCode: requestChannel.status
                }
            }
            
            const dataChannel = await requestChannel.json()
            const channel = dataChannel.body.channel
            
            const dataAudio = await requestAudio.json()
            const audios = dataAudio.body.audio_clips
            
            const dataSeries = await requestSeries.json()
            const series = dataSeries.body.channels
            

            return { channel, audios, series }
        }catch(error){
            res.statusCode = 503
            return {channel: null, audios: null, series: null, statusCode: 503 }
        }
    }

    openPodcast = (event, audios) => {
        event.preventDefault()
        this.setState({
            openPodcast: audios
        })
    }

    closePodcast = (event) =>{
        event.preventDefault()
        this.setState({
            openPodcast: null
        })
    }

    render() {
        const { channel, audios, series, statusCode} = this.props
        const { openPodcast } = this.state 
        console.log(openPodcast)
        if(statusCode == 503){
            return <Error statusCode={statusCode} />
        }
        if(statusCode >= 400){
            return <Error statusCode={statusCode} />

        }

        return (
            <Layout title={channel.title}>

                        <div 
                        className="banner" 
                        style={{backgroundImage: `url(${channel.urls.banner_image.original})`}}
                        >
                        </div>
        
                        <h1>{channel.title}</h1>
        
                        <Serie series={series} channel={channel} />
        
                        <h2>Ultimos Podcast</h2>
                        
                        <UltimosPodcast ultimosAudios={audios} onClickPodcast={this.openPodcast}/>

                            {
                                openPodcast &&
                                <div className="modal">
                                    <PodcastPlayer dataAudio={openPodcast} onClose={this.closePodcast} />
                                </div>
                                
                                
                                
                            }
                

                <style jsx>{`
                    .banner {
                    width: 100%;
                    padding-bottom: 25%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                    }
                    h1 {
                    font-weight: 600;
                    padding: 15px;
                    }
                    h2 {
                    padding: 15px;
                    font-size: 1.2em;
                    font-weight: 600;
                    margin: 0;
                    }
                    .modal {
                        height: 100%;
                        width: 100%;
                        position: fixed;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 999;
                        backgroud: black;
                        }
                `}</style>
                
            </Layout>
        )
    }
}