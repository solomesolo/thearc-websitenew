import React from 'react';
import {Circles} from "react-loader-spinner";

type Props = {}
const Loader = (props: Props) => {
    return (
        <>
            <div style={{width: "100%"}} className="d-flex flex-row justify-content-center mb-10 mt-20">

                <Circles
                    height="50"
                    width="50"
                    color="#F0F3F8"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />

            </div>
        </>
    );
};

export default Loader;