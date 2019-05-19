import React, {Component,Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import "../../styles/Home.css"
import { publicDecrypt } from 'crypto';

class Home extends Component {
    constructor(props){
        super(props)
        this.state ={ store : ''}
    }

    // componentDidMount = () => {
    //     $('.carousel.carousel-slider').carousel({
    //         fullWidth: true,
    //         indicators: true
    //       });
    // }
   
    render() {

        return(
            <Fragment> 
                
                <div className="carousel carousel-slider center"
                    style={{
                        backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/2.jpeg)",
                        backgroundSize: "cover"
                    }}>
                    <div className="lightbox valign-wrapper" >
                            <div className="inside-carousel" style={{marginTop: '0%'}}>
                                BEST INFRASTRUCTURE
                            </div>
                            <hr/>
                    </div>
                </div>

                <div className="row caousel-below"
                        style={{
                            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/ram.png)",
                            backgroundSize: "cover",
                        }}>
                            <div className="col s2">
                                    <h5 className="facts quick">Quick Facts</h5>
                            </div>
                            <div className="col s2">
                                    <h5 className="facts inside-fact">64th</h5>
                                    Rank in India
                            </div>
                            <div className="col s2">
                                <h5 className="facts inside-fact">Best</h5>
                                among Eng. Institutions
                                under VTU
                                Affliation
                            </div>
                            <div className="col s2">
                                <h5 className="facts inside-fact">46</h5>
                                Industrial 
                                Collaboration
                            </div>
                            <div className="col s2">
                                <h5 className="facts inside-fact">350</h5>
                                Industrial 
                                Collaboration
                            </div>
                            <div className="col s2">
                                <h5 className="facts inside-fact">95%</h5>
                                Placement
                                Percentage
                            </div>
                 </div>
                 <span></span>
            </Fragment>
        )
    }

}

export default Home