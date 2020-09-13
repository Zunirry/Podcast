import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Error from 'next/error'

export default class extends React.Component {

    static async getInitialProps({ res }){
        try{
            const request = await fetch('https://api.audioboom.com/channels/recommended')
            const response = await request.json() 
            const channels = response.body
            return { channels }
        }catch(error){
            res.statusCode = 503
            return {channels: null, statusCode: 503}
        }
    }

    render() {
        const {channels, statusCode} = this.props
        console.log(statusCode)

        if(statusCode == 503){
            return <Error statusCode={statusCode} />
        }

        return (
            <Layout title="Podcast">
                <ChannelGrid channels={channels} />
            </Layout>
        )
    }
}
