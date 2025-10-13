import React from 'react';
import { Certificates } from "../api/types";
import { Tooltip } from 'react-tooltip'

type Props = {
    cert: Certificates,
    idx: number,
}
const ISOIconComponent = ({ cert, idx }: Props) => {
    let element = <span>{cert.specification}</span>
    if (cert.image !== null) {
        element = <img src={cert.image} height={40} alt={cert.description} />
    } else if (cert.organisation_entity?.image !== null) {
        element = <img src={cert.organisation_entity?.image} height={40} alt={cert.description} />
    } else if (cert.specification == "No ISO") {
        element = <span></span>
    }

    let tooltipId = "cert" + idx + "id" + cert.id
    return (<span data-tooltip-id={tooltipId} data-tooltip-content={cert.description}>
        {element}
        <Tooltip id={tooltipId} className='tooltip' style={{ maxWidth: 350, zIndex: 999 }}>
            {cert.description}
        </Tooltip>
    </span>)
};

export default ISOIconComponent;
