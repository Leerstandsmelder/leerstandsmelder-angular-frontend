'use strict';

module.exports = {
    generel: {
        yes: 'Ja',
        no: 'Nein',
    },
    actions: {
        cancel: 'Abbrechen',
        choose_images: 'Wähle eines oder mehrere Bilder aus, welche Du zu diesem Eintrag hinzufügen möchtest.',
        choose_image: 'Füge ein Bild zu diesem Eintrag hinzu.',
        choose_camera: 'Kamera',
        choose_photo: 'Wähle ein Foto aus',
        choose_library: 'Library',
        delete: 'Löschen',
        dont_show_again: 'Nicht mehr anzeigen',
        edit: 'Bearbeiten',
        edit_details: 'Details bearbeiten',
        next: 'Weiter',
        ok: 'OK',
        previous: 'Zurück',
        show: 'Ansehen',
        submit: 'Absenden',
        take_picture: 'Mach ein Foto',
        use_slider: 'Benutze den Schieberegler',
        abort: 'Abbrechen',
        close: 'Schliessen',
        more: 'Weitere Einträge laden',
        back: 'Zurück'
    },
    table: {
        rowsPerPage: 'Einträge pro Seite',
        pageOf: 'von'
    },
    admin:{
        dashboard: 'Dashboard',
        menu: 'Menü'
    },
    menu: {
        admin: 'Administration',
        map: 'Karte',
        user: 'Benutzer'
    },
    assets: {
        file: 'Datei'
    },
    author: {
      author: 'Autor',
        by: 'von',
        created: 'Erstellt',
        in: 'in',
        on: 'am',
        updated: 'Aktualisiert'
    },
    captcha: {
        enter_captcha: 'Gib den Code ein'
    },
    comments: {
        all: 'Kommentare',
        manage_comments: 'Kommentare verwalten',
        update_comment: 'Kommentar verwalten',
        comment: 'Kommentar',
        comment_plural: 'Kommentare',
        comment_text: 'Kommentartext',
        new_comment: 'Neuer Kommentar',
        new_comment_login: 'Melde Dich an, um einen neuen Kommentar zu schreiben.',
        no_comments: 'Keine Kommentare',
        body: 'Nachricht',
        hidden: 'Kommentar ausblenden',
        created: 'Erstellt'
    },
    creator: {
        tabs: {
            admin: 'Verwaltung',
            details: 'Details',
            info: 'Info',
            location: 'Ort',
            preview: 'Vorschau'
        }
    },
    errors: {
        access_denied: 'Du hast keine Berechtigung, um diese Aktion auszuführen.',
        authorization_failed: 'Anmeldung fehlgeschlagen.',
        location: {
            'no_data': 'Leerstand konnte nicht geladen werden.'
        },
        region: {
            'no_data': 'Region konnte nicht geladen werden.'
        },
        unknown: 'Ein unbekannter Fehler ist aufgetreten.',
        noconnection: 'Die Anwendung konnte keine Verbindung zum Server herstellen. Probiere es zu einem späteren Zeitpunkt noch einmal.',
        critical: {
          title: 'Mieser Fehler',
          resolve: 'Ok, neu starten?'
        },
        users: {
            confirmation_failed: 'Bestätigung fehlgeschlagen. Möglicherweise wurde dieser Link bereits verwendet.',
            email_exists: 'E-Mail Adresse ist bereits registriert.',
            invalid_email: 'Ungültige E-Mail Adresse',
            password_confirm_mismatch: 'Passwörter stimmen nicht überein.',
            password_too_short: 'Passwort ist zu kurz (min. 8 Zeichen).',
            reset_failed: 'Passwort Zurücksetzen fehlgeschlagen. Dieser Link ist nicht (mehr) gültig.',
            too_many_failed_logins: 'Zu viele fehlgeschlagene Anmeldungen. Versuche es in fünf Minuten wieder.'
        }
    },
    successes: {
      user: {
        login: 'Du hast dich erfolgreich angemeldet.',
        logout: 'Du hast dich erfolgreich abgemeldet.'
      }
    },
    photos: {
        remove_confirm_title: 'Bild löschen?',
        remove_confirm_body: 'Bist du dir wirklich ganz sicher das du das Bild löschen willst?',
        remove_success: 'Das Bild wurde gelöscht'
    },
    locations: {
        manage_locations: 'Leerstände verwalten',
        address: 'Adresse',
        building_type: 'Gebäudeart',
        building_type_options: {
            residential: 'Wohngebäude',
            commercial: 'Gewerblich',
            industrial: 'Industriell',
            historical: 'Historisch',
            public_work: 'Öffentlich',
            other: 'andere'
        },
        city: 'Stadt',
        create_new: 'Leerstand melden',
        update_location: 'Leerstand aktualisieren',
        degree: 'Grad des Leerstands',
        degree_options: {
            complete: 'Vollständig',
            partial: 'Teilweise'
        },
        description: 'Beschreibung',
        demolished: 'Abgerissen',
        demolished_yes: 'Ja',
        demolition_options: {
            rumor: 'Gerüchte',
            demolished: 'Abgerissen'
        },
        demolition_rumor: 'Abrissgerüchte',
        demolition_rumor_yes: 'Ja',
        edit: 'Leerstand bearbeiten',
        empty_for: 'Leer seit',
        empty_options: {
            recently: 'Kurzem',
            min_five_years: 'wenigstens fünf Jahren',
            min_three_years: 'wenigstens drei Jahren',
            min_one_year: 'wenigstens einem Jahr',
            about_half_year: 'ungefähr einem halben Jahr',
            less_than_one_quarter_year: 'weniger als ein viertel Jahr',
            less_than_one_half_year: 'wengier als ein halbes Jahr',
            less_than_three_quarters_year: 'weniger als ein dreiviertel Jahr',
            less_than_one_year: 'weniger als ein Jahr',
            more_than_ten_years: 'mehr als zehn Jahre',
            one_quarter: 'ein viertel',
            one_half: 'one halbes',
            three_quarters: 'dreiviertel',
            year: 'Jahr',
            year_plural: 'Jahre',
            and: 'und'
        },
        help: {
            info: 'Gib hier einen aussagekräftigen Titel und eine Beschreibung für diesen Leerstand ein.',
            location: 'Gib eine Adresse ein und die Karte sollte sich nach einem kurzen Moment aktualisieren. Du kannst den Marker auf der Karte ziehen, um damit die Adresse zu aktualisieren.',
            details: 'Trag ein, welche Details dir über den Leerstand bekannt sind. Wenn Du etwas nicht weißt, lass es einfach unausgewählt.',
            admin:'Setz das Häkchen auf "Ausgeblendet" um es für nicht-Administratoren unsichtbar zu machen.'
        },
        hidden: 'Ausgeblendet',
        hidden_yes: 'Ja',
        hidden_moderation: 'Vielen Dank für Deine Meldung ! Der Beitrag wir in den nächsten Tagen freigeschaltet. Bitte bleib an dem Objekt dran und ergänze den Eintrag alle 3 Monate mit einem Kommentar, um Veränderungen oder Stillstand zu dokumentieren.',
        location: 'Leerstand',
        location_photos: 'Fotos zu diesem Leerstand',
        location_plural: 'Leerstände',
        locations_by_region: 'Leerstände nach Region',
        my_locations: 'Meine Leerstände',
        no_recent_activity: 'Keine Leerstände',
        none_found: 'Keine Leerstände gefunden.',
        owner: 'Eigentümer',
        owner_options: {
            private: 'Privat',
            business: 'Gewerblich',
            public: 'Öffentlich',
            city: 'Stadt'
        },
        postcode: 'Postleitzahl',
        recent_activity: 'Neueste Aktivitäten',
        remove_confirm_title: 'Leerstand löschen',
        remove_confirm_body: 'Diese Aktion kann nicht rückgängig gemacht werden. Bist Du sicher?',
        remove_success: 'Leerstand wurde gelöscht',
        search: 'Suchen',
        street: 'Straße',
        title: 'Titel',
        unknown: 'Unbekannt'
    },
    messages: {
        answer_message: 'Nachricht beantworten',
        create_message: 'Nachricht erstellen',
        message: 'Nachricht',
        message_text: 'Nachricht',
        my_messages: 'Nachrichten',
        sent: 'Gesendet',
        to: 'An',
        from: 'Von',
        comments: {
            create_success: 'Kommentar erfolgreich gespeichert.'
        },
        locations: {
            create_success: 'Leerstand erfolgreich eingetragen.',
            update_success: 'Leerstand erfolgreich aktualisiert.'
        },
        users: {
            confirmation_success: 'Deine E-Mail wurde erfolgreich bestätigt. Du bist jetzt eingeloggt!',
            create_success: 'Deine Registrierung war erfolgreich. Du solltest jetzt eine E-Mail mit einem Bestätigungslink erhalten.',
            request_reset_success: 'Du solltest nun eine E-Mail erhalten, die einen Link zum Zurücksetzen Deines Passworts enthält.',
            reset_success: 'Du bist nun eingeloggt und kannst Dein Passwort ändern.',
            update_success: 'Konto wurde erfolgreich aktualisiert.'
        }
    },
    popups: {
        relaunch: {
            title: 'Relaunch!'
        }
    },
    posts: {
        edit_post: 'Eintrag bearbeiten',
        manage_posts: 'Einträge verwalten',
        post: 'Eintrag',
        post_plural: 'Einträge',
        site_post_plural: 'Seiteninhalte',
        title: 'Titel',
        update_success: 'Eintrag erfolgreich aktualisiert..',
        create_post: 'Eintrag erstellen',
        slug: 'Kurzform URL',
        remove_confirm_title: 'Eintrag/Seiteninhalt löschen',
        remove_confirm_body: 'Diese Aktion kann nicht rückgängig gemacht werden. Bist Du sicher?',
        remove_success: 'Eintrag/Seiteninhalt wurde gelöscht',
        static: 'Statische Seite'
    },
    regions: {
        settings: 'Einstellungen',
        hide_message: 'Nachricht, wenn Region nicht angezeigt wird',
        latitude: 'Breitengrad',
        longitude: 'Längengrad',
        manage_regions: 'Regionen verwalten',
        create_regions: 'Region erstellen',
        region: 'Region',
        region_plural: 'Regionen',
        set_hide: 'Diese Region nicht anzeigen',
        set_moderate: 'Diese Region moderieren',
        title: 'Titel',
        update_success: 'Region erfolgreich aktualisiert.',
        zoom: 'Zoom',
        count: 'Anzahl',
        created: 'Erstelllt',
        updated: 'Aktualisiert',
    },
    site: {
        banned: 'Gesperrt',
        copyright_notice: '© 2021 Leerstandsmelder.de',
        map_notice: 'Karten: © OpenStreetMap contributors, ODbL 1.0',
        lang: 'Sprache',
        lang_de: 'Deutsch',
        lang_en: 'English',
        lang_nl: 'Niederländisch',
        latest_posts: 'Neueste Einträge',
        no_latest_posts: 'Keine Neuesten Einträge',
        no: 'Nein',
        subnav: {
            about: 'Über uns',
            developers: 'Entwickler*innen',
            feedback: 'Feedback',
            howto: 'So geht\'s',
            imprint: 'Impressum',
            index: 'Stadtindex',
            press: 'Presse',
            terms: 'AGB',
            dataprotection: 'Datenschutz'
        },
        title: 'Leerstandsmelder'
    },
    users: {
        manage_users: 'Nutzer*innen verwalten',
        create_user: 'Nutzer*innen erstellen',
        admin_edit: 'Nutzer*innen bearbeiten',
        admin_create: 'Nutzer*innen erstellen',
        anonymous: 'Nicht eingeloggt',
        email: 'E-Mail',
        forgot: 'Passwort vergessen',
        logout: 'Abmelden',
        password: 'Passwort',
        password_confirm: 'Passwort bestätigen',
        settings: 'Einstellungen',
        signup: 'Registrieren',
        username: 'Benutzername',
        login: 'Anmelden',
        message_me: 'Andere Nutzer können mir Nachrichten auf Leerstandsmelder schicken.',
        notify: 'Benachrichtige mich per Email wenn meine Einträge geupdatet werden oder Nachrichten angekommen sind.',
        register_message: 'Registriere Dich!',
        all: 'Alle Nutzer*innen',
        confirmed: "Bestättigt",
        blocked: "Blockiert",
        last_login: "Letzter login",
        failed_logins: "Fehlgeschlagene Logins",
        scope: "Berechtigungen",
        created: 'Angemeldet',
        accept_terms: 'Ich habe die AGB gelesen und erkläre mich mit diesen einverstanden.',
        terms: 'Allgemeine Geschäftsbedingungen'
    }
};
