/* eslint-disable eqeqeq,no-multiple-empty-lines */

// Help functions for map

import {CONSTANTS} from "./constants";

/**
 * Convert hex to rgba color
 * @param hex
 * @param opacity
 * @returns {string}
 */
export function hexToRgbA(hex, opacity) {
    if (!opacity) {
        opacity = 1
    }

    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        let test = 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
        return test;
    }
    throw new Error('Bad Hex');
}


export function stringDivider(str, width, spaceReplacer) {
    if (str !== null && str !== undefined && str.length > width) {
        let p = width
        while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
            p--
        }
        if (p > 0) {
            let left
            if (str.substring(p, p + 1) == '-') {
                left = str.substring(0, p + 1)
            } else {
                left = str.substring(0, p)
            }
            let right = str.substring(p + 1)
            return left + spaceReplacer + stringDivider(right, width, spaceReplacer)
        }
    }
    return str
}

export function getIconNameByStatusColor(statusColor) {
    let iconName = ''
    if (statusColor !== null) {
        if (statusColor === 1) {
            // Object is moving "GREEN"
            iconName = 'tractor-icon-green.png'
        } else if (statusColor === 2) {
            // Object is moved before "YELLOW"
            iconName = 'tractor-icon-yellow.png'
        } else if (statusColor === 3) {
            // Object is NOT moving "parking"
            iconName = 'tractor-icon-blue.png'
        } else if (statusColor === 0) {
            iconName = 'tractor-icon-red.png'
        } else {
            // Object is NOT moving
            iconName = 'tractor-icon.png'
        }
    } else {
        iconName = 'tractor-icon.png'
    }

    return iconName
}

export function getPopupContent(responsedEvent, roleId, messages, self) {
    // console.log(messages)
    // console.log(messages.eventComplaintTitle)
    // console.log(responsedEvent.userLogin)
    // console.log(this.$t('popup.writeToTelegram'))
    // console.log(self.$t('popup.writeToTelegram'))

    let urlTelegram = 'https://t.me/' + responsedEvent.userLogin
    let eventId = responsedEvent.eventId
    let txWriteToTelegram = self.$t('popup.writeToTelegram')
    let anonymousMessage = self.$t('popup.anonymousMessage')
    let userFirstName = (responsedEvent.userFirstName || '')
    let userLastName = (responsedEvent.userLastName || '')
    let userPhotoUrl = (responsedEvent.userPhotoUrl || 'https://www.w3schools.com/howto/img_avatar.png')
    let eventName = anonymousMessage
    let eventDescription = anonymousMessage
    let categoryId = (responsedEvent.categoryId || '')
    let showEventNameForAnonym = responsedEvent.showNameForAnonym
    let showEventDescriptionForAnonym = responsedEvent.showDescriptionForAnonym
    let disabled = responsedEvent.userId === responsedEvent.responsedUserId ? "disabled='disabled'" : ''
    let disabledClass = responsedEvent.userId === responsedEvent.responsedUserId ? "v-btn--disabled" : ''

    let eventComplaintTitle = messages.eventComplaintTitle || ''
    let createRouteToEvent = messages.createRouteToEvent || ''


    if (roleId) {
        eventName = (responsedEvent.name || '')
        eventDescription = (responsedEvent.message || '')
    } else {
        // console.log(showEventNameForAnonym)
        // console.log(showEventDescriptionForAnonym)

        if (showEventNameForAnonym) {
            // console.log('111')
            eventName = (responsedEvent.name || '')
        }

        if (showEventDescriptionForAnonym) {
            // console.log('222')
            eventDescription = (responsedEvent.message || '')
        }

    }

    eventName = addSpaceByLimit(eventName, ' ', 32)
    eventDescription = addSpaceByLimit(eventDescription, ' ', 32)
    // eslint-disable-next-line no-unused-vars
    // let userEmail = '@' + (feature.get('user_email') || '')

    let userNamevDiv

    if (responsedEvent.userLogin) {
        userNamevDiv = "<div class=\"v-list-item__subtitle\" id='popup-send-message'><a target='_blank' href='" + urlTelegram + "'>" + txWriteToTelegram + "</a></div></div>"
    } else {
        userNamevDiv = "<div class=\"v-list-item__subtitle\" id='popup-send-message'><a>" + txWriteToTelegram + "</a></div></div>"
    }

    let popupHtml = "" +
        "  <div class=\"row pa-0 ma-0 justify-space-between\">\n" +
        "    <div class=\"overline py-2\">ID: " + eventId + "" +
        "" +
        "<button type=\"button\" id=\"popup-create-route-to-event\" class=\"v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default\"><span\n" +
        "            title='" + createRouteToEvent + "' class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
        "               style=\"color: #4285F4;\"   class=\"v-icon notranslate mdi mdi-directions theme--light\"></i></span>" +
        "" +
        "<button type=\"button\" class=\"v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default\"><span\n" +
        "            title='" + eventComplaintTitle + "' class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
        "              id=\"popup-complaint-to-event\" style=\"color: #ffd633;\"   class=\"v-icon notranslate mdi mdi-alert-rhombus theme--light\"></i></span>" +
        "" +

        "</div>\n" +
        // "    <div class=\"\">\n" +
        // "      <button type=\"button\" class=\"v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default\"><span\n" +
        // "              class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
        // "                                      class=\"v-icon notranslate mdi mdi-alert-rhombus theme--light\"></i></span>\n" +
        // "      <button type=\"button\" class=\"v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default\"><span\n" +
        // "              class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
        // "                                        class=\"v-icon notranslate mdi mdi-share-variant theme--light\"></i></span>\n" +
        // "      </button>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div tabindex=\"-1\" class=\"v-list-item theme--light\" id='popup-user-info'>\n" +
        "    <div class=\"v-avatar v-list-item__avatar \" style=\"height: 40px; min-width: 40px; width: 40px;\"><img src=\" " + userPhotoUrl + "  \" alt=\"Avatar\" class=\"avatar\"></div>\n" +
        "    <div class=\"v-list-item__content\">\n" +
        "      <div class=\"v-list-item__title\"> " + userFirstName + ' ' + userLastName + "</div>\n" +
        // "      <button type=\"button\" class=\"v-btn v-btn--contained theme--dark v-size--x-small secondary\" id='btn_response_link' value='" + urlTelegram + "'><span class=\"v-btn__content\"> " + txWriteToTelegram + "</span></button>" +
        userNamevDiv +

        "    </div>\n" +
        "  </div>\n" +
        "  <hr role=\"separator\" aria-orientation=\"horizontal\" class=\"v-divider theme--light\">\n" +
        "  <div class=\"v-card__text px-1 py-2\"> " + eventName + "</div>\n" +
        "  <div class=\"v-card__text px-1 py-2 secondary--text\" style='max-height: 200px; overflow-y: auto; overflow-x: hidden;'> " + (eventDescription) +
        "  </div>\n" +
        "</div>";
    popupHtml += "<div>";
    // let sObjAcc
    // let addresObj = JSON.parse(feature.get('address'))

    // '<p>feature id:' + feature.getId() + '</p>';


    // popupHtml += "<li><label>" + "ID:" + "</label> <span>" + feature.getId() + "</span></li>";
    // popupHtml += "<li><label>" + "Category:" + "</label> <span>" + feature.get('category_id') + "</span></li>";
    // popupHtml += "<li><label>" + "Name:" + "</label> <span>" + feature.get('name') + "</span></li>";
    // popupHtml += "<li><label>" + "Description:" + "</label> <span>" + feature.get('description') + "</span></li>";
    // popupHtml += "<li><label>" + "Address:" + "</label> <span>" + addresObj.display_name + "</span></li>";


    switch (categoryId) {
        case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
            if (roleId) {
                // sObjAcc = '/#';
                // popupHtml += "<a v-on:click=\"this.resizeMap()\"> rtyurtuyrtuyy</a>";
                popupHtml += "<div class=\"v-card__actions px-0\">\n" +
                    "    <button type=\"button\"\n" + disabled +
                    "            class=\"v-btn v-btn--depressed " + disabledClass + " v-btn--flat v-btn--outlined theme--light v-size--default info--text\"\n" +
                    "            id=\"event-response\"><span class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
                    "                                                                class=\"v-icon notranslate v-icon--left mdi mdi-telegram theme--light\"></i> "
                    + (messages.readyToHelpText) +
                    "  </span>\n" +
                    "    </button>\n" +
                    "    <div class=\"spacer\"></div>\n" +
                    "  </div>";

            } else {
                // sObjAcc = '/#/login';
                popupHtml += "<div class=\"v-card__actions px-0 mb-4\">\n" +
                    "    <button type=\"button\"\n" + disabled +
                    "            class=\"v-btn v-btn--depressed " + disabledClass + " v-btn--flat v-btn--outlined theme--light v-size--default info--text\"\n" +
                    "            id=\"event-response\"><span class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
                    "                                                                class=\"v-icon notranslate v-icon--left mdi mdi-telegram theme--light\"></i> "
                    + (messages.readyToHelpText) + "\n </span>\n" +
                    "    </button>\n" +
                    "    <div class=\"spacer\"></div>\n" +
                    "  </div>";
            }
            break;
        default:
            popupHtml += "<div class=\"v-card__actions px-0 mb-4\" style='display: none'>\n" +
                "    <button type=\"button\"\n" + disabled +
                "            class=\"v-btn v-btn--depressed " + disabledClass + " v-btn--flat v-btn--outlined theme--light v-size--default info--text\"\n" +
                "            id=\"event-response\"><span class=\"v-btn__content\"><i aria-hidden=\"true\"\n" +
                "                                                                class=\"v-icon notranslate v-icon--left mdi mdi-telegram theme--light\"></i>  "
                + (messages.readyToHelpText) + " \n </span>\n" +
                "    </button>\n" +
                "    <div class=\"spacer\"></div>\n" +
                "  </div>";
            break;
    }

    // popupHtml += "</div>";

    return popupHtml
}

function addSpaceByLimit(s, ch, limit) {
    const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
    limit = cyrillicPattern.test(s) ? 22 : limit

    var rx = new RegExp(
        "[A-Za-z_а-яА-ЯЁё_0-9]{" + limit + "}" + // Match a digit, limit times
        "(?!" +  // Only match if, immediately to the right, there is no
        ch.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + // delimiting char (escaped)
        "|$)", // or end of string
        "g"); // Global modifier, replace all occurrences
    return s.replace(rx, "$&" + ch); // Replace with the match itself + delimiting char
}

