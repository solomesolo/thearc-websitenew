import React from 'react';

type Props = {}
const HomeBannerHero = (props: Props) => {
    return (
        <>
            <section className="section-box">
                <div className="banner-hero banner-homepage3">
                    <div className="container-banner">
                        <div className="box-swiper">
                            <div className="swiper-container swiper-group-1 swiper-home-3 swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                <div className="swiper-wrapper pt-5" >
                                    <div className="swiper-slide swiper-slide-duplicate swiper-slide-prev"
                                         data-swiper-slide-index="2" style={{width: 1400}} role="group"
                                         aria-label="1 / 5">
                                        <div className="box-slide-bg-1"><span className="label-green text-uppercase">recent release</span>
                                            <h1 className="font-68 mt-20">We make healthcare<br/> easy and personalised</h1>
                                            <div className="mt-10 pb-40">
                                                <span className="font-lg">
                                                    Start your personal digital healthcare journey
                                                    <br/>
                                                    by choosing the best service providers with Hainu

                                                </span>

                                                {/*<ul className="list-disc">*/}
                                                {/*    <li className="font-lg">Free Shipping. Secure Payment</li>*/}
                                                {/*</ul>*/}
                                            </div>
                                            <div className="mt-30 mb-120">
                                                {/*<a className="btn btn-brand-2 btn-gray-1000" href="shop-grid.html">Shop now</a>*/}
                                                {/*<a className="btn btn-link text-underline" href="shop-grid.html">Learn more</a>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeBannerHero;