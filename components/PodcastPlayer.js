import React, { Component } from 'react'
class PodcastPlayer extends Component {
    render() {

        const { dataAudio, onClose } = this.props
        console.log(dataAudio.urls.image)
        return (
            <div className="modal">

                <div className="clip">
                    <nav>
                        { onClose ?
                        <a onClick={onClose}>&lt; Volver</a>
                        :
                        <Link href={`/channel?id=${dataAudio.channel.id}`}>
                            <a className="close">&lt; Volver</a>
                        </Link>
                        }
                    </nav>

                    <picture>
                        <div
                            style={{
                                backgroundImage:
                                    `url(${dataAudio.urls.image || dataAudio.channel.urls.logo_image.original})`
                            }}
                        />
                    </picture>

                    <div className="player">
                        <h3> {dataAudio.title} </h3>
                        <h6> {dataAudio.channel.title} </h6>
                        <audio controls autoPlay={true} src={dataAudio.urls.high_mp3} type='audio/mpeg' >
                        </audio>
                    </div>

                    <style jsx>{`
                        nav {
                            background: none;
                        }

                        nav a {
                            display: inline-block;
                            padding: 15px;
                            color: white;
                            cursor: pointer;
                            text-decoration: none;
                        }

                        .clip {
                            display: flex;
                            width: 100%;
                            height: 970px;
                            flex-direction: column;
                            background: #8756ca;
                            color: white;
                            border: 2 solid yellow;
                        }

                        picture {

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 1 1;
                            flex-direction: column;
                            width: auto;
                            padding: 2%;
                        }

                        picture div {
                            margin-bottom: 350px;
                            width: 100%;
                            height: 100%;
                            background-position: 50%;
                            background-size: contain;
                            background-repeat: no-repeat;
                        }

                        .player {
                            top: 70%;
                            padding-right: 50px;
                            width: 100%;
                            background: rgba(0,0,0,0.3);
                            text-align: center;
                            height: 300px;
                            position: fixed;
                            z-index: 9999;
                        }

                        h3 {
                        margin: 0;
                        }

                        h6 {
                            margin-top: 3em;
                        }

                        audio {
                            margin-top: 2em;
                            width: 90%;
                        }

                        

                        
                    `}</style>

                </div >
            </div>


        )
    }
}

export default PodcastPlayer