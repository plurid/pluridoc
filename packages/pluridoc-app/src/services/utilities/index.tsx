import React from 'react';



interface PluridPlaneComponentProperties {
    [key: string]: any;
}


interface PluridPlane {
    id: string;
    component: JSX.Element;
    properties: PluridPlaneComponentProperties;
    coordinates: {
        x: number;
        y: number;
        z: number;
    }
    width: number | string;
    height: number | string;
}


interface Plane {

}


export const convertPluridFileContentToPluridReact = (content: Plane[]) => {
    const planes: any[] = [];

    for (let planeData of content) {
        const plane = {
            id: Math.random(),

        }
    }
}


const a = [
    {
        id: 1,

    },
    {
        id: 2,

    },
    {
        id: 3,

    },
];

const b = [
    {
        children: [
            {

            },
            {

            }
        ]
    },
]



// construnction
// strunction
// struction
const pluridConstruction = {
    construnction: {
        width: '50%',
        gap: '5%',
    },
    plurids: []
}

