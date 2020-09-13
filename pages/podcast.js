import Layout from '../components/Layout'
import PodcastPlayer from '../components/PodcastPlayer'
export default class extends React.Component {
    static async getInitialProps({query}){
        const id = query.id
        const requestAudio =  await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
        const response = await requestAudio.json()
        const dataAudio = response.body.audio_clip
        return { dataAudio }
    }
    render () {
        const { dataAudio } = this.props
        console.log(dataAudio)
        return (
            <Layout title={dataAudio.title}>
              <PodcastPlayer dataAudio={dataAudio} />
            </Layout>
        )
    }
}
