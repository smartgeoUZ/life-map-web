// import categories from './categories'

export default {
    message: {
        yes: 'Yes',
        no: 'No',
        showAllEvents: 'Show all events',
        filter: 'Filter',
        interval: 'Interval',
        topic: 'Topic',
        userName: 'User name',
        noData: 'No data available',
        noMatches: 'No matches',
        sendResponse: 'Your response has been sent to the user.',
        hello: 'Hello',
        accept: 'Accept',
        hours: 'hours',
        start: 'Start',
        end: 'End',
        onlyActive: 'Active only',
        myOwnEvents: 'My events',
        forModeration: 'Moderation',
        calculate: 'Calculate',
        settings: 'Settings',
        logOut: 'Log out',
        of: 'of',
        amount: 'Number',
        lang: 'Eng',
        orderAppointment: 'Order appointment',
        intervalToday: 'Today',
        intervalYesterday: 'Yesterday',
        intervalLastWeek: 'Week',
        intervalLastMonth: 'Month',
        objects: 'Object',
        reportType: 'Report Type',
        categories: 'Categories',
        search: 'Search event',
        startTypingToSearchAddress: 'Start typing to Search Address',
        searchAddress: 'Search Address',
        name: 'Name',
        lastName: 'Last name',
        firstName: 'First name',
        middleName: 'Middle name',
        workingPlace: 'Working place',
        address: 'Address',
        workPhone: 'Work phone',
        homePhone: 'Home phone',
        mobileNumber: 'Mobile',
        driverLicense: 'Driver\'s license',
        note: 'Note',
        add: 'Add event',
        edit: 'Edit',
        view: 'View',
        save: 'Save',
        update: 'Update',
        cancel: 'Cancel',
        delete: 'Delete',
        clear: 'Clear',
        back: 'Back',
        choosePhoto: 'Choose photo',
        apply: 'Apply',
        objectType: 'Object type',
        group: 'Group',
        description: 'Description',
        radius: 'Radius',
        latitude: 'Latitude',
        longitude: 'Longitude',
        objectTypeCircle: 'Circle',
        objectTypePolygon: 'Polygon',
        objectTypeLine: 'Line',
        objectTypePoint: 'Point',
        code: 'Code',
        status: 'Event status',
        moderationStatus: 'Moderation status',
        waitingModeration: 'Waiting moderation',
        moderated: 'Moderated',
        notModerated: 'Moderation not passed',
        name_center_ru: 'Administrative center (rus)',
        name_center_uz: 'Administrative center (uzb)',
        name_ru: 'Name (rus)',
        name_uz: 'Name (uzb)',
        addOnMap: 'Add event on a map',
        editEvent: 'Edit event',
        eventName: 'Event topic',
        eventDescription: 'Event description',
        eventDuration: 'Event duration',
        telegramUserName: 'Telegram user name',
        email: 'E-mail',
        eventVisibleOnDescription: 'Visible for everyone',
        eventVisibleOffDescription: 'Visible for registered users',
        descriptionMaxLengthRule: 'Event description must be less or equals than 500 characters\n',
        eventStatusActive: 'Active',
        eventStatusNotActive: 'Not active',
        moderationStatusModerated: 'Moderated',
        eventStatusIsModerating: 'Moderating',
        readyToHelp: 'I AM READY TO HELP',
        requestToCommunicateDone: 'Your request is directed to a user',
        eventComplaintTitle: 'Event complaint',
        createRouteToEvent: 'Create route to event',
        requestToEventComplaintDone: 'Your complaint has been sent, thank you for helping the project',
        requestToEventComplaintFailed: 'An error occurred while submitting an event complaint',
    },
    error: {
        network: 'Network connection error, please check your network'
    },
    popup: {
        writeToTelegram: 'Write to Telegram',
        anonymousMessage: 'Please log-in to see this field.'
    },
    menu: {
        report: 'Reports',
        orders: 'Orders',
        person: 'Personal',
        reference: 'Reference',
        rayon: 'Rayon',
        region: 'Region',
        dashboard: 'Dashboard',
        events: 'Events',
        users: 'Users',
        role: 'Role',
        layers: 'Layers',
        admin: 'Admin',
        profile: 'Profile',
        about: 'About',
        terms: 'Terms and conditions',
        logout: 'Logout'
    },
    notification: {
        areYouLeavePage: 'Are you sure you want to leave this page? All unsaved changes will be lost!',
        areYouLeavePageTitle: 'Notification',
        saved: 'Saved',
        updated: 'Updated',
        areYouSureWantDelete: 'Are you sure you want to delete item?',
        addSuccess: 'Item was successfully added',
        updateSuccess: 'Item was successfully updated',
        deleteSuccess: 'Item was successfully deleted',
        addPoiWarning: 'Add PoI to the map',
        addFieldWarning: 'Add field to the map',
        noDataByPeriod: 'There is no data for the period',
        trackPointsAnimationIsOff: 'Due to the large number of points - the selection animation on the track is disabled',
        notValidDatePeriod: 'Not valid date period',
        eventSendToModeration: 'The event has been sent for moderation, we will notify you of the moderation status via the telegram bot {url_bot}',
        youNeedRegister: 'To continue, you need to register'

    },
    validation: {
        required: '{fieldName} - is a required field',
        minLengthI: '{fieldName} must be more than {count} characters',
        minLengthB: '{fieldName} must be more than {count} characters',
        minLengthG: '{fieldName} must be more than {count} characters',
        email: 'E-mail address is not valid'
    },
    units: {
        meter: 'метр',
        m: 'м',
        km: 'км',
        kmHr: 'км/ч',
        lr: 'l',
        m2: 'кв. м.',
        km2: 'кв. км.',
        hectare: 'hectare'
    },
    login: {
        logout: 'LogOut',
        enter: 'Enter',
        terms: 'Terms and Conditions',
        acceptLabel: ' I accept the {url} of use of the "Life Map" service',
        registration: 'Registration',
        text1: 'Registration on the site lifemap.uz is carried out by using Telegram. ' +
            'You can download Telegram on the official website:',
        text2: 'Registered users get the opportunity to post events on the map, as well as view details of already ' +
            'published events.',
        text3: 'When registering, please allow {url} bot to send you messages.'
    },
    auth: {
        logout: 'You are logout',
        userBlocked: 'Your account is blocked',
        success: 'You have successfully logged in',
    },
    about: {
        titleLifeMap: 'Life Map',
        subtitleLifeMap: 'non-commercial open source help project',

        textWithoutImage1: 'If you want to become a member of the project ...',
        textWithoutImage2: 'If you want to take part in the creation of the project ...',
        textWithoutImage3: 'If you want to provide financial support to the project ...',
        textWithoutImage4: 'Write to us in Telegram at {url}',

        titleLicense: 'License and limitation of liability',
        textLicense: 'This software is published under the {urlApache} license. Please read all license terms of use and disclaimer carefully.\n Please be careful when providing your personal data to third parties. We cannot guarantee your security against fraudulent activities. \n All ads published on the "Life Map" are moderated.',

        titleSteps: 'How to place your event on the "Life Map"',
        step1: 'Register using Telegram',
        step1_1: 'Enter your region and your Telegram phone number',
        step1_2: 'Go to Telegram program and press Confirm',
        step1_3: 'Telegram will ask for confirmation of registration through your Telegram account',
        step1_4: 'To complete registration, send your phone number to lifemap_bot by clicking on Share my contact',
        step2: 'Send your phone number to lifemap_bot',
        step3: 'Click "Add Event"',
        step4: 'Move the pointer on the map - select a location',
        step5: 'Select a Category and fill in all fields',
        step6: 'Specify the time interval during which your event will be relevant',
        step7: 'After saving the event, it will go to the queue for moderation. If your event is approved, you will receive a message to the lifemap_bot bot.',

        titleAfterSteps: 'To communicate with users, use the Telegram contacts specified in the card of each event.',

        titleOrganizers: 'The project was created as part of the "Covid-19 Challenge 2020" competition.\n Competition organizers:',
        titleOurTeam: 'With love for Uzbekistan - our team:',

    },
    filter: {
        statusActual: 'Actual',
        statusAll: 'All',
        statusMyEvents: 'My events',
        statusForModeration: 'For moderation',
        lbStatus: 'Event status'
    },
    notFound: {
        whoops: 'Whoops',
        messageText: 'The page you were looking for does not exist',
        btnText: 'Get me out of here!',
    },
    category: {
        all: 'All',
        need_help: 'I need help',
        ready_assist: 'Ready to help',
        water: 'Water',
        food: 'Food',
        health_care_center: 'Medical center',
        doctor: 'I am a doctor',
        blood_center: 'Blood center',
        blood_donor: 'I am a donor',
        charity: 'Charity',
        attention: 'Attention!',
        level: 'Driver',
        vet: 'Vet'
    },
    headerEventTable: {
        lastEvent: 'Last event',
        blockedDate: 'Block date',
        blockedBy: 'Blocked by',
        created: 'Created',
        status: 'Status',
        responseCount: 'Responses',
        actions: 'Action'
    }
}
