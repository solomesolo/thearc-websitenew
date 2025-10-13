import React, { useEffect } from 'react';
import "./aboutView.scss"
import { useToggleFooter } from '../../components/hooks/useToggleFooter';
import { Link } from 'react-router-dom';
type Props = {}
const AboutView = (props: Props) => {
    const { fix, unFix } = useToggleFooter()

    useEffect(() => {
        fix()
        return () => {
            unFix()
        }
    }, [])
    return (
        <>
            <section className="section-box shop-template">
                <div className="container">
                    <div className="about-us-block">
                        <div className="about-us-container">
                            <h1 className="about-us-title">
                                About The Arc
                            </h1>
                            <div className="about-us-main-text">
                                <div className="block">
                                    The Arc was founded at the intersection of science, technology, and deep human curiosity — by a longevity-driven engineer, a data-obsessed doctor, and a systems thinker who believes health should feel intelligent, not overwhelming.
                                </div>
                                <div className="block">
                                    From within the healthcare and tech industries, we saw the rise of digital health. We also saw how much noise came with it. Endless products, fragmented data, and promises that often missed the point: helping real people live longer, better lives — with less guesswork.
                                </div>
                                <div className="block">
                                    The Arc is a quiet response to that chaos.
                                </div>
                                <div className="block">
                                    Our platform brings together the most trusted D2C at-home health tools — from lab testing and biological age analysis to recovery trackers and gut health insights — all in one place, calmly curated and openly accessible.
                                </div>
                                <div className="block">
                                    This is not a marketplace in the traditional sense. It’s a map.
                                </div>
                                <div className="block">
                                    For those outside the circle, it’s a starting point.<br />
                                    For those inside, it becomes a system — supported by expert guidance, evolving protocols, and an intimate cohort of people committed to health as a long-term craft.
                                </div>
                                <div className="block">
                                    Whether you're optimizing glucose, decoding your epigenetic age, or just learning how to hear your body more clearly — The Arc helps you move with intention, not overwhelm.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutView;
{/* <div className="row">
    <div className="col-lg-10 mx-auto">
        <h5 className="color-gray-500 mb-10">About us</h5>
        <h2>Hainu</h2>
        <div className="row mt-20">
            <div className="col-lg-6">
                <p className="font-sm font-medium color-gray-700 mb-15">
                    Hainu was founded by an AI enthusiast corporate leader, a health-optimising
                    programmer, and an innovation-craving doctor. From our respective positions in
                    the
                    healthcare industry, we have witnessed the rapid growth of digital healthcare.
                    We
                    believe that as more people embrace online health services, the industry is
                    undergoing a transformation similar to other forms of e-commerce. However, we
                    have
                    identified several areas where the digital healthcare revolution falls short of
                    its
                    full potential. So we decided to build a comprehensive digital health platform.
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    Meanwhile, we’ve realized that the research we conducted so far could already
                    provide value to people. This led us to create the Hainu catalog of digital
                    health
                    services, the first of its kind in the UK. If you share our interest in this
                    topic,
                    we encourage you to keep an eye on our platform as we will keep making
                    improvements
                    to enhance its usefulness.
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    Our website is designed to provide simple and effective navigation and
                    comparison
                    of services. Each company page includes information about the service provider,
                    similar services, quality-affirming attributes, and, where available, reviews
                    from
                    previous users. Our goal is to provide you with an objective and independent
                    assessment of service quality, enabling you to choose the best match for your
                    needs.
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    We would greatly appreciate it if you could inform companies that our platform
                    has
                    helped you choose their services. This will help us raise awareness about
                    Hainu.
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    We are open to suggestions for improving the information we provide. If you
                    have
                    any questions, please reach out to us at <a href={"mailto:info@hainu.eu"}>info@hainu.eu</a>.
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    Thank you for using our platform! Stay healthy and informed!
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    Your digital healthcare guides,
                </p>

                <p className="font-sm font-medium color-gray-700 mb-15">
                    The Hainu team
                </p> */}
{/*<p className="font-sm font-medium color-gray-700 mb-15">*/ }
{/*    Hainu is a project aimed at*/ }
{/*    building human-centric digital health infrastructure. We aim to*/ }
{/*    provide equal access to the best medical and well-being services. Our team*/ }
{/*    consists of technicians and medical professionals who share a common belief in*/ }
{/*    the power of prevention and health management. We work with the goal to achieve*/ }
{/*    better service quality both for*/ }
{/*    patients and doctors.</p>*/ }
{/*<p className="font-sm font-medium color-gray-700 mb-15">This platform is developed*/ }
{/*    to enable simple and effective search of medical providers and to*/ }
{/*    build the first classified catalogue of medical service providers which*/ }
{/*    currently operate in the UK. Each company page contains information about the*/ }
{/*    service provider, connected field of services and reviews from previous*/ }
{/*    users.</p>*/ }
{/*<p className="font-sm font-medium color-gray-700 mb-15">*/ }
{/*    Please note that this platform has no financial interests and doesn’t cooperate*/ }
{/*    with any of the service providers. We aim to provide you with an objective and*/ }
{/*    independent estimation of the service quality for you to be able to choose the*/ }
{/*    best match for your needs.*/ }
{/*</p>*/ }
{/*<p className="font-sm font-medium color-gray-700 mb-15">*/ }
{/*    We will be incredibly thankful if you could inform companies when ordering their*/ }
{/*    services*/ }
{/*    that our platform has helped you to choose them. This will help get the word out*/ }
{/*    about us.*/ }
{/*</p>*/ }
{/*<p className="font-sm font-medium color-gray-700 mb-15">*/ }
{/*    We are open to any suggestions for improving the information we provide. For all*/ }
{/*    questions*/ }
{/*    please write to us to [email].*/ }
{/*</p>*/ }
{/*<p className="font-sm font-medium color-gray-700 mb-15">*/ }
{/*    Thank you for using our platform! Stay healthy and informed!*/ }
{/*</p>*/ }
{/*<ul className="list-services mt-20">*/ }
{/*    <li className="hover-up">We provide actual list of AI med services</li>*/ }
{/*    <li className="hover-up">Manually picked best companies</li>*/ }
{/*    <li className="hover-up">Rating & reviews for every site</li>*/ }
{/*    <li className="hover-up">Updates every day</li>*/ }
{/*</ul>*/ }
{/* </div>
            <div className="col-lg-6"><img src="/assets/imgs/page/about/img.png" alt="Ecom"/></div>
        </div>


    </div>
</div> */}