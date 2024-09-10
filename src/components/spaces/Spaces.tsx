import React, { useState, useEffect } from 'react';
import { Space } from '../../model/Model';
import { DataService } from '../../services/DataService';
import SpaceComponent from './SpaceComponent';
import ConfirmModalComponent from './ConfirmModalComponent';

interface SpacesState {
    spaces: Space[];
};

interface ModalState {
    showModal: boolean,
    modalContent: string
}

type SpaceProps = {
    dataService: DataService
};

const Spaces = ({ dataService } : SpaceProps) => {
    const [spaces, setSpaces] = useState<SpacesState>({ spaces: [] });
    const [modal, setModal] = useState<ModalState>({ showModal: false, modalContent: '' });

    useEffect(() => {
        const spaces =async () => {
            const res = await dataService.getSpaces();
            setSpaces({
                spaces: res
            })
        } 

        spaces()
    });

    const reserveSpace = async (spaceId: string) => {
        const reservatioResult = await dataService.reserveSpace(spaceId);
        if (reservatioResult) {
            setModal({
                showModal: true,
                modalContent: `You reserved the space with id: ${spaceId} and got the reservation number ${reservatioResult}` 
            })
        } else {
            setModal({
                showModal: true,
                modalContent: `You can't reserve the space with id ${spaceId}`
            })
        }
    }

    const renderSpaces = () => {
        const rows: any[] = [];
        for (const space of spaces.spaces) {
            rows.push(
                <SpaceComponent 
                    location={space.location}
                    name={space.name}
                    spaceId={space.spaceId}
                    reserveSpace={reserveSpace}
                />
            )
        }
        return rows;
    }

    const closeModal = () => {
        setModal({
            showModal: false,
            modalContent: ''
        })
    }

  return (
    <div>
        <h2>Welcome to the Spaces Page!</h2>
        {renderSpaces()}
        <ConfirmModalComponent 
            close={() => closeModal()} 
            content={modal.modalContent} 
            show={modal.showModal}
        />
    </div>
  )
}

export default Spaces