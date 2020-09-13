import Link from 'next/link'

import React, { Component } from 'react'

class Serie extends Component {
    render () {
        const { series } = this.props
        return (
            <div>
                

                {
                    series.length > 0 &&
                        <div>
                            <h2>Series</h2>
                            <div className="channels">
                                {
                                    series.map((serie) => {
                                        return (
                                            <Link href={`/channel?id=${serie.id}`}  key={serie.id}>
                                                <a href="" className="channel">
                                                    <img src={serie.urls.logo_image.original} alt=""/>
                                                    <h2>{serie.title}</h2>
                                                </a>
                                            </Link>

                                        )
                                })}
                            </div>
                        </div>
                }

                <style jsx>{`


                   

                    h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        maring: 0;
                        text-align: center;
                    }

                    .channels {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }

                    a.channel {
                        display: block;
                        margin-bottom: 0.5em;
                        color: #333;
                        text-decoration: none;
                    }

                    .channel img{
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}

export default Serie