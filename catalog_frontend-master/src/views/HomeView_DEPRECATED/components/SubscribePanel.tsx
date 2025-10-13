import React, {useState} from 'react';
import {getClient} from "../../../api/client";

type Props = {}
const SubscribePanel = (props: Props) => {
    const [mail, setMail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string>();

    const submitMail = async (m: string) => {
        // console.log('m         = ', m);
        try {
            await getClient().mail.subscribe(m);
            setMail("");
            setMessage("You have subscribed successfully");
        } catch (e) {
            if (e) {
                // console.log('e             = ' + e);
                setError("" + e);
            }
        }
    }

    const form = (
        <>
            <div className="box-form-newsletter mt-15">
                <form className="form-newsletter">
                    <input className="input-newsletter font-xs" value={mail}
                           placeholder="Your email Address" onChange={e => setMail(e.target.value)}/>
                    <button className="btn btn-brand-2" onClick={e => {
                        e.preventDefault();
                        submitMail(mail);
                    }}>Sign Up
                    </button>
                </form>
            </div>
            <span style={{color: "red"}}>{error}</span>
        </>
    );

    return (
        <section className="section-box box-newsletter">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <h3 className="color-white">Subscrible &amp; Get <span
                            className="color-warning">Bonus</span></h3>
                        <p className="font-lg color-white">Early subscribers will get a bonus
                            and <span className="font-lg-bold">special offers.</span></p>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        {
                            !message ? form : <p className="font-lg color-white">{message}</p>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscribePanel;