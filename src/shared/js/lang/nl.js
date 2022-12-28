'use strict';

module.exports = {
    generel: {
        yes: 'Ja',
        no: 'Nee',
    },
    actions: {
        cancel: 'Annuleren',
        choose_images: 'Voeg een of meerdere afbeeldingen toe.',
        choose_image: 'Voeg een afbeelding toe.',
        choose_camera: 'Camera',
        choose_photo: 'Kies een afbeelding',
        choose_library: 'Bibliotheek',
        delete: 'Verwijder',
        dont_show_again: 'Niet meer tonen',
        edit: 'Edit',
        edit_details: 'Edit details',
        next: 'Volgende',
        ok: 'OK',
        previous: 'Vorige',
        show: 'Toon',
        submit: 'Versturen',
        take_picture: 'Neem een foto',
        use_slider: 'Gebruik de schuifbalk',
        abort: 'Afbreken',
        close: 'Sluiten',
        more: 'Laad meer',
        back: 'Terug'
    },
    table: {
        rowsPerPage: 'Rijen per pagina',
        pageOf: 'van'
    },
    admin:{
        dashboard: 'Dashboard',
        menu: 'Menu'
    },
    menu: {
        admin: 'Beheer',
        map: 'Kaart',
        user: 'Gebruiker'
    },
    asset: {
        file: 'Bestand'
    },
    author: {
        author: 'Auteur',
        by: 'door',
        created: 'Gemaakt',
        in: 'in',
        on: 'op',
        updated: 'Bijgewerkt'
    },
    captcha: {
        enter_captcha: 'Voer de code in'
    },
    comments: {
        all: 'Reacties',
        manage_comments: 'Beheer reacties',
        update_comment: 'Update reacties',
        comment: 'Reactie',
        comment_plural: 'Reacties',
        comment_text: 'Reactietekst',
        new_comment: 'Nieuwe reactie',
        new_comment_login: 'Log in om een reactie toe te voegen.',
        no_comments: 'Geen reacties',
        body: 'Bericht',
        hidden: 'Verberg reactie',
        created: 'Aangemaakt'
    },
    creator: {
        tabs: {
            admin: 'Beheer',
            details: 'Details',
            info: 'Info',
            location: 'Locatie',
            preview: 'Preview'
        }
    },
    errors: {
        access_denied: 'Je mag deze actie niet uitvoeren.',
        authorization_failed: 'Inloggen niet gelukt.',
        location: {
            'no_data': 'Locatie kan niet opgehaald worden.'
        },
        region: {
            'no_data': 'Gebied kan niet opgehaald worden.'
        },
        unknown: 'Er is een onbekende fout opgetreden.',
        noconnection: 'De app kan de server niet bereiken. Probeer later nog eens.',
        critical: {
          title: 'Kritieke fout',
          resolve: 'Oké, opnieuw proberen?'
        },
        users: {
            confirmation_failed: 'Bevestiging niet gelukt. Deze link wordt misschien al gebruikt.',
            email_exists: 'Dit e-mailadres is al geregistreerd.',
            invalid_email: 'Ongeldig e-mailadres.',
            password_confirm_mismatch: 'De wachtwoorden komen niet overeen.',
            password_too_short: 'Het wachtwoord is te kort (minimaal 8 karakters).',
            reset_failed: 'Wachtwoordreset is niet gelukt. Deze link is ongeldig en is misschien al gebruikt.',
            too_many_failed_logins: 'Te veel inlogpogingen. Probeer nog eens over vijf minuten.'
        }
    },
    successes: {
      user: {
        login: 'Je bent nu ingelogd',
        logout: 'Je bent uitgelogd'
      }
    },
    photos: {
        remove_confirm_title: 'Verwijder foto?',
        remove_confirm_body: 'Weet je zeker dat je deze foto wilt verwijderen',
        remove_success: 'Foto is verwijdert'
    },
    locations: {
        manage_locations: 'Locaties beheren',
        address: 'Adres',
        building_type: 'Type gebouw',
        building_type_options: {
            residential: 'Woning',
            commercial: 'Winkel',
            industrial: 'Bedrijfspand',
            historical: 'Monumentaal',
            public_work: 'Openbare ruimte',
            other: 'Anders'
        },
        city: 'Plaats',
        create_new: 'Locatie toevoegen',
        update_location: 'Locatie updaten',
        degree: 'Mate van leegstand',
        degree_options: {
            complete: 'Compleet',
            partial: 'Deels'
        },
        description: 'Omschrijving',
        demolished: 'Gesloopt',
        demolished_yes: 'Ja',
        demolition_options: {
            rumor: 'Geruchten',
            demolished: 'Gesloopt'
        },
        demolition_rumor: 'Geruchten over sloop',
        demolition_rumor_yes: 'Ja',
        edit: 'Loactie bewerken',
        empty_for: 'Leeg sinds',
        empty_options: {
            recently: 'recent',
            min_five_years: 'minstens 5 jaar',
            min_three_years: 'minstens 3 jaar',
            min_one_year: 'minstens een jaar',
            about_half_year: 'ongeveer een half jaar',
            less_than_one_quarter_year: 'minder dan drie maanden',
            less_than_one_half_year: 'minder dan een half jaar',
            less_than_three_quarters_year: 'minder dan 9 maanden',
            less_than_one_year: 'minder dan een jaar',
            more_than_ten_years: 'meer dan 10 jaar',
            one_quarter: 'een kwart',
            one_half: 'een half',
            three_quarters: 'drie kwart',
            year: 'jaar',
            year_plural: 'jaren',
            and: 'en'
        },
        help: {
            info: 'Voeg een beschrijvende titel en een omschrijving van deze locatie toe.',
            location: 'Voeg een adres toe, de kaart wordt geüpdatet. Je kan de marker op de kaart slepen.',
            details: 'Vul de gegevens over de locatie in. Weet je iets niet, laat het dan leeg.',
            admin: 'Zet dit object op "Verborgen" zodat niet-beheerders het niet kunnen zien'
        },
        hidden: 'Verborgen',
        hidden_yes: 'Ja',
        hidden_moderation: 'Deze kan locatie nu niet worden getoond. Neem contact op met jouw lokaal LM om deze invoer te laten tonen',
        location: 'Location',
        location_photos: 'Foto"s van deze locatie',
        location_plural: 'Locaties',
        locations_by_region: 'Locaties per gebied',
        my_locations: 'Mijn locaties',
        no_recent_activity: 'Geen recente activiteit',
        none_found: 'Geen locaties gevonden',
        owner: 'Eigenaar',
        owner_options: {
            private: 'Particulier',
            business: 'Zakelijk',
            public: 'Publiek',
            city: 'Gemeente'
        },
        postcode: 'Postcode',
        recent_activity: 'Meest recente activiteit',
        remove_confirm_title: 'Locatie verijderen',
        remove_confirm_body: 'Deze actie kan niet ongedaan gemaakt worden. Weet je het zeker?',
        remove_success: 'Locatie verwijderd',
        search: 'Zoeken',
        street: 'Straat',
        title: 'Titel',
        unknown: 'Onbekend'
    },
    messages: {
        answer_message: 'Op bericht reageren',
        create_message: 'Bericht aanmaken',
        message: 'Bericht',
        message_text: 'Tekst van bericht',
        my_messages: 'Berichten',
        sent: 'Verstuurd',
        to: 'Naar',
        from: 'Van',
        comments: {
            create_success: 'Reactie succesvol verzonden'
        },
        locations: {
            create_success: 'Locatie succesvol aangemaakt',
            update_success: 'Leegstand succesvol geüpdatet'
        },
        users: {
            confirmation_success: 'Log in succesvol. Je bent ingelogd.',
            create_success: 'Jouw registratie was succesvol. De bevestigingslink is naar je gemaild!',
            request_reset_success: 'Wachtword reset aangevraagd. Je krijgt nu een e-mail met een link om je wachtwoord te herstellen.',
            reset_success: 'Je bent nu ingelogd en mag. Je wachtwoord wijzigen.',
            update_success: 'Jouw account is succesvol geüpdatet.'
        }
    },
    popups: {
        relaunch: {
            title: 'Herstarten'
        }
    },
    posts: {
        edit_post: 'Bericht bewerken',
        manage_posts: 'Berichten beheren',
        post: 'Bericht',
        post_plural: 'Berichten',
        site_post_plural: 'Paginainhoud',
        title: 'Titel',
        update_success: 'Bericht succesvol aangepast.',
        create_post: 'Bericht aanmaken',
        slug: 'Slug URL',
        remove_confirm_title: 'Bericht verwijderenst',
        remove_confirm_body: 'Deze actie kan niet ongedaan gemaakt worden. Weet je het zeker?',
        remove_success: 'Bericht is verwijdert',
        static: 'Static side'
    },
    regions: {
        settings: 'Instellingen',
        hide_message: 'Tekst als het gebied verborgen is.',
        latitude: 'Breedtegraad',
        longitude: 'Leengtegraad',
        manage_regions: 'Gebieden beheren',
        create_regions: 'Gebied aanmaken',
        region: 'Gebied',
        region_plural: 'Gebieden',
        set_hide: 'Gebied verbergen',
        set_moderate: 'Gebied beheren',
        title: 'Titel',
        update_success: 'Gebied met succes bijgewerkt.',
        zoom: 'Inzoomen',
        count: 'Aantal',
        created: 'Aangemaakt',
        updated: 'Bijgewerkt',
    },
    site: {
        banned: 'Gebanet',
        copyright_notice: '© 2021 Leerstandsmelder.de',
        map_notice: 'Maps: © OpenStreetMap contributors, ODbL 1.0.',
        lang: 'Taal',
        lang_de: 'Duits',
        lang_en: 'Engels',
        lang_nl: 'Nederlands',
        latest_posts: 'NL meest recente berichten',
        no_latest_posts: 'Geen recente berichten',
        no: 'Nee',
        subnav: {
            about: 'Over',
            developers: 'Ontwikkelaars',
            feedback: 'Feedback',
            howto: 'Hoe',
            imprint: 'Imprint',
            index: 'Gemeente index',
            press: 'Druk',
            terms: 'Voorwaarden',
            dataprotection: 'Gegevensbescherming'
        },
        title: 'Leegstandsmelder'
    },
    users: {
        manage_users: 'Gebruikers beheren',
        create_user: 'Gebruiker aanmaken',
        admin_edit: 'Gebruiker beheren',
        admin_create: 'Gebruiker aanmaken',
        anonymous: 'Niet ingelogd',
        email: 'E-mail',
        forgot: 'Wachtwoord vergeten',
        logout: 'Uitloggen',
        password: 'Wachtwoord',
        password_confirm: 'Wachtwoord bevestigen',
        settings: 'Instellingen',
        signup: 'Aanmelden',
        username: 'Gebruikersnaam',
        login: 'Inloggen',
        message_me: 'Andere gebruikers kunnen mij berichten sturen via Leegstandsmelder.',
        notify: 'Stuur mij een e-mail wanneer mijn invoer is aangepast of andere gebruikers een bericht hebben verstuurd.',
        register_message: 'Nu aanmelden!',
        all: 'Alle gebruikers',
        confirmed: "Bevestigd",
        blocked: "Geblokkeerd",
        last_login: "Laatste login",
        failed_logins: "Inloggen niet gelukt",
        scope: "Bereik",
        created: 'Aangemaakt',
        accept_terms: 'Ik heb de algemene voorwaarden gelezen en accepteer de voorwaarden.',
        terms: 'Algemene voorwaarden'
    }
};
