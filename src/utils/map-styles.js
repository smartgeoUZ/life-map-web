/* eslint-disable eqeqeq,no-multiple-empty-lines,no-multi-spaces,no-trailing-spaces */

import * as mapUtils from '../../src/utils/map-utils'
import {CONSTANTS} from '../utils/constants'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Text from 'ol/style/Text'
import Stroke from 'ol/style/Stroke'
import RegularShape from 'ol/style/RegularShape'
import Icon from 'ol/style/Icon'
import {Circle as CircleStyle} from "ol/style";

export const textVisibleMinZoom = 15
export const darkMapsTextColor = 'white'
export const defaultMapsTextColor = 'rgba(61, 61, 61, 1)'

// eslint-disable-next-line no-unused-vars
let styleCachePoint = {};
// let styleCachePoi = {};

// Style functions for map

// export  function featureStylePointBase(feature) {
//     // let styleName = feature.get('featureStyle');
//     let style;
//     //
//     // if (!style) {
//     //     console.log('no style')
//     //     // console.log('featureStyleBase')
//     //     style =
//     //     styleCachePoint[styleName] = style;
//     // } else {
//     //     // console.log('has style')
//     }
//     return pinSquareStyle(feature);
// }

// const svgImg = require('../assets/icons/dot.png')
// let fontSize = 11

// export function defaultFeatureStyle(feature, zoomedForCluster) {
//     // console.log('defaultFeatureStyle!!!')
//     // eslint-disable-next-line no-unused-vars
//     // let pinId = feature.get('pinId')
//
//     let titleColor = feature.get('titleColor')
//     let featureType = feature.getGeometry().getType()
//
//     // console.log(featureType)
//     // console.log(CONSTANTS.FEATURE_TYPE.POINT)
//
//     if (featureType === CONSTANTS.FEATURE_TYPE.POINT) {
//         if (zoomedForCluster) {
//             return [
//                 new Style({
//                     image: new Icon({
//                         opacity: 1,
//                         scale: 1,
//                         src: svgImg
// //            imgSize:[32,32]
//                     }),
//                     text: new Text({
//                         font: '11px Arial',
//                         scale: 1,
//                         text: mapUtils.stringDivider(feature.get('title'), 16, '\n'),
//                         offsetY: 29,
// //          fill: new Fill({color: 'rgb(0,0,0)'}),
//                         stroke: new Stroke({
//                             color: 'rgba(20, 40, 67, 0.3)',
//                             width: 1
//                         }),
//                         overflow: true,
//                         placement: 'Point',
//                         geometry: function (feature) {
//                             let originalFeature = feature.get('features')
//
//                             if (originalFeature !== undefined && originalFeature !== null) {
//                                 return originalFeature[0].getGeometry()
//                             } else {
// //                  console.log(originalFeature)
//                                 return feature.getGeometry()
//                             }
//                         }
//                     })
//                 })
//             ]
//         } else {
//             return [
//                 new Style({
//                     image: new Icon({
//                         opacity: 1,
//                         scale: 1,
//                         src: svgImg
// //            imgSize:[32,32]
//                     }),
//                     text: new Text({
//                         font: '11px Arial',
//                         scale: 1,
//                         text: mapUtils.stringDivider(feature.get('title'), 16, '\n'),
//                         offsetY: 29,
// //          fill: new Fill({color: 'rgb(0,0,0)'}),
//                         stroke: new Stroke({
//                             color: 'rgba(20, 40, 67, 0.3)',
//                             width: 1
//                         }),
//                         overflow: true,
//                         placement: 'Point'
// //            text: mapUtils.stringDivider(feature.get('title'), 16, '\n'),
//
//                     })
//                 })
//             ]
//         }
//     } else {
//         if (zoomedForCluster) {
//             return [
//                 new Style({
//                     fill: new Fill({
//                         color: mapUtils.hexToRgbA(feature.get('polygonColor'), 1)
//                     }),
//                     stroke: new Stroke({
//                         color: '#1589FF',
//                         width: 1
//                     }),
//                     text: new Text({
//                         font: fontSize + 'px Arial',
//                         fill: new Fill({color: titleColor}),
//                         scale: 1,
//                         stroke: new Stroke({
//                             color: titleColor, width: 0.5
//                         }),
//                         text: mapUtils.stringDivider(feature.get('title'), 16, '\n'),
//                         overflow: false,
//                         placement: 'Point'
//                     }),
//                     geometry: function (feature) {
//                         let originalFeature = feature.get('features')
//
//                         if (originalFeature !== undefined && originalFeature !== null) {
//                             return originalFeature[0].getGeometry()
//                         } else {
// //                console.log(originalFeature)
//                             return feature.getGeometry()
//                         }
//                     }
//                 })
//             ]
//         } else {
//             let lineWidth = 1
//
//             if (featureType === this.$featureTypeLineString) {
//          console.log(feature.get('lineWidth'))
//          console.log(feature)
//                 if (feature.get('lineWidth') !== null && feature.get('lineWidth') !== undefined) {
//                     lineWidth = feature.get('lineWidth')
//                 }
//             }
//             return [
//                 new Style({
//                     fill: new Fill({
//                         color: mapUtils.hexToRgbA(feature.get('polygonColor'), 1)
//                     }),
//                     stroke: new Stroke({
//                         color: '#1589FF',
//                         width: lineWidth
//                     }),
//                     text: new Text({
//                         font: fontSize + 'px Arial',
//                         fill: new Fill({color: titleColor}),
//                         scale: 1,
//                         stroke: new Stroke({
//                             color: titleColor, width: 0.5
//                         }),
//                         text: mapUtils.stringDivider(feature.get('title'), 16, '\n'),
//                         overflow: false,
//                         placement: 'Point'
//                     })
//                 })
//             ]
//         }
//     }
// }
//
// export function poiStyleBase(feature, size, isPoiClustering) {
//     let stylePoiName = 'poi-' + size + '-' + isPoiClustering
//     let stylePoi = styleCachePoi[stylePoiName];
//
//     if (!stylePoi) {
//         // console.log('no style')
//
//         if (size > 1) {
//             stylePoi = poiClusterStyle(size)
//         } else {
//             if (isPoiClustering) {
//                 let originalFeature = feature.get('features')[0]
//                 stylePoi = defaultFeatureStyle(originalFeature, true)
//             } else {
//                 stylePoi = defaultFeatureStyle(feature, true)
//             }
//         }
//
//         styleCachePoi[stylePoiName] = stylePoi;
//     } else {
//         // console.log('has style: ' + stylePoiName)
//     }
//
//     return stylePoi;
// }

// export function poiStyle(feature, resolution, size, isPoiClustering) {
//     let style
//
//     if (size > 1) {
//         style = poiClusterStyle(size)
//     } else {
//         if (isPoiClustering) {
//             let originalFeature = feature.get('features')[0]
//             style = defaultFeatureStyle(originalFeature, true)
//         } else {
//             style = defaultFeatureStyle(feature, true)
//         }
//     }
//     return style
// }

// export function poiStyle(feature, resolution, size, isPoiClustering) {
//     let style
//
//     if (size > 1) {
//         style = poiClusterStyle(size)
//     } else {
//         if (isPoiClustering) {
//             let originalFeature = feature.get('features')[0]
//             style = defaultFeatureStyle(originalFeature, true)
//         } else {
//             style = defaultFeatureStyle(feature, true)
//         }
//     }
//     return style
// }

export function poiClusterStyle(size) {
    return [
        new Style({
            zIndex: 12,
            image: new RegularShape({
                fill: new Fill({
                    color: 'rgba(255, 165, 60, 0.9)'
                }),
                stroke: new Stroke({
                    color: '#fff'
                }),
                points: 3,
                radius: 20,
                angle: 45
            }),
            text: new Text({
                text: size.toString(),
                fill: new Fill({
                    color: '#fff'
                })
            })
        })
    ]
}

export function userLocationStyle() {
    return [
        new Style({
            image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                    color: '#3399CC'
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        })
    ]
}


export function pinCircleDotStyle() {
    return [
        new Style({
            image: new Icon({
                color: [113, 140, 0],
                crossOrigin: 'anonymous',
                src: require('../assets/icons/dot.png')
            })
        })
    ]
}

let styleCache = {};

export function defaultClusterStyle(feature) {
    let size = feature.get('features').length;
    let style = styleCache[size];

    if (!style) {
        style = new Style({
            image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                    color: '#fff'
                }),
                fill: new Fill({
                    color: '#3399CC'
                })
            }),
            text: new Text({
                text: size.toString(),
                fill: new Fill({
                    color: '#fff'
                })
            })
        });
    }

    return style
}

// eslint-disable-next-line no-unused-vars
export function pointOnlyCenterStyle(feature) {
    new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new Stroke({
            color: '#319FD3',
            width: 1
        }),
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
                color: '#319FD3',
                width: 1
            })
        })
    })

}

export function pinCircleRedStyle() {
    return [new Style({
        image: new Icon({
            color: '#a80004',
            crossOrigin: 'anonymous',
            // imgSize: [20, 20],
            src: require('../assets/icons/dot.png')
        })
    })]
}

export function addressStyle(feature) {
    let featureType = feature.getGeometry().getType()

    if (featureType === CONSTANTS.FEATURE_TYPE.POINT) {
        return addressPointStyle(feature);
    } else if (featureType === CONSTANTS.FEATURE_TYPE.POLYGON) {
        return addressPolygonStyle(feature);
    } else if (featureType === CONSTANTS.FEATURE_TYPE.MULTIPOLYGON) {
        return addressPolygonStyle(feature);
    } else if (featureType === CONSTANTS.FEATURE_TYPE.LINE_STRING) {
        return addressLineStringStyle(feature);
    } else {
        console.log(featureType)
    }
}

function addressPointStyle(feature) {
    return [new Style({
        image: new Icon({
            color: '#292ba8',
            crossOrigin: 'anonymous',
            // imgSize: [20, 20],
            src: require('../assets/icons/dot.png')
        }),
        text: new Text({
            font: 'bold 14px Helvetica',
            text: mapUtils.stringDivider(feature.get('name'), 32, '\n'),
            offsetY: 48,
            fill: new Fill({
                color: 'black'
            }),
            stroke: new Stroke({
                color: 'White',
                width: 5
            }),
            overflow: true
        })
    })]
}

function addressPolygonStyle(feature) {
    // console.log('addressPolygonStyle')
    // console.log(mapUtils.stringDivider(feature.get('name'), 24, '\n'))

    return [new Style({
        fill: new Fill({
            color: mapUtils.hexToRgbA('#922dea', 0.1),
        }),
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        text: new Text({
            font: 'bold 14px Helvetica',
            text: mapUtils.stringDivider(feature.get('name'), 32, '\n'),
            offsetY: 64,
            fill: new Fill({
                color: mapUtils.hexToRgbA('#000', 0.7),
            }),
            stroke: new Stroke({
                color: 'White',
                width: 5
            }),
            overflow: true
        })
    })];
}

function addressLineStringStyle(feature) {
    return [new Style({
        stroke: new Stroke({
            color: mapUtils.hexToRgbA('#922dea', 0.5),
            width: 7,
        }),
        text: new Text({
            font: 'bold 14px Helvetica',
            text: mapUtils.stringDivider(feature.get('name'), 32, '\n'),
            offsetY: 32,
            fill: new Fill({
                color: 'black'
            }),
            stroke: new Stroke({
                color: 'White',
                width: 5
            }),
            overflow: true
        })
    })];
}

// const pinImage = CONSTANTS.ICON_PATH + 'icon.png'
const pinImage = require('../assets/icons/pin_icon.png')

export function defaultMarkerStyle() {
    // console.log('defaultMarkerStyle')
    return [
        new Style({
            image: new Icon({
                scale: 0.75,
                anchor: [0.41, 64],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: pinImage,
            })
        })
    ]
}

export function pinSquareStyle() {
    return new Style({
        zIndex: 1999,
        image: new Icon({
            color: '#4271AE',
            crossOrigin: 'anonymous',
            src: require('../assets/icons/dot.png')
        })
    })
}

export function featureAnimationStyle(radius, opacity) {
    return new Style({
        image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
                color: 'rgba(255, 0, 0, ' + opacity + ')',
                width: 0.25 + 1
            })
        })
    })
}

export function routeStyle(feature, resolution) {
    let featureType = feature.getGeometry().getType()

    if (featureType === CONSTANTS.FEATURE_TYPE.POINT) {
        return routeIconStyle(feature, resolution);
    } else if (featureType === CONSTANTS.FEATURE_TYPE.LINE_STRING) {
        return routeLineStringStyle(feature, resolution);
    } else {
        return routeLineStringStyle(feature, resolution);
    }
}

export function routeIconStyle(urlIcon) {
    console.log('routeIconStyle')
    // console.log(urlIcon)

    return [
        new Style({
            image: new Icon({
                opacity: 1,
                scale: 1,
                src: urlIcon,
                anchor: [0.18, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                // fontColor: "black"
            })
        })
    ];

    // image: new Icon({
    //     color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
    //     scale: 0.8,
    //     anchor: [0.5, 24],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     opacity: 1,
    //     src: CONSTANTS.ICON.NEED_HELP_CLUSTER
    // }),
}

function routeLineStringStyle(feature, resolution) {
    let radius = 5;
    let color = '#2351ca';
    let hasLine = true;
    let opacity = 0.7;

    let strokeWidth;

    if (hasLine) {
        strokeWidth = 2 * radius / resolution * .703125;
    } else {
        strokeWidth = 1;
    }

    // console.log(strokeWidth);

    if (strokeWidth > 5 && strokeWidth <= 10) {
        strokeWidth = strokeWidth * 1.5
    } else if (strokeWidth > 2 && strokeWidth <= 5) {
        strokeWidth = strokeWidth * 2
    } else if (strokeWidth > 1 && strokeWidth <= 2) {
        strokeWidth = strokeWidth * 4
    } else if (strokeWidth > 0.5 && strokeWidth <= 1) {
        strokeWidth = strokeWidth * 8
    } else if (strokeWidth > 0.1 && strokeWidth <= 0.5) {
        strokeWidth = strokeWidth * 24
    } else if (strokeWidth <= 0.1) {
        strokeWidth = strokeWidth * 32
    }

    return [new Style({
        stroke: new Stroke({
            color: mapUtils.hexToRgbA(color, opacity),
            width: strokeWidth
        })
    })];
}

//region Event category styles
let styleCacheNeedHelp = {};
let styleCacheReadyAssist = {};
let styleCacheWater = {};
let styleCacheFood = {};
let styleCacheHealthCareCenter = {};
let styleCacheDoctor = {};
let styleCacheBloodCenter = {};
let styleCacheBloodDonor = {};
let styleCacheCharity = {};
let styleCacheAttention = {};
let styleCacheDriver = {};
let styleCacheVet = {};

export function needHelpStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheNeedHelp[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = needHelpStyleCluster(isActive, quantity)
        } else {
            style = needHelpStyle(isActive)
        }
        styleCacheNeedHelp[quantity] = style
    }
    // else {
    // console.log('has style')
    // }

    return style
}

export function readyAssistStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheReadyAssist[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = readyAssistStyleCluster(isActive, quantity)
        } else {
            style = readyAssistStyle(isActive)
        }
        styleCacheReadyAssist[quantity] = style
    }

    return style
}

export function waterStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheWater[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = waterStyleCluster(isActive, quantity)
        } else {
            style = waterStyle(isActive)
        }
        styleCacheWater[quantity] = style
    }

    return style
}

export function foodStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheFood[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = foodStyleCluster(isActive, quantity)
        } else {
            style = foodStyle(isActive)
        }
        styleCacheFood[quantity] = style
    }

    return style
}

export function healthCareCenterStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheHealthCareCenter[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = healthCareCenterStyleCluster(isActive, quantity)
        } else {
            style = healthCareCenterStyle(isActive)
        }
        styleCacheHealthCareCenter[quantity] = style
    }

    return style
}

export function doctorStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheDoctor[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = doctorStyleCluster(isActive, quantity)
        } else {
            style = doctorStyle(isActive)
        }
        styleCacheDoctor[quantity] = style
    }

    return style
}

export function bloodCenterStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheBloodCenter[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = bloodCenterStyleCluster(isActive, quantity)
        } else {
            style = bloodCenterStyle(isActive)
        }
        styleCacheBloodCenter[quantity] = style
    }

    return style
}

export function bloodDonorStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheBloodDonor[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = bloodDonorStyleCluster(isActive, quantity)
        } else {
            style = bloodDonorStyle(isActive)
        }
        styleCacheBloodDonor[quantity] = style
    }

    return style
}

export function charityStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheCharity[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = charityStyleCluster(isActive, quantity)
        } else {
            style = charityStyle(isActive)
        }
        styleCacheCharity[quantity] = style
    }

    return style
}


export function attentionStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheAttention[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = attentionStyleCluster(isActive, quantity)
        } else {
            style = attentionStyle(isActive)
        }
        styleCacheAttention[quantity] = style
    }

    return style
}

export function driverStyleBase(feature) {
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheDriver[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = driverStyleCluster(isActive, quantity)
        } else {
            style = driverStyle(isActive)
        }
        styleCacheDriver[quantity] = style
    }

    return style
}

export function vetStyleBase(feature) {
    // console.log('vetStyleBase')
    let quantity = getFuturesQuantity(feature)
    let isActive = getIsActive(feature)

    let style = styleCacheVet[quantity + '-' + isActive];

    if (!style) {
        if (quantity > 1) {
            style = vetStyleCluster(isActive, quantity)
        } else {
            style = vetStyle(isActive)
        }
        styleCacheVet[quantity] = style
    }

    return style
}

// eslint-disable-next-line no-unused-vars
export function needHelpStyle(isActive) {
    // console.log(isActive)
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            // src: require('../assets/icons/sos.png')
            src: CONSTANTS.ICON.NEED_HELP
        })
    })]
}


export function needHelpStyleCluster(isActive, size) {
    // console.log('needHelpStyleCluster')
    // console.log(isActive)
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 25],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.NEED_HELP_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function readyAssistStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            // crossOrigin: 'anonymous',
            // // imgSize: [20, 20],
            // src: '/img/sos.png'
            scale: 0.7,
            anchor: [0.5, 24],

            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.READY_ASSIST
        })
    })]
}

export function readyAssistStyleCluster(isActive, size) {
    // console.log('readyAssistStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.READY_ASSIST_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function waterStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.WATER
        })
    })]
}

export function waterStyleCluster(isActive, size) {
    // console.log('waterStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.WATER_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 5
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function foodStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.FOOD
        })
    })]
}

export function foodStyleCluster(isActive, size) {
    // console.log('foodStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.FOOD_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function healthCareCenterStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.HEALTH_CARE_CENTER
        })
    })]
}

export function healthCareCenterStyleCluster(isActive, size) {
    // console.log('healthCareCenterStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.HEALTH_CARE_CENTER_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function doctorStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.DOCTOR
        })
    })]
}

export function doctorStyleCluster(isActive, size) {
    // console.log('doctorStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.DOCTOR_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function bloodCenterStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.BLOOD_CENTER
        })
    })]
}

export function bloodCenterStyleCluster(isActive, size) {
    // console.log('bloodCenterStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.BLOOD_CENTER_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function bloodDonorStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.BLOOD_DONOR
        })
    })]
}

export function bloodDonorStyleCluster(isActive, size) {
    // console.log('bloodDonorStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.BLOOD_DONOR_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function charityStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.CHARITY
        })
    })]
}

export function charityStyleCluster(isActive, size) {
    // console.log('charityStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.CHARITY_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function attentionStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.ATTENTION
        })
    })]
}

export function attentionStyleCluster(isActive, size) {
    // console.log('attentionStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.ATTENTION_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function driverStyle(isActive) {
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.DRIVER
        })
    })]
}

export function driverStyleCluster(isActive, size) {
    // console.log('driverStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.DRIVER_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function vetStyle(isActive) {
    // console.log('vetStyle')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.7,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.VET
        })
    })]
}

//endregion

export function vetStyleCluster(isActive, size) {
    // console.log('vetStyleCluster')
    return [new Style({
        zIndex: 999,
        image: new Icon({
            color: (isActive) ? [255, 255, 255] : 'rgba(111,111,111,0.01)',
            scale: 0.8,
            anchor: [0.5, 24],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: CONSTANTS.ICON.VET_CLUSTER
        }),
        text: new Text({
            font: 'bold 12px Helvetica',
            offsetY: 0,
            text: mapUtils.stringDivider(size.toString(), 16, '\n'),
            fill: new Fill({color: 'rgb(0,0,0)'}),
            stroke: new Stroke({
                color: 'White',
                width: 3
            }),
            overflow: true,
            placement: 'Point',
        })
    })]
}

export function hiddenStyle() {
    // console.log('readyAssistStyleCluster')
    return new Style(null)
}

function getFuturesQuantity(feature) {
    let quantity
    if (feature.get('features')) {
        quantity = feature.get('features').length
    } else {
        quantity = 1
    }
    return quantity
}

function getIsActive(feature) {
    let isActive
    if (feature.get('features')) {
        isActive = feature.get('features')[0].get('is_active')
    } else {
        isActive = feature.get('is_active')
    }
    return isActive
}
