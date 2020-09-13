import {Link} from '../routes'
import React, { Component } from 'react'
import slug from '../helpers/slug'

class Podcast extends Component {
    render () {
        const { ultimosAudios, onClickPodcast } = this.props
        return (
        <div>
            {
                ultimosAudios.map((audio) => {
                    return (
                        <Link route="podcast"
                          params={{
                              slugChannel: slug(audio.channel.title),
                              channelId: audio.channel.id,
                              slug: slug(audio.title),
                              id: audio.id
                          }}
                          key={audio.id}>
                        <a className="podcast" 
                        onClick={(event) => onClickPodcast(event, audio)}
                        >
                            <h3> {audio.title} </h3>
                            <div className="meta">
                                {Math.ceil(audio.duration / 60)} minutes
                            </div>
                        </a>
                        </Link>
                    )
                })
            }

            <style jsx>{`
            .podcast {
                display: block;
                text-decoration: none;
                color: #333;
                padding: 15px;
                border-bottom: 1px solid rgba(0,0,0,0.2);
                cursor: pointer;
              }

              .podcast:hover {
                color: #000;
              }

              .podcast h3 {
                margin: 0;
              }
              
              .podcast .meta {
                color: #666;
                margin-top: 0.5em;
                font-size: 0.8em;
              }
              `}</style>

        </div>
        )
    }
}

export default Podcast