import React from "react";
import genericImage from '../../assets/ItMightBeTime.jpg'
import './SpaceComponent.css'

type SpaceComponentProps = {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string,
    reserveSpace: (spaceId: string) => void
}

const SpaceComponent =  ({ spaceId, name, location, photoUrl, reserveSpace} : SpaceComponentProps) => {

    const renderImage = () => {
        return photoUrl ? <img src={photoUrl} alt=""/>: <img src={genericImage} alt=""/>;
    }

    return (
        <div className="spaceComponent">
            {renderImage()}
            <label className="name">{name}</label><br/>
            <label className="spaceId">{spaceId}</label><br/>
            <label className="location">{location}</label><br/>
            <button onClick={() => reserveSpace(spaceId)}>Reserve</button>
        </div>
    )
}

export default SpaceComponent;